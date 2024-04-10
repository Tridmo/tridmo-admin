import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

export const getServerSideProps = () => { }
export const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`

const instance = axios.create({
    baseURL: baseUrl,
    headers:
        Cookies.get('accessToken') ? {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            'Accept-Language': 'ru'
        } : {
            'Accept-Language': 'ru'
        }
});

export default instance;

