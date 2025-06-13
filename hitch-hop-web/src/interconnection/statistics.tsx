import axios from './axios';


export const userStatisticsRequest = async (): Promise<IJwtResponse | null> => {
	try {
		const res = axios.get(`/backend/statistics/users`);
		const statistics = res.data.data;
		if (statistics) {
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}


//app.get("/backend/statistics/users", statisticsController.userStatistics);

/*const result = {
      totalDrivers: users[0].totalDrivers[0]?.count || 0,
      totalPassengers: users[0].totalPassengers[0]?.count || 0,
      totalActiveUsers: users[0].totalActive[0]?.count || 0,
      averageAge: users[0].avgAge[0]?.avgAge ? Math.round(users[0].avgAge[0].avgAge * 100) / 100 : null
    };*/