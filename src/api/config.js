import axios from 'axios';
import { API_AUTH_URL } from 'constants/api';

const HTTPClient = axios.create({
	baseURL: API_AUTH_URL,
});

export default HTTPClient;
