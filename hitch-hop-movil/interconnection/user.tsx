import axios from './axios';

export interface IJwtResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

export type User = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  username: string;
  email: string;
  password: string;
  institutionId: string;
  identificationTypeId?: "Cedula" | "DIMEX" | "Pasaporte";
  identificationNumber?: number;
  birthDate: string;
  genre?: "Masculino" | "Femenino" | "Otro";
  photoKey?: string;
  photoUrl?: string;
  phone?: number;
  type: "Administrador" | "Usuario" | "Inactivo - Admin" | "Inactivo - User";
  role: "Conductor" | "Pasajero";
  vehicles: string[];
  notifications: {
    title: string;
    subtitle: string;
    timestamp?: string;
  }[];
};


export const registerRequest = async (data : User): Promise<IJwtResponse | null> => {
    try {
        console.log('Enviando datos de registro:', data);
        console.log('URL completa:', axios.defaults.baseURL + '/backend/user/register');
        
        const res = await axios.post(`/backend/user/register`, data);
        
        const dataUser = res.data.data;
        if (dataUser) {
            return dataUser;
        } else {
            return res.data.msg;
        }
    } catch (error: any) {
        return error.response?.data.msg;
    }
};

export const loginRequest = async (data: { email: string; password: string }): Promise<IJwtResponse | null> => {
    try {
        console.log('Enviando request al backend:', { email: data.email, password: '***' });
        console.log('URL completa:', axios.defaults.baseURL + '/backend/user/login');
        
        const res = await axios.post(`/backend/user/login`, data);
        const user = res.data.data;
        if (user) {
            return user;
        } else {
            return res.data.msg;
        }
        
    } catch (error: any) {
        return error.response?.data.msg;
    }
};

export const addCarsRequest = async (data: { cars: any[]; email: string }): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/user/addCars`, data);
        const dataUser = res.data.data;
        if (dataUser) {
            return dataUser;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const updateUserRequest = async (id: string, data : User): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.put(`/backend/user/update`, data, {params: {id}});
        const dataPlace = res.data.data;
        if (dataPlace) {
            return dataPlace;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};