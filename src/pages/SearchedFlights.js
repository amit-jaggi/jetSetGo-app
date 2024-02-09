import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Select,
  InputAdornment,
  MenuItem,
  Slider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SpiceJet from '../assets/spice-jet.png';
import AirIndia from '../assets/air-india.png';
import moment from 'moment';
import { ConnectingAirports, FilterAlt } from '@mui/icons-material';
import { AIRLINES } from '../utils/constant';
import { filterSearchedAirlines, sortSearchedPrice } from '../actions';


const SearchedFlights = () => {
  const searchedFlights = useSelector(state => state.searchedflights);

  const dispatch = useDispatch();

  const [filterAirlines, setFilterAirlines] = useState(AIRLINES[1].id);
  const [sortPrice, setSortPrice] = useState(5000);

  function handleAirlineChange(e) {
    const airline = e.target.value;
    setFilterAirlines(airline)
    dispatch(filterSearchedAirlines(airline))
  }

  const handlePriceChange = (event, newValue) => {
    dispatch(sortSearchedPrice(newValue))
    setSortPrice(newValue);
  };

  useEffect(() => {
    let getDetails;
    if (searchedFlights !== undefined) {
      getDetails = searchedFlights.map((el, index) => index === 0 && ({
        fare: el.fare,
        airlineName: el.displayData.airlines[0].airlineName === 'JetSpice'
          ? 'JetSpice'
          : 'Air India',
      }));
    }
    
    if (getDetails === undefined) {
      setFilterAirlines('');
      setSortPrice(0);
    } else {
      setFilterAirlines(getDetails[0]?.airlineName);
      setSortPrice(getDetails[0]?.fare);
    }
  }, [searchedFlights]);

  return (
    <Box className='flight-parent-container'>
      <Paper elevation={12} className='flight-child-container'>
        <Box className='display-controls'>
          <Paper elevation={6} className='control-container'>
            <Box className='filter-control'>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '2%',
                  paddingLeft: '5%',
                }}
              >Airlines</Typography>
              <Select
                displayEmpty
                value={filterAirlines}
                onChange={(e) => handleAirlineChange(e)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterAlt size={20} />
                  </InputAdornment>
                }
                sx={{
                  width: '100%',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: 'grey',
                  marginBottom: '10%',
                }}
              >
                <MenuItem value='' disabled><em>All</em></MenuItem>
                {AIRLINES.map(({ id, value }) => (
                  <MenuItem key={id} value={id}>{value}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box className='filter-control'>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '2%',
                  paddingLeft: '5%',
                }}
              >Price</Typography>
              <Slider
                value={sortPrice}
                onChange={handlePriceChange}
                aria-labelledby="volume-slider"
                valueLabelDisplay="auto"
                min={1000}
                max={5000}
                sx={{
                  width: '100%',
                }}
              />
            </Box>
          </Paper>
        </Box>
        <Box
          className='display-data'
          sx={{ margin: searchedFlights !== undefined && searchedFlights.length !== 0 ? 'auto' : 'auto' }}
        >
          {
            searchedFlights !== undefined && searchedFlights.length === 0 && <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: '40px',
              }}>No Airlines Available</Typography>
          }
          {
            searchedFlights !== undefined && searchedFlights.length !== 0 && searchedFlights.map((el) => {
              return <Paper key={el.id} elevation={12} className='flight-box'>
                <Box
                  sx={{
                    width: '16%',
                    minHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={el.displayData.airlines[0].airlineName === 'JetSpice'
                      ? SpiceJet
                      : AirIndia}
                    alt={el.displayData.airlines[0].airlineName}
                    height={100}
                    style={{ borderRadius: '10px' }}
                  />
                </Box>
                <Box
                  sx={{
                    width: '15%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '3% 0',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '20px',
                    }}
                  >{moment(el.displayData.source.depTime).format("hh:mm")}</Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '17px',
                    }}
                  >{el.displayData.source.airport.cityName}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '20%',
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '2% 0',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '23px',
                    }}
                  >{el.displayData.totalDuration}</Typography>
                  {
                    el.displayData.stopInfo.toLowerCase() === 'non stop'
                      ? <Divider sx={{ width: '90%' }} variant="middle" />
                      : <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-evenly'
                        }}
                      >
                        <Divider sx={{ width: '40%' }} />
                        <ConnectingAirports
                          sx={{
                            fontSize: '25px',
                          }}
                        />
                        <Divider sx={{ width: '40%' }} />
                      </Box>
                  }
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '15px',
                    }}
                  >{el.displayData.stopInfo}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '15%',
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '3% 0',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '20px',
                    }}
                  >{moment(el.displayData.arrTime).format("hh:mm")}</Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '17px',
                    }}
                  >{el.displayData.destination.airport.cityName}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '20%',
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '2% 0',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '20px',
                    }}
                  >₹&nbsp;{el.fare}</Typography>
                  <Button
                    variant='contained'
                  >Book</Button>
                </Box>
              </Paper>
            })
          }
        </Box>
      </Paper>
    </Box>
  )
}

export default SearchedFlights;
