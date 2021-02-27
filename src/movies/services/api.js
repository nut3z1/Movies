import axios from 'axios';
import * as moment from 'moment';

// cong them ngay thang trong js
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const getDataMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=vi&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
  const response = await axios.get(url);
  const result = await response.status === 200 ? response.data : [];
  return result;
}
export const getDataNewFilm = async (page = 1) => {
  let date = new Date();
  let d = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let m = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let y = date.getFullYear();
  let today = `${y}-${m}-${d}`; // YYYY-MM-DD
  let nextTime = addDays(today, 30);
  // nextTime : khong phai dinh dang YYYY-MM-DD, can format ve dung dinh dang do
  nextTime = moment(nextTime).utc().format('YYYY-MM-DD');

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=vi&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&release_date.gte=${today}&release_date.lte=${nextTime}&with_release_type=3|2`;
  const response = await axios.get(url);
  const result = await response.status === 200 ? response.data : [];
  return result;
}

export const getDataMoviesById = async (id = 0) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=vi&append_to_response=videos,images&include_image_language=vi,null`;
  const response = await axios.get(url);
  const result = await response.status === 200 ? response.data : [];
  return result;
}

export const searchMovieByKeywords = async (keywords = '', page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${keywords}&api_key=cfe422613b250f702980a3bbf9e90716&page=${page}`;
  const response = await axios.get(url);
  const result = await response.status === 200 ? response.data : [];
  return result;
}