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

export const getTripsByUserRequest = async (userId: string, driver: boolean, status: string): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/trips/user/${userId}`, {params: {driver, status}});
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

export const updatePassangerStatusRequest = async (id, userId, status): Promise<IJwtResponse | null> => {
    try {
        const res = axios.patch(`/backend/trip/${id}/passengers/${userId}/status`, {status});
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const updateStopStatusRequest = async (id: string, placeId: string, status: string): Promise<IJwtResponse | null> => {
    try {
        const res = axios.patch(`/backend/trip/${id}/stops/${placeId}/status`, {status});
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const addStopToTripRequest = async (id: string, place: string): Promise<IJwtResponse | null> => {
    try {
        const res = axios.post(`/backend/trip/${id}/stops`, {place});
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const addPassangerToTripRequest = async (id: string, user: string): Promise<IJwtResponse | null> => {
    try {
        const res = axios.post(`/backend/trip/${id}/passengers`, {user});
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const getTripPassengersRequest = async (id: string, user: string): Promise<IJwtResponse | null> => {
    try {
        const res = axios.get(`/backend/trip/${id}/passengers`);
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const cancelPassengerTripRequest = async (id: string, userId: string): Promise<IJwtResponse | null> => {
    try {
        const res = axios.put(`/backend/trips/${id}/cancel/${userId}`);
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const getTripsParamsRequest = async (data: {startDate: string, endDate: string, institutionId: string, endpoint: string | null}): Promise<IJwtResponse | null> => {
    try {
        const res = axios.post(`/backend/trip/filter`, data);
        const data = res.data.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};
