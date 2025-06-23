/*
    LO DEL BACK PARA TENERLO COMO REFERENCIA:
    app.post("/backend/vehicle/register", vehicleController.registerVehicle);
    app.get("/backend/vehicle/get-all", vehicleController.getVehicles);
    app.get("/backend/vehicle/get/:id", vehicleController.getVehicleById);
    app.put("/backend/vehicle/update/:id", vehicleController.updateVehicle);
    app.delete("/backend/vehicle/delete/:id", vehicleController.deleteVehicle); 
*/ 

import axios from './axios';

export const registerVehicleRequest = async ( data: {
        model: string, 
        brand: string, 
        color: string, 
        plate: string,
        year: string,
        userId: string
    }): Promise<any | null> => {

    try {
        const res = await axios.post(`/backend/vehicle/register`, data);
        const dataVehicle = res.data.vehicle;
        if (dataVehicle) {
            return dataVehicle;
        } else {
            console.error('Invalid response structure at registerVehicleRequest:', res);
            return null;
        }
        
    } catch (error) {
        console.error('http request error at registerVehicleRequest: ', error);
        return null;
    }
};

export const getBrandVehicleRequest = async (id: string): Promise<any | null> => {
    try {
        const res = await axios.get(`/backend/vehicle/getModel/${id}`);
        const dataVehicles = res.data.data;
        if (dataVehicles) {
            return dataVehicles;
        } else {
            console.error('Invalid response structure at getBrandVehicleRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getBrandVehicleRequest: ', error);
        return null;
    }
};

export const getAllVehiclesRequest = async (): Promise<any[] | null> => {
    try {
        const res = await axios.get(`/backend/vehicle/get-all`);
        const dataVehicles = res.data.data;
        if (dataVehicles) {
            return dataVehicles;
        } else {
            console.error('Invalid response structure at getAllVehiclesRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getAllVehiclesRequest: ', error);
        return null;
    }
};

export const getVehicleByIdRequest = async (id: string): Promise<any | null> => {
    try {
        const res = await axios.get(`/backend/vehicle/get/${id}`);
        const dataVehicle = res.data.data;
        if (dataVehicle) {
            return dataVehicle;
        } else {
            console.error('Invalid response structure at getVehicleByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getVehicleByIdRequest: ', error);
        return null;
    }
};

export const updateVehicleByIdRequest = async (id: string, data: {
        model: string, 
        brand: string, 
        color: string, 
        plate: string,
        year: string
    }): Promise<any | null> => {
    try {
        const res = await axios.put(`/backend/vehicle/update/${id}`, data);
        const dataVehicle = res.data.data;
        if (dataVehicle) {
            return dataVehicle;
        } else {
            console.error('Invalid response structure at updateVehicleByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at updateVehicleByIdRequest: ', error);
        return null;
    }
};

export const deleteVehicleByIdRequest = async (id: string): Promise<any | null> => {
    try {
        const res = await axios.delete(`/backend/vehicle/delete/${id}`);
        const dataVehicle = res.data.data;
        if (dataVehicle) {
            return dataVehicle;
        } else {
            console.error('Invalid response structure at deleteVehicleByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at deleteVehicleByIdRequest: ', error);
        return null;
    }
};

// Autor: Anthony Guevara
// Función para recibir vehiculos ligados a un usuario por sus IDs
// Esta función recibe un array de IDs de vehiculos y retorna un array con los detalles de esos vehiculos.

export const getVehiclesByIdsRequest = async (vehicleIds: string[]): Promise<any[] | null> => {
    try {
        // Check if user has any vehicles
        if (!vehicleIds?.length) {
            return [];
        }
        
        // Get details for each vehicle
        const vehiclePromises = vehicleIds.map((vehicleId: string) => 
            axios.get(`/backend/vehicle/get/${vehicleId}`)
        );

        const vehicleResponses = await Promise.allSettled(vehiclePromises);
        
        const vehicles = vehicleResponses
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<any>).value.data.data)
            .filter(vehicle => vehicle);
        
        return vehicles;

    } catch (error) {
        console.error('http request error at getVehiclesByIdsRequest: ', error);
        return null;
    }
};
