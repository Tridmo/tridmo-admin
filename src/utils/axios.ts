import axios from "axios";
import Cookies from "js-cookie";

export const getServerSideProps = () => { }
// export const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
export const baseUrl = `http://localhost:8800/api`

const instance = axios.create({
  baseURL: baseUrl,
  headers:
    Cookies.get('accessToken') ? {
      'Accept-Language': 'ru',
      'Authorization': `Bearer ${Cookies.get('accessToken')}`,
    } : {
      'Accept-Language': 'ru',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6Ik0xTTFUcURKcEEyWXJKOFgiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEzODgwMTI0LCJpYXQiOjE3MTMyNzUzMjQsImlzcyI6Imh0dHBzOi8vdHl0emhoZXdtemtqbm9xc3RoY3kuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjY1MDkzZmMwLWMwYTItNDBhMC1iOGYzLTViZmQ2ZDVkOGY0NCIsImVtYWlsIjoiYWRtaW5AZGVtb2QuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MTMyNzUzMjR9XSwic2Vzc2lvbl9pZCI6IjczMmY1MjA3LTFjMTktNDgwNy04ZjY3LTM4ZGIwNTBiY2Q5MSIsImlzX2Fub255bW91cyI6ZmFsc2V9.GLjBRWu7a0snou7QMQM6s1FetkCPRd6yco8iBNnkKbM`,
    }
});

export default instance;

