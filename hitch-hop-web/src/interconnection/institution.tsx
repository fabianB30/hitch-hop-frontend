import axios from './axios';

/*  app.post("/backend/institution/register", institutionController.registerInstitution);
  app.get("/backend/institution/get-all", institutionController.getInstitutions);
  app.get("/backend/institution/get/:id", institutionController.getInstitutionById);
  app.put("/backend/institution/update/:id", institutionController.updateInstitution);
  app.delete("/backend/institution/delete/:id", institutionController.deleteInstitution);
 */

export const registerInstitutionRequest = async (data :{name, oficinas}) : Promise<IJwtResponse | null> => {
    try {
        const res = await axios.post('/backend/institution/register',data);
        const dataInstitution = res.data.data;
        if (dataInstitution) {
            return dataInstitution;
        } else {
            return console.error('Invalid response structure at registerInstitutionRequest:',res);
        }
    } catch (error) {
        console.error('http request error at registerInstitutionRequest: ', error);
        return null;
    };
};

export const getAllInstitutionsRequest = async (): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get('/backend/institution/get-all');
        const dataInstitutions = res.data.data;
        if (dataInstitutions) {
            return dataInstitutions;
        } else {
            console.error('Invalid response structure at getAllInstitutionsRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getAllInstitutionsRequest: ', error);
        return null;
    }
};

export const getInstitutionByIdRequest = async (id: string): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/institution/get/${id}`);
        const dataInstitution = res.data.data;
        if (dataInstitution) {
            return dataInstitution;
        } else {
            console.error('Invalid response structure at getInstitutionByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getInstitutionByIdRequest: ', error);
        return null;
    }
}

export const updateInstitutionByIdRequest = async (id: string, data: {name: string, oficinas: any[]}): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.put(`/backend/institution/update/${id}`, data);
        const dataInstitution = res.data.data;
        if (dataInstitution) {
            return dataInstitution;
        } else {
            console.error('Invalid response structure at updateInstitutionByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at updateInstitutionByIdRequest: ', error);
        return null;
    }
};

export const deleteInstitutionRequest = async (id: string): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.delete(`/backend/institution/delete/${id}`);
        const dataInstitution = res.data.data;
        if (dataInstitution) {
            return dataInstitution;
        } else {
            console.error('Invalid response structure at deleteInstitutionRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at deleteInstitutionRequest: ', error);
        return null;
    }
}