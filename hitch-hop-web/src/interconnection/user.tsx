import axios from './axios';

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
  vehicles: string[]; // array id
  notifications: {
    title: string;
    subtitle: string;
    timestamp?: string;
  }[];
};


export const registerRequest = async (data : User): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/user/register`, data);
        const dataUser = res.data.data;
        if (dataUser) {
            return dataUser;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        return error.response?.data.msg;
    }
};

export const loginRequest = async (data: {email, password}): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/user/login`, data);
        const dataUser = res.data.data;
        if (dataUser) {
            return dataUser;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        return error.response?.data.msg;
    }
};

export const addCarsRequest = async (data: {cars, email}): Promise<IJwtResponse | null> => {
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
        const res = await axios.put(`/backend/user/update/${id}`, data);
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

export const getAllUsersRequest = async (): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.put(`/backend/users"`);
        const dataUsers = res.data.data;
        if (dataUsers) {
            return dataUsers;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const changePasswordRequest = async (data: {email: string, currentPassword: string, newPassword: string}): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/user/update-password`, data);
        const dataPlace = res.data.data;
        if (dataPlace) {
            return dataPlace;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        return error.response?.data.msg;
    }
};