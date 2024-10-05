interface Routes {
  home: string;
  signIn: string;
  signUp: string;
  addAppointment: string;
  loadData: string;
}

export const routes: Routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  addAppointment: '/appointment/create',
  loadData: '/load-data',
};
