export const getLocalState = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};
export const setLocalState = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
