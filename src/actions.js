import { ACTIONS } from './utils/constant';

// Action creator's
export const fetchAllFlights = (allFlights) => {
	return {
		type: ACTIONS.FETCH_ALL_FLIGHTS,
		payload: allFlights,
	}
}

export const searchAllFlights = (searchFlights) => {
	return {
		type: ACTIONS.SEARCH_FLIGHTS,
		payload: searchFlights,
	}
}

export const filterAllAirlines = (airlines) => {
	return {
		type: ACTIONS.FILTER_ALL_FLIGHTS,
		payload: airlines,
	}
}

export const sortAllPrice = (airlinesPrice) => {
	return {
		type: ACTIONS.SORT_ALL_PRICE,
		payload: airlinesPrice,
	}
}

export const filterSearchedAirlines = (airlines) => {
	return {
		type: ACTIONS.FILTER_SEARCHED_FLIGHTS,
		payload: airlines,
	}
}

export const sortSearchedPrice = (airlinesPrice) => {
	return {
		type: ACTIONS.SORT_SEARCHED_PRICE,
		payload: airlinesPrice,
	}
}