import axios from './axios';

export const registerPlaceRequest = async (data : { 
    name, description, longitude, latitude }): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/place/register`, data);
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

export const getAllPlacesRequest = async (): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/place/get-all`);
        const dataPlaces = res.data.data;
        if (dataPlaces) {
            return dataPlaces;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const getPlaceByIdRequest = async (id): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/place/get/${id}`);
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

export const updatePlaceRequest = async (id: string, data : { 
    name, description, longitude, latitude }): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.put(`/backend/place/update/${id}`, data);
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

export const deletePlaceRequest = async (id): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.delete(`/backend/place/delete/${id}`);
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