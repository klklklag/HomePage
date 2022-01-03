export const noop = () => {};
export const getObjectFromForm = <T = any>(form: HTMLElement | null): T => {
  if (!form) return {} as T;

  const data = Object.fromEntries(new FormData(form as HTMLFormElement).entries());
  return data as unknown as T;
}

export const getCommaString = (target: number | string | undefined | null) => {
  if (target !== 0 && !target) return "";

  const str = typeof target === 'number' ? target.toString(10) : target;
  const [naturalNumber, decimalNumber] = str.split(".");

  return `${naturalNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${decimalNumber ? `.${decimalNumber}` : ""}`;
};

export const addIdIndexToTableData = (list: object[]) => list.map((item, index) => ({ id: index + 1, ...item }));

export const refreshPage = () => window.location.reload();

export const getCurrentYear = () => new Date().getFullYear().toString();
export const getCurrentYearMonth = () => {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}.${(now.getMonth() + 1).toString(10).padStart(2, '0')}`;
  return yearMonth;
};

export const getFormattedDateString = (date: string | undefined) => {
  if (!date) return '';

  // date의 형식은 YYYY-MM-DD HH:mm:ss
  return date.split(' ')[0].replace(/-/g, '.')
}