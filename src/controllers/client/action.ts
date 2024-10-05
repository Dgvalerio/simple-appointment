'use server';

import { Timesheet } from '@/controllers/client/types';

import axios, { AxiosRequestConfig } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar, SerializedCookie } from 'tough-cookie';

export const loadCookies = async (
  login: string,
  password: string
): Promise<SerializedCookie[]> => {
  try {
    const response = await axios.get(
      'https://luby-timesheet.azurewebsites.net/Account/Login'
    );

    const regex = /value="([\S\s]+?)??" \/>/g;
    const regexResult = regex.exec(response.data);

    if (!regexResult) return [];

    const token = regexResult[1];

    const setCookieHeader = response.headers['set-cookie'];

    if (!setCookieHeader) return [];

    const verificationToken = setCookieHeader.find((ck) =>
      ck.includes('__RequestVerificationToken')
    );

    const cookieJar = new CookieJar();

    wrapper(axios);

    await axios.post(
      'https://luby-timesheet.azurewebsites.net/Account/Login',
      `__RequestVerificationToken=${token}&Login=${login}&Password=${password}`,
      {
        headers: { cookie: verificationToken },
        jar: cookieJar,
        withCredentials: true,
      }
    );

    const cookiesJson = cookieJar.toJSON();

    if (!cookiesJson) return [];

    return cookiesJson.cookies;
  } catch (e) {
    return [];
  }
};

const axiosConfig = (cookies: SerializedCookie[]): AxiosRequestConfig => {
  const cookie: string = cookies.reduce(
    (previous, { key, value }) => `${previous} ${key}=${value};`,
    ''
  );

  return {
    baseURL: 'https://luby-timesheet.azurewebsites.net',
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
      'x-requested-with': 'XMLHttpRequest',
      cookie,
      Referer: 'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  };
};

const loadCategories = async (
  projectId: Timesheet.Project['id'],
  cookies: SerializedCookie[]
): Promise<Timesheet.Category[]> => {
  try {
    const { data } = await axios.post<Timesheet.Original.Category[]>(
      '/Worksheet/ReadCategory',
      `idproject=${projectId}`,
      axiosConfig(cookies)
    );

    return data.map(
      (category): Timesheet.Category => ({
        id: category.Id,
        name: category.Name,
      })
    );
  } catch (e) {
    return [];
  }
};

const loadProjects = async (
  clientId: Timesheet.Client['id'],
  cookies: SerializedCookie[]
): Promise<Timesheet.Project[]> => {
  try {
    const { data } = await axios.post<
      Omit<Timesheet.Original.Project, 'categories'>[]
    >('/Worksheet/ReadProject', `idcustomer=${clientId}`, axiosConfig(cookies));

    const projects = data.map(
      async (p): Promise<Timesheet.Project> => ({
        id: p.Id,
        name: p.Name,
        clientId: p.IdCustomer,

        categories: await loadCategories(p.Id, cookies),
      })
    );

    return await Promise.all(projects);
  } catch (e) {
    return [];
  }
};

const loadClients = async (
  cookies: SerializedCookie[]
): Promise<Timesheet.Client[]> => {
  const clients: Timesheet.Client[] = [];

  try {
    const response = await axios.get('/Worksheet/Read', axiosConfig(cookies));

    const html: string = response.data;

    const regex = /(name="IdCustomer">)([\w\W]+?)(<\/select>)/gm;
    const search: string = (html.match(regex) || [''])[0];

    const cleanedSearch = search.split(/\r\n/gm).join('');

    const values = cleanedSearch.match(/value="([\S\s]+?)??">([\S\s]+?)</g);

    if (!values) return [];

    const clientsPromise: Promise<Timesheet.Client>[] = values.map(
      async (option) => {
        const [id, titleWithSpaces] = option
          .replace(/value="([\S\s]+?)??">([\S\s]+?)</g, '$1|$2')
          .split('|');

        const title = titleWithSpaces.trim();

        if (id) {
          const projects = await loadProjects(id, cookies);

          clients.push({ id, title, projects });
        }

        return { id: id || '-1', title, projects: [] };
      }
    );

    await Promise.all(clientsPromise);
  } catch (e) {
    return [];
  }

  return clients;
};

export const getClientsFromAzure = async (
  login: string,
  password: string
): Promise<Timesheet.Client[]> => {
  'use server';
  try {
    const cookies = await loadCookies(login, password);

    return await loadClients(cookies);
  } catch (e) {
    return [];
  }
};
