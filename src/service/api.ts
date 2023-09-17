import _axios from 'axios';

export const axios = _axios.create({
    baseURL: "https://todojava.onrender.com",
    // baseURL: "http://localhost:8080/"
}
)