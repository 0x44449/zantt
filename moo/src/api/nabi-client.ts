import axios, { AxiosError } from "axios";

const nabiClient = axios.create({
  baseURL: 'http://nabi.zantt.local',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default nabiClient;
