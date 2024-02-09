import { ACTIONS } from './utils/constant';

const initialState = {
	allFlights: [],
	cities: [],
	searchedflights: [],
	filterFlights: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.FETCH_ALL_FLIGHTS:
			const cities = [
				...new Set(
					[
						...payload.map(el => el.displayData.source.airport.cityName),
						...payload.map(el => el.displayData.destination.airport.cityName)
					])
			].map(el => ({
				id: el.toLowerCase(),
				city: el,
			}))
			return {
				...state,
				allFlights: [...payload],
				cities: [...cities],
				filterFlights: [...payload],
			};
		case ACTIONS.SEARCH_FLIGHTS:
			const flights = state.allFlights.filter(
				(el) => {
					let source = el.displayData.source.airport.cityName;
					let destination = el.displayData.destination.airport.cityName;

					let departure = payload.oneWay.firstTripDeparture;
					let arrival = payload.oneWay.firstTripArrival;

					return (source === departure && destination === arrival) && el
				}
			)
			return {
				...state,
				searchedflights: [...flights],
			}
		case ACTIONS.FILTER_ALL_FLIGHTS:
			const filterAll = state.allFlights.filter(
				(el) => payload === 'all'
					? el
					: payload === el.displayData.airlines[0].airlineName
			);
			return {
				...state,
				filterFlights: [...filterAll],
			}
		case ACTIONS.SORT_ALL_PRICE:
			const sortAll = state.allFlights.filter(
				(el) => el.fare <= payload
			);
			return {
				...state,
				filterFlights: [...sortAll],
			}
		case ACTIONS.FILTER_SEARCHED_FLIGHTS:
			const filterSearched = state.allFlights.filter(
				(el) => payload === 'all'
					? el
					: payload === el.displayData.airlines[0].airlineName
			);
			return {
				...state,
				searchedflights: [...filterSearched],
			}
		case ACTIONS.SORT_SEARCHED_PRICE:
			const sortSearched = state.allFlights.filter(
				(el) => el.fare <= payload
			);
			return {
				...state,
				searchedflights: [...sortSearched],
			}
		default:
			return state;
	}
}

export default rootReducer;