import axios from './axios';

/*   app.post("/backend/office/register", officeController.registerOffice);
  app.get("/backend/office/get-all", officeController.getOffices);
  app.get("/backend/office/get/:id", officeController.getOfficeById);
  app.put("/backend/office/update/:id", officeController.updateOffice);
  app.delete("/backend/office/delete/:id", officeController.deleteOffice);
};

 */

export const registerOfficeRequest = async (data: {name: string, members: any[]}): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post('/backend/office/register', data);
        const dataOffice = res.data.data;
        if (dataOffice) {
            return dataOffice;
        } else {
            console.error('Invalid response structure at registerOfficeRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at registerOfficeRequest: ', error);
        return null;
    }
}

export const getAllOfficesRequest = async (): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get('/backend/office/get-all');
        const dataOffices = res.data.data;
        if (dataOffices) {
            return dataOffices;
        } else {
            console.error('Invalid response structure at getAllOfficesRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getAllOfficesRequest: ', error);
        return null;
    }
}

export const getOfficeByIdRequest = async (id: string): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/office/get/${id}`);
        const dataOffice = res.data.data;
        if (dataOffice) {
            return dataOffice;
        } else {
            console.error('Invalid response structure at getOfficeByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getOfficeByIdRequest: ', error);
        return null;
    }
}

export const updateOfficeByIdRequest = async (id: string, data: {name: string, oficinas: any[]}): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.put(`/backend/office/update/${id}`, data);
        const dataOffice = res.data.data;
        if (dataOffice) {
            return dataOffice;
        } else {
            console.error('Invalid response structure at updateOfficeByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at updateOfficeByIdRequest: ', error);
        return null;
    }
}

export const deleteOfficeRequest = async (id: string): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.delete(`/backend/office/delete/${id}`);
        const dataOffice = res.data.data;
        if (dataOffice) {
            return dataOffice;
        } else {
            console.error('Invalid response structure at deleteOfficeRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at deleteOfficeRequest: ', error);
        return null;
    }
}