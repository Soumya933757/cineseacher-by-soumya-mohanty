import { BASE_URL } from "constants/url";

import axios from "axios";

const show = params => axios.get(BASE_URL, { params });

const fetch = params => axios.get(BASE_URL, { params });

export const moviesApi = { show, fetch };
