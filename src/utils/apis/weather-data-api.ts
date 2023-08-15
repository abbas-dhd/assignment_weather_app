import { CityType } from '../../types/weatherTypes';

const baseUrl = 'http://dataservice.accuweather.com/';
const endpoints = {
  autoComplete: 'locations/v1/cities/autocomplete',
  forecast_current_hour: 'forecasts/v1/hourly/1hour/',
  geo_position: 'locations/v1/cities/geoposition/search',
  get_city: 'locations/v1/',
};

const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY as string;

const autoComplete = async (query: string) => {
  const result = fetch(
    `${baseUrl}${endpoints.autoComplete}?${new URLSearchParams({
      apikey: apiKey,
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

const getCurrentWeatherData = async (cityKey: string) => {
  const result = fetch(
    `${baseUrl}${
      endpoints.forecast_current_hour
    }${cityKey}?${new URLSearchParams({
      apikey: apiKey,
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

const getCityKeyFromLatLon = async (lat: string, lon: string) => {
  const result = fetch(
    `${baseUrl}${endpoints.geo_position}?${new URLSearchParams({
      apikey: apiKey,
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
const getCityFromKey = async (key: string) => {
  const result = fetch(
    `${baseUrl}${endpoints.get_city}${key}?${new URLSearchParams({
      apikey: apiKey,
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
