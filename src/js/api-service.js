// import md5 from 'md5';
import axios from 'axios';

// const PUBLIC_KEY = 'c123898771c31fcefa21223333cc579a';
// const PRIVATE_KEY = 'db4f9373b5e745ee303c58638fcdfc78b6aab1bd';
const API_KEY = 'a5837db97d72016c81a7a776f4240db9';
// const md = md5('1', PUBLIC_KEY, PRIVATE_KEY);

axios.defaults.baseURL = `https://gateway.marvel.com/v1/public`;

export const getComics = async () => {
  const { data } = await axios.get(`/comics?ts=1&apikey=${API_KEY}`);
  return data;
};

export const getLastWeekComics = async () => {
  const { data } = await axios.get(
    `/comics?ts=1&apikey=${API_KEY}&dateDescriptor=lastWeek&limit=6`
  );
  return data;
};

export const getComicsById = async id => {
  const {
    data: { data },
  } = await axios.get(`/comics/${id}?ts=1&apikey=${API_KEY}`);
  return data;
};

export const getCharacters = async comicId => {
  const {
    data: { data },
  } = await axios.get(`/comics/${comicId}/characters?ts=1&apikey=${API_KEY}`);

  return data;
};
