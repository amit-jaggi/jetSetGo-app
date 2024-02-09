import './App.css';
import { useEffect } from 'react';
import { FLIGHTS_URL } from './utils/constant';
import { useDispatch } from 'react-redux';
import { fetchAllFlights } from './actions';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import AllFlights from './pages/AllFlights';
import SearchedFlights from './pages/SearchedFlights';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchFlight = async (url) => {
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error(response);
        }
        const flights = await response.json();
        if (flights.message === 'Success') {
          dispatch(fetchAllFlights(flights.data.result));
        }
      }
      fetchFlight(FLIGHTS_URL);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path='/searched flights' element={<SearchedFlights />} />
          <Route path="/all flights" element={<AllFlights />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
