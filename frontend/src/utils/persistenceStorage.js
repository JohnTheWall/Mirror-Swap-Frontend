export const setValueToStorage = (key, value) => {
  localStorage.setItem(key, value);
}

export const getValueFromStorage = (key) => {
  return localStorage.getItem(key);
}
