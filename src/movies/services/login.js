import axios from 'axios';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const KEY_JWT = 'vccorp_2020';
//const USER = 'trieunt';
//const PASS = 'reactjst3h';
const PAYLOAD = {
  iss : "http://t3h-edu.herokuapp.com/",
  aud : "http://t3h-edu.herokuapp.com/",
  iat : 1356999524,
  nbf : 1357000000
}
// viet ham tao token gui ler service api
const createToken = () => {
  const token = jwt.sign(PAYLOAD, KEY_JWT);
  return token;
}

export const loginApi = async (user, pass) => {
  pass = md5(`${KEY_JWT}|||${pass}`);// ma hoa mk gui len api
  const token = createToken();

  const response = await axios({
    url: `https://cors-anywhere.herokuapp.com/http://t3h-edu.herokuapp.com/api/learning/v1/login`,
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-type": "Application/json",
      "Authorization": `${token}`
    },
    data: {username: user, password: pass}
  });
  const result = await response.status === 200 ? await response.data : {};
  return result;
}

// luu thong tin token user tu api tra ve vao localStorage
export const saveTokenLocalStorage = (token) => {
  if(token !== undefined && token !== null && token !== ''){
    localStorage.setItem('token', JSON.stringify(token));
  }
}
export const getTokenLocalStorage = () => {
  const token = localStorage.getItem('token');
  if(token !== undefined && token !== null && token !== ''){
    return JSON.parse(token);
  }
  return null;
}

export const decodeTokenFormLocalStorage = () => {
  const token = getTokenLocalStorage();
  let decodeToken = null;
  if(token !== undefined && token !== null && token !== ''){
    decodeToken = jwt.verify(token, KEY_JWT);
  }
  return decodeToken;
}
export const removeTokenLocalStorage = () => {
  localStorage.removeItem('token');
}

export const isAuthenticated = () => {
  const token = decodeTokenFormLocalStorage();
  if(token !== undefined && token !== null && token !== ''){
    return true;
  }
  return false;
}