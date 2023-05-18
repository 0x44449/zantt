import axios, { AxiosError } from "axios";

const authoClient = axios.create({
  baseURL: 'http://autho.zantt.local',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authoClient;
