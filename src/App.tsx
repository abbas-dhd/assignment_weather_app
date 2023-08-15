import styles from './app.module.css';
import WeatherResults from './components/weather-results/weather-results';
import WeatherSearch from './components/weather-search/weather-search';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/weather-search" element={<WeatherSearch />} />
        <Route path="/" element={<WeatherSearch />} />
        <Route path="/weather/:type/:cityKey?" element={<WeatherResults />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
