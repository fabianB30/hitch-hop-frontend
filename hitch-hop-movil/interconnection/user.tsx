import axios from './axios';

export const registerRequest = async (data : {name, email, password, institutionId, 
            identificationTypeId, identificationNumber, 
            birthDate, genre, photoKey, photoUrl, type, role, vehicles}): Promise<IJwtResponse | null> => {
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
        console.error('http request error: ', error);
        return null;
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
        console.error('http request error: ', error);
        return null;
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

export const updateUserRequest = async (id: string, data : {name, email, password, institutionId, 
            identificationTypeId, identificationNumber, 
            birthDate, genre, photoKey, photoUrl, type, role, vehicles}): Promise<IJwtResponse | null> => {
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