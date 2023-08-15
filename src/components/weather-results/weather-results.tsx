/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './weather-results.module.css';
import {
  getCityFromKey,
  getCityKeyFromLatLon,
  getCurrentWeatherData,
} from '../../utils/apis/weather-data-api';
import { CityType, WeatherDataType } from '../../types/weatherTypes';
import backButton from '../../assets/icons/arrow_back.svg';
import locationIcon from '../../assets/icons/location.svg';
import humidityIcon from '../../assets/icons/humidity_icon.svg';
import feelsLikeIcon from '../../assets/icons/feels_like_icon.svg';
import ErrorModal from '../error-modal/error-modal';
import {
  ERROR_MESSAGE_CITY,
  ERROR_MESSAGE_WEATHER,
  ROUTE_TYPE_CITY,
  ROUTE_TYPE_LOCATION,
  TITLE_WEATHER_APP,
  WEATHER_ICON_BASE_URL,
} from '../../utils/constants/constants';
import Loader from '../loader/loader';

/**
 * Component to display weather data for a city or device location
 * @returns WeatherResults component
 */

function WeatherResults() {
  const { type, cityKey } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState<WeatherDataType[]>([]);
  const [city, setCity] = useState<CityType | undefined>(
    location?.state?.city as CityType
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Function to get weather data for a city. If city is not present in state,
     * it will fetch city data from cityKey passed from route.
     * @returns void
     */
    const getWeatherData = async () => {
      try {
        setIsLoading(true);
        if (cityKey) {
          const _weatherData = (await getCurrentWeatherData(
            cityKey
          )) as WeatherDataType[];

          if (!city) {
            const _city = (await getCityFromKey(cityKey)) as CityType;
            setCity(_city);
          }
          setWeatherData(_weatherData);
        }
        setIsLoading(false);
      } catch (error) {
        setError(ERROR_MESSAGE_WEATHER);
      }
    };

    /**
     * Function to get weather data for device location.
     * @returns void
     */
    const getDeviceLocationWeatherData = async () => {
      try {
        setIsLoading(true);
        if (location.state.coords) {
          const _city = (await getCityKeyFromLatLon(
            location.state.coords.latitude as string,
            location.state.coords.longitude as string
          )) as CityType;

          setCity(_city);
          const _weatherData = (await getCurrentWeatherData(
            _city.Key
          )) as WeatherDataType[];
          setWeatherData(_weatherData);
          setIsLoading(false);
        }
      } catch (error) {
        setError(ERROR_MESSAGE_CITY);
      }
    };

    /*
     - Function to get weather data based on route type
      If cityKey or device location (which are important data to get weather) is not present,
      it will navigate to home page.
     */
    switch (type) {
      case ROUTE_TYPE_CITY:
        if (cityKey) {
          void getWeatherData();
        } else {
          navigate('/');
        }
        break;
      case ROUTE_TYPE_LOCATION:
        if (location?.state && location?.state?.coords) {
          void getDeviceLocationWeatherData();
        } else {
          navigate('/');
        }
        break;
      default:
        navigate('/');
    }
  }, [type, location?.state?.coords, location?.state]);

  return (
    <>
      {error && (
        <ErrorModal
          errorMessage={error}
          buttonText="Go Back"
          buttonClick={() => {
            navigate('/');
            setError(null);
          }}
        />
      )}

      <div className={styles.card}>
        <div className={styles.card_header}>
          <div
            className={styles.back_arrow}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={backButton} alt="" />
          </div>
          <h2>{TITLE_WEATHER_APP}</h2>
        </div>
        <div className={styles.card_container}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.card_body}>
                <div className={styles.weather_icon}>
                  <img
                    src={`${WEATHER_ICON_BASE_URL}${weatherData[0].WeatherIcon}.svg`}
                    alt={weatherData[0].IconPhrase}
                    title={weatherData[0].IconPhrase}
                  />
                </div>
                <div className={styles.weather_temp}>
                  <h2>
                    {Math.round(weatherData[0].Temperature.Value)}
                    <span>{'°C'}</span>
                  </h2>
                  <p>{weatherData[0].IconPhrase}</p>
                </div>
                <div className={styles.location}>
                  <div>
                    <img src={locationIcon} alt="location-icon" />
                  </div>
                  <p
                    title={`${city?.LocalizedName || ''}, ${
                      city?.Country.LocalizedName || ''
                    }`}
                  >
                    {city?.LocalizedName}, {city?.Country.LocalizedName}
                  </p>
                </div>
              </div>
              <div className={styles.card_footer}>
                <div className={styles.block}>
                  <div>
                    <img src={feelsLikeIcon} alt="" />
                  </div>
                  <div>
                    <h4>
                      {Math.round(weatherData[0].RealFeelTemperature.Value)}°C
                    </h4>
                    <p>{'Feels like'}</p>
                  </div>
                </div>
                <div className={styles.block}>
                  <div>
                    <img src={humidityIcon} alt="humidity-icon" />
                  </div>
                  <div className={styles.block_item}>
                    <h4>{Math.round(weatherData[0].RelativeHumidity)}%</h4>
                    <p>{'Humidity'}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherResults;
