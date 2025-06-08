/*    
    app.post("/backend/parameter/register", parameterController.registerParameter);
    app.get("/backend/parameter/get-all", parameterController.getParameters);
    app.get("/backend/parameter/get-name/:name", parameterController.getParameterByName);
    app.get("/backend/parameter/get/:id", parameterController.getParameterById);
    app.put("/backend/parameter/update/:id", parameterController.updateParameter);
    app.delete("/backend/parameter/delete/:id", parameterController.deleteParameter);
*/
``
import axios from './axios';

export const registerParameterRequest = async (data: { 
    parameterName: string; 
    parameterList: [string] 
}) => {
    try {
        const res = await axios.post(`/backend/parameter/register`, data);
        const dataParameter = res.data.data;
        if (dataParameter) {
            return dataParameter;
        } else {
            console.error('Invalid response structure at registerParameterRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at registerParameterRequest: ', error);
        return null;
    }
};

export const getAllParametersRequest = async (): Promise<any[] | null> => {
    try {
        const res = await axios.get(`/backend/parameter/get-all`);
        const dataParameters = res.data.data;
        if (dataParameters) {
            return dataParameters;
        } else {
            console.error('Invalid response structure at getAllParametersRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getAllParametersRequest: ', error);
        return null;
    }
};

export const getParameterByNameRequest = async (name: string): Promise<any | null> => {
    try {
        const res = await axios.get(`/backend/parameter/get-name/${name}`);
        const dataParameter = res.data.data;
        if (dataParameter) {
            return dataParameter;
        } else {
            console.error('Invalid response structure at getParameterByNameRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getParameterByNameRequest: ', error);
        return null;
    }
};

export const getParameterByIdRequest = async (id: string): Promise<any | null> => {
    try {
        const res = await axios.get(`/backend/parameter/get/${id}`);
        const dataParameter = res.data.data;
        if (dataParameter) {
            return dataParameter;
        } else {
            console.error('Invalid response structure at getParameterByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at getParameterByIdRequest: ', error);
        return null;
    }
};

export const updateParameterByIdRequest = async (id: string, data: {
    parameterName: string; 
    parameterList: [string]
}): Promise<any | null> => {
    try {
        const res = await axios.put(`/backend/parameter/update/${id}`, data);
        const dataParameter = res.data.data;
        if (dataParameter) {
            return dataParameter;
        } else {
            console.error('Invalid response structure at updateParameterByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at updateParameterByIdRequest: ', error);
        return null;
    }
};

export const deleteParameterByIdRequest = async (id: string): Promise<any | null> => {
    try {
        const res = await axios.delete(`/backend/parameter/delete/${id}`);
        const dataParameter = res.data.data;
        if (dataParameter) {
            return dataParameter;
        } else {
            console.error('Invalid response structure at deleteParameterByIdRequest:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error at deleteParameterByIdRequest: ', error);
        return null;
    }
};