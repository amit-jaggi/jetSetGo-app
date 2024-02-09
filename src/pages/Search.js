import React, { useEffect, useState } from 'react';
import {
	Paper,
	Box,
	Button,
	FormControl,
	FormHelperText,
	Select,
	MenuItem,
	RadioGroup,
	FormControlLabel,
	Radio,
	InputAdornment,
} from '@mui/material';
import { FlightTakeoff, FlightLand, AirlineSeatReclineExtra } from '@mui/icons-material';
import { TRIPS, SEARCH_BUTTON, wordCapitalization } from '../utils/constant';
import OneWayTripDatePicker from '../components/OneWayTripDatePicker';
import TwoWayTripDatePicker from '../components/TwoWayTripDatePicker';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAllFlights } from '../actions';

const Search = () => {
	const dispatch = useDispatch();
	
	const cities = useSelector(state => state.cities);

	const [tripType, setTripType] = useState('one-way');

	const [oneWayTrip, setOneWayTrip] = useState({
		firstTripDeparture: '',
		firstTripArrival: '',
		firstTripDateFrom: new Date(),
		firstTripDateTo: new Date(),
		firstTripTotalTraveller: '',
	});

	const [twoWayTrip, setTwoWayTrip] = useState({
		secondTripDeparture: '',
		secondTripArrival: '',
		secondTripDateFrom: new Date(),
		secondTripDateTo: new Date(),
		secondTripTotalTraveller: '',
	});

	const {
		firstTripDeparture,
		firstTripArrival,
		firstTripDateFrom,
		firstTripDateTo,
		firstTripTotalTraveller,
	} = oneWayTrip;

	const {
		secondTripDeparture,
		secondTripArrival,
		secondTripDateFrom,
		secondTripDateTo,
		secondTripTotalTraveller,
	} = twoWayTrip;

	function handleFirstTripChange(key, value) {
		setOneWayTrip((prevInput) => ({ ...prevInput, [key]: value }));
	}

	function handleSecondTripChange(key, value) {
		setTwoWayTrip((prevInput) => ({ ...prevInput, [key]: value }));
	}

	useEffect(() => {
		if (tripType === 'two-way') {
			setTwoWayTrip((prevState) => ({
				...prevState,
				secondTripDeparture: firstTripArrival,
				secondTripArrival: firstTripDeparture,
				firstTripTotalTraveller,
			}));
		}
	}, [tripType, firstTripArrival, secondTripArrival, firstTripDeparture, secondTripDeparture, firstTripTotalTraveller]);

	function isDisabled() {
		if (tripType === 'two-way') {
			return [
				firstTripDeparture,
				firstTripArrival,
				firstTripDateFrom,
				firstTripDateTo,
				firstTripTotalTraveller,
				firstTripDeparture === firstTripArrival && ''
			].includes("") && [
				secondTripDeparture,
				secondTripArrival,
				secondTripDateFrom,
				secondTripDateTo,
				secondTripTotalTraveller,
				secondTripDeparture === secondTripArrival && ''
			].includes("")
		} else {
			return [
				firstTripDeparture,
				firstTripArrival,
				firstTripDateFrom,
				firstTripDateTo,
				firstTripTotalTraveller,
				firstTripDeparture === firstTripArrival && ''
			].includes("");
		}
	}

	function handleSubmit() {
		if (tripType === 'one-way') {
			dispatch(searchAllFlights({
				oneWay: {
					firstTripDeparture,
					firstTripArrival,
					firstTripDateFrom,
					firstTripDateTo,
					firstTripTotalTraveller,
				}
			}));
		} else {
			dispatch();
		}
	}

	return (
		<Box className='search-container'>
			<Paper elevation={12} className='search-flight'>
				<Box className='style-trip'>
					<FormControl>
						<RadioGroup
							row
							value={tripType}
							onChange={(e) => setTripType(e.target.value)}
						>
							{
								TRIPS.map((el, index) => <FormControlLabel
									key={index}
									value={el.id}
									control={<Radio />}
									label={el.value}
									sx={
										{
											"& .MuiFormControlLabel-label": {
												width: '120px',
												fontFamily: 'Poppins',
												fontWeight: '500',
												mr: '1%',
											}
										}
									}
								/>)
							}
						</RadioGroup>
					</FormControl>
				</Box>

				<Box className='input-container'>
					<Box className='input-fields'>
						<Box className='arrival-departure-container'>

						</Box>
						<FormControl error={firstTripDeparture === firstTripArrival && ![firstTripDeparture, firstTripArrival].includes('')}>
							<Select
								displayEmpty
								value={firstTripDeparture}
								onChange={(e) => handleFirstTripChange("firstTripDeparture", e.target.value)}
								startAdornment={
									<InputAdornment position="start">
										<FlightTakeoff />
									</InputAdornment>
								}
								sx={{
									width: '180px',
									fontFamily: 'Poppins',
									fontWeight: 500,
									fontStyle: 'non-italic',
									color: 'grey',
								}}
							>
								<MenuItem value='' disabled><em>From</em></MenuItem>
								{cities !== undefined && cities.map(({ id, city }) => (
									<MenuItem key={id} value={city}>{city}</MenuItem>
								))}
							</Select>

						</FormControl>

						<FormControl error={firstTripDeparture === firstTripArrival && ![firstTripDeparture, firstTripArrival].includes('')}>
							<Select
								displayEmpty
								value={firstTripArrival}
								onChange={(e) => handleFirstTripChange("firstTripArrival", e.target.value)}
								startAdornment={
									<InputAdornment position="start">
										<FlightLand />
									</InputAdornment>
								}
								sx={{
									width: '180px',
									fontFamily: 'Poppins',
									fontWeight: 500,
									fontStyle: 'non-italic',
									color: 'grey',
								}}
							>
								<MenuItem value='' disabled><em>To</em></MenuItem>
								{cities !== undefined && cities.map(({ id, city }) => (
									<MenuItem key={id} value={city}>{city}</MenuItem>
								))}
							</Select>
						</FormControl>

						<OneWayTripDatePicker handleFirstTripChange={handleFirstTripChange} />

						<Select
							displayEmpty
							value={firstTripTotalTraveller}
							onChange={(e) => handleFirstTripChange("firstTripTotalTraveller", e.target.value)}
							startAdornment={
								<InputAdornment position="start">
									<AirlineSeatReclineExtra size={20} />
								</InputAdornment>
							}
							sx={{
								width: '180px',
								fontFamily: 'Poppins',
								fontWeight: 500,
								fontStyle: 'non-italic',
								color: 'grey',
							}}
						>
							<MenuItem value='' disabled><em>Travellers</em></MenuItem>
							{[...Array(10).keys()].map((num) => (
								<MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
							))}
						</Select>
					</Box>

					<Box className='error-field'>
						{
							firstTripDeparture === firstTripArrival &&
							![firstTripDeparture, firstTripArrival].includes('') &&
							<FormHelperText sx={{ color: 'red' }}>Source and Destination cannot be same.</FormHelperText>
						}
					</Box>
				</Box>

				{
					tripType === 'two-way' && (<Box className='input-container'>
						<Box className='input-fields'>
							<Box className='arrival-departure-container'>

							</Box>
							<FormControl error={secondTripDeparture === secondTripArrival && ![secondTripDeparture, secondTripArrival].includes('')}>
								<Select
									displayEmpty
									value={secondTripDeparture}
									onChange={(e) => handleSecondTripChange("secondTripDeparture", e.target.value)}
									startAdornment={
										<InputAdornment position="start">
											<FlightTakeoff />
										</InputAdornment>
									}
									sx={{
										width: '180px',
										fontFamily: 'Poppins',
										fontWeight: 500,
										fontStyle: 'non-italic',
										color: 'grey',
									}}
								>
									<MenuItem value='' disabled><em>From</em></MenuItem>
									{cities !== undefined && cities.map(({ id, city }) => (
										<MenuItem key={id} value={city}>{city}</MenuItem>
									))}
								</Select>

							</FormControl>

							<FormControl error={secondTripDeparture === secondTripArrival && ![secondTripDeparture, secondTripArrival].includes('')}>
								<Select
									displayEmpty
									value={secondTripArrival}
									onChange={(e) => handleSecondTripChange("secondTripArrival", e.target.value)}
									startAdornment={
										<InputAdornment position="start">
											<FlightLand />
										</InputAdornment>
									}
									sx={{
										width: '180px',
										fontFamily: 'Poppins',
										fontWeight: 500,
										fontStyle: 'non-italic',
										color: 'grey',
									}}
								>
									<MenuItem value='' disabled><em>To</em></MenuItem>
									{cities !== undefined && cities.map(({ id, city }) => (
										<MenuItem key={id} value={city}>{city}</MenuItem>
									))}
								</Select>
							</FormControl>

							<TwoWayTripDatePicker handleSecondTripChange={handleSecondTripChange} />

							<Select
								displayEmpty
								value={secondTripTotalTraveller}
								onChange={(e) => handleSecondTripChange("secondTripTotalTraveller", e.target.value)}
								startAdornment={
									<InputAdornment position="start">
										<AirlineSeatReclineExtra size={20} />
									</InputAdornment>
								}
								sx={{
									width: '180px',
									fontFamily: 'Poppins',
									fontWeight: 500,
									fontStyle: 'non-italic',
									color: 'grey',
								}}
							>
								<MenuItem value='' disabled><em>Travellers</em></MenuItem>
								{[...Array(10).keys()].map((num) => (
									<MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
								))}
							</Select>
						</Box>

						<Box className='error-field'>
							{
								secondTripDeparture === secondTripArrival &&
								![secondTripDeparture, secondTripArrival].includes('') &&
								<FormHelperText sx={{ color: 'red' }}>Source and Destination cannot be same.</FormHelperText>
							}
						</Box>
					</Box>)
				}


				<Box className='shift-btn-right'>
					<Button
						className='search-btn'
						variant="contained"
						disabled={isDisabled()}
						onClick={handleSubmit}
					>
						<Link to='/searched flights' style={{ textDecoration: 'none', color: '#fff' }}>
							{wordCapitalization(SEARCH_BUTTON)}
						</Link>
					</Button>
				</Box>
			</Paper>

		</Box>
	)
}

export default Search;
