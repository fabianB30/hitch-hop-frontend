import axios from './axios';


export const userStatisticsRequest = async (): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.get(`/backend/statistics/users`);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}

export const filteredUserCountByMonthRequest = async (data: {institutionId: string, startDate: string, endDate: string, genres: [string], role: string}): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.post(`/backend/statistics/users/by-month`, data);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}

export const statisticsUserCountByAgeRangesRequest = async (data: {institutionId: string, ranges: [{min: string, max: string}], genre: string}): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.post(`/backend/statistics/users/by-age-range`, data);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}

export const statisticsFreeVsChargedTripsRequest = async (): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.get(`/backend/statistics/trips/free-vs-paid`);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}
export const statisticsVehicleCountByDriverRequest = async (): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.get(`/backend/statistics/vehicles/by-driver`);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}

//app.get("/backend/statistics/trips/passenger-approval", statisticsController.tripPassengerApprovalStats);
export const statisticsTripPassengerApprovalStatsRequest = async (): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.get(`/backend/statistics/trips/passenger-approval`);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}
// app.get("/backend/statistics/trips/hour-range", statisticsController.getTripsByHourRange);
export const statisticsTripsByHourRangeRequest = async (): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.get(`/backend/statistics/trips/hour-range`);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}

export const filteredTripCountByMonthRequest = async (data: {institutionId: string, startDate: string, endDate: string, hourStart: string, hourEnd: string}): Promise<IJwtResponse | null> => {
	try {
		const res = await axios.post(`/backend/statistics/trips/by-month`, data);
		const statistics = res.data.data;
		if (statistics) {
			return statistics;
		} else{
			console.error('Invalid response structure:', res);
	            return null;
		}
	} catch (error) {
		console.error('http request error: ', error);
        return null;
	}
}