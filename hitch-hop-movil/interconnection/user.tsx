import axios from './axios';

export type User = {
  _id: string,
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
    type: "VA" | "VC" | "SP";
    place: string;
    timestamp: string;
    tripDate?: string;
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

export const getNotificationsByUserRequest = async (id: string): Promise<IJwtResponse | null> => {
    try {
        const res = await axios.get(`/backend/user/get-notifications/${id}`);
        const notifications = res.data.data;
        if (notifications) {
            return notifications;
        } else {
            console.error('Invalid response structure:', res);
            return null;
        }
    } catch (error) {
        console.error('http request error: ', error);
        return null;
    }
};

export const changePasswordRequest = async (
  data: { email: string; currentPassword: string; newPassword: string }
): Promise<{ success: boolean; msg?: string }> => {
  try {
    const res = await axios.post(`/backend/user/update-password`, data);

    console.log("Password change response:", res.data);

    if (res.status === 200 || res.status === 201) {
      return { success: true };
    } else {
      return { success: false, msg: res.data?.msg || "Respuesta inesperada del servidor." };
    }
  } catch (error: any) {
    return {
      success: false,
      msg: error.response?.data?.msg || "Error al cambiar contraseña.",
    };
  }
};

