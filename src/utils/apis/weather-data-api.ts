import { CityType } from '../../types/weatherTypes';

const BASE_URL = 'http://dataservice.accuweather.com/';
const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY as string;
const endpoints = {
  autoComplete: 'locations/v1/cities/autocomplete',
  forecast_current_hour: 'forecasts/v1/hourly/1hour/',
  geo_position: 'locations/v1/cities/geoposition/search',
  get_city: 'locations/v1/',
};

/**
 * Fetches the list of cities that match the search query
 * @param query search query
 * @returns array of cities
 */
const autoComplete = async (query: string) => {
  const result = fetch(
    `${BASE_URL}${endpoints.autoComplete}?${new URLSearchParams({
      apikey: API_KEY,
      q: query,
    }).toString()}`
  )
    .then((res) => res.json())
    .then((data) => data as CityType[])
    .catch(() => {
      throw new Error('An error occurred while fetching the data');
    });

  return await result;
};

/**
 * Fetches the current weather data of the city
 * @param cityKey key of the city
 * @returns current weather data of the city
 */
const getCurrentWeatherData = async (cityKey: string) => {
  const result = fetch(
    `${BASE_URL}${
      endpoints.forecast_current_hour
    }${cityKey}?${new URLSearchParams({
      apikey: API_KEY,
      details: 'true',
      metric: 'true',
    }).toString()}`
  )
    .then((res) => res.json())
    .then((data) => data as unknown)
    .catch(() => {
      throw new Error('An error occurred while fetching the data');
    });

  return await result;
};

/**
 * Fetches the city key from the latitude and longitudes
 * @param lat Latitude
 * @param lon Longitude
 * @returns city key
 */
const getCityKeyFromLatLon = async (lat: string, lon: string) => {
  const result = fetch(
    `${BASE_URL}${endpoints.geo_position}?${new URLSearchParams({
      apikey: API_KEY,
      q: `${lat},${lon}`,
    }).toString()}`
  )
    .then((res) => res.json())
    .then((data) => data as unknown)
    .catch(() => {
      throw new Error('An error occurred while fetching the data');
    });

  return await result;
};

/**
 * Fetches the city data from the city key
 * @param key city key
 * @returns city data
 */
const getCityFromKey = async (key: string) => {
  const result = fetch(
    `${BASE_URL}${endpoints.get_city}${key}?${new URLSearchParams({
      apikey: API_KEY,
    }).toString()}`
  )
    .then((res) => res.json())
    .then((data) => data as unknown)
    .catch(() => {
      throw new Error('An error occurred while fetching the city data');
    });

  return await result;
};

export {
  autoComplete,
  getCurrentWeatherData,
  getCityKeyFromLatLon,
  getCityFromKey,
};
