import axios from "axios";

const instance = axios.create({
    // acá colocan la ip que les tira la terminal cuando ejecutan npx expo start, pero mantienen el puerto
    baseURL:"http://192.168.0.101:3000",
    //withCredentials: true
});

export default instance;
