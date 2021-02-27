import axios from 'axios';

export const getListDataProducts = async () => {
  const url = `https://t3h-edu.herokuapp.com/api/learning/v1/products`;
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const urlApi = `${proxy}${url}`;
  const response = await axios.get(urlApi);
  const result = await response.status === 200 ? await response.data : [];
  return result;
}

export const getDataProductById = async (id) => {
  const url = `https://t3h-edu.herokuapp.com/api/learning/v1/product/${id}`;
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const urlApi = `${proxy}${url}`;
  const response = await axios.get(urlApi);
  const result = await response.status === 200 ? await response.data : {};
  return result;
}