import axios from './axios';

type Stop = {
  place: string; // id object
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
};

type Passenger = {
  user: string; // id object
  status: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
};

type Trip = {
  startpoint: string; // id object
  endpoint: string // id object
  departure: Date;
  arrival: Date;
  stops: Stop[];
  passengers: Passenger[];
  driver: string; // id object
  paymethod: 'Gratuito' | 'Sinpe' | 'Efectivo';
  costPerPerson: number;
};

export const registerTripRequest = async (data : Trip): Promise<IJwtResponse | null> => {
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

export const getTripsParams = async (data: any): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post(`/backend/trip/filter`, data);
        const dataTrip = res.data.data;
        if (dataTrip) {
            return dataTrip;
        } else {
            console.error('Invalid response structure at getTripsParams:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getTripsParams: ', error);
        return null;
    }
};