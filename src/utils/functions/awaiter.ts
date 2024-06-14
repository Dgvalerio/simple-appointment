export const awaiter = (timeout: number = 2048) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
