import axios from './axios';

// 1
// No la encontré, puede usar el getTrips del archivo trip.tsx
// 2
//averageRevenuePerDriver
//app.get("/backend/statistics/trips/driver-revenue", statisticsController.averageRevenuePerDriver);
export const queryAverageRevenuePerDriver = async (): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/trips/driver-revenue`);
    const query = res.data.data;
    if (query) {
      return query;
    } else{
      console.error('Invalid response structure:', res);
              return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
        return null;
  }
}
//3
//topDriversByTripCount
//app.get("/backend/statistics/trips/top-drivers", statisticsController.topDriversByTripCount);
export const queryTopDriversByTripCount = async (): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/trips/top-drivers`);
    const query = res.data.data;
    if (query) {
      return query;
    } else{
      console.error('Invalid response structure:', res);
              return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
        return null;
  }
}
//4
//topUsersWithApprovedTrips
//app.get("/backend/statistics/users/top-approved", statisticsController.topUsersWithApprovedTrips);
export const queryTopUsersWithApprovedTrips = async (limit: number): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/users/top-approved`, {
      params: { limit }
    });
    const query = res.data.data;
    if (query) {
      return query;
    } else {
      console.error('Invalid response structure:', res);
      return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
    return null;
  }
};

//5
//topVisitedPlaces
//app.get("/backend/statistics/places/top", statisticsController.topVisitedPlaces);
export const queryTopVisitedPlaces = async (): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/places/top`);
    const query = res.data.data;
    if (query) {
      return query;
    } else {
      console.error('Invalid response structure:', res);
      return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
    return null;
  }
};
//6
//recentRegisteredUsers
//app.get("/backend/statistics/users/recent", statisticsController.recentRegisteredUsers);
export const queryRecentRegisteredUsers = async (): Promise<any> => {
  try {
    const res = await axios.get(`/backend/statistics/users/recent`);
    const query = res.data.data;
    if (query) {
      return query;
    } else {
      console.error('Invalid response structure:', res);
      return null;
    }
  } catch (error) {
    console.error("Error en la consulta:", error);
    return null;
  }
};
//7
//topDriversWithMostCancellations
//app.get("/backend/statistics/trips/top-cancellations", statisticsController.topDriversWithMostCancellations);
export const queryTopDriversWithMostCancellations = async (): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/trips/top-cancellations`);
    const query = res.data.data;
    if (query) {
      return query;
    } else {
      console.error('Invalid response structure:', res);
      return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
    return null;
  }
};
//8
//topDriversWithMostFreeTrips
//app.get("/backend/statistics/trips/top-free", statisticsController.topDriversWithMostFreeTrips);
export const queryTopDriversWithMostFreeTrips = async (): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/trips/top-free`);
    const query = res.data.data;
    if (query) {
      return query;
    } else {
      console.error('Invalid response structure:', res);
      return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
    return null;
  }
};
//9
//topTripsByCostPerPerson
//app.get("/backend/statistics/trips/top-cost", statisticsController.topTripsByCostPerPerson);
export const queryTopTripsByCostPerPerson = async (): Promise<IJwtResponse | null> => {
  try {
    const res = await axios.get(`/backend/statistics/trips/top-cost`);
    const query = res.data.data;
    if (query) {
      return query;
    } else {
      console.error('Invalid response structure:', res);
      return null;
    }
  } catch (error) {
    console.error('http request error: ', error);
    return null;
  }
};