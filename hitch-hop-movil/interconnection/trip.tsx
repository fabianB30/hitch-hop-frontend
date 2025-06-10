import axios from './axios';

export const registerTripRequest = async (data : { 
    startpoint, endpoint, departure, arrival, stops, passengers, drive}): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/trip/register`, data);
        const dataTrip = res.data.data;
        if (dataTrip) {
            return dataTrip;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const getAllTripsRequest = async (): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/trip/get-all`);
        const dataTrips = res.data.data;
        if (dataTrips) {
            return dataTrips;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const getTripByIdRequest = async (id): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/trip/get/${id}`, {params: {id}});
        const dataTrip = res.data.data;
        if (dataTrip) {
            return dataTrip;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const deleteTripRequest = async (id): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.delete(`/backend/trip/delete/${id}`, {params: {id}});
        return res.data.msg;        
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};