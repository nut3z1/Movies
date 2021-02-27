import { data } from './data';

export const getListDataProducts = () => {
  const result = data;
  return result;
}
export const getDataProductById = (id) => {
  const detail = data.filter(item => item.id === id)[0];
  return detail;
}