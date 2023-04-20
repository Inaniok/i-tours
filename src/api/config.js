import axios from 'axios';
import { API_URL } from 'constants/api';

const HTTPClient = axios.create({
	baseURL: API_URL,
});

export default HTTPClient;
