export const executeIfDev = (callback: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    callback();
  }
}

export const devLog = (message?: any, ...optionalParams: any[]) => {
  executeIfDev(() => console.log(message, ...optionalParams));
};