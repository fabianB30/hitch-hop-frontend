import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://186.176.142.165:3000',
    //withCredentials: true
});

export default instance;