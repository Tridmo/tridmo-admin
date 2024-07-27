import axios from "axios";
import Cookies from "js-cookie";

export const getServerSideProps = () => { }
export const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
export const chatBaseUrl = `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}`;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept-Language': 'ru'
  }
});

const chatApi = axios.create({
  baseURL: `${chatBaseUrl}/api`,
  headers: {}
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers['Authorization'];
  }
};

export const setChatToken = (token) => {
  if (token) {
    chatApi.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete chatApi.defaults.headers['Authorization'];
  }
};

export { chatApi };
export default instance;
