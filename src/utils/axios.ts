import axios from "axios";
import Cookies from "js-cookie";

export const getServerSideProps = () => { }
export const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept-Language': 'ru'
  }
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers['Authorization'];
  }
};

export default instance;
