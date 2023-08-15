import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { autoComplete } from '../../utils/apis/weather-data-api';
import { CityType } from '../../types/weatherTypes';
import {
  ERROR_MESSAGE_CITIES,
  ERROR_MESSAGE_LOCATION,
  ERROR_MESSAGE_LOCATION_PERMISSION,
  ROUTE_TYPE_CITY,
  ROUTE_TYPE_LOCATION,
  TITLE_WEATHER_APP,
} from '../../utils/constants/constants';
import ErrorModal from '../error-modal/error-modal';
import styles from './weather-search.module.css';

/**
 * Component to search for a city or get current location of the device
 * @returns WeatherSearch Component
 */
function WeatherSearch() {
  const navigate = useNavigate();

  const [cityList, setCityList] = useState<CityType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  /**
   * Function to get list of  cities based on query string
   * @param query - query string to search for cities
   */
  const displayCities = async (query: string) => {
    try {
      if (query.length) {
        const cities = await autoComplete(query);
        setCityList(cities || []);
      } else {
        setCityList([]);
      }
    } catch {
      setError(ERROR_MESSAGE_CITIES);
    }
  };
  // debouncing the displayCities function to avoid unnecessary api calls.
  const debouncedDisplayCities = debounce(displayCities, 500);

  /**
   * Function to handle city selection and navigate to weather results page
   * @param city - city object to be selected
   */
  const onCitySelectHandler = (city: CityType) => {
    setCityList([]);
    setSelectedCity(`${city.LocalizedName}`);
    navigate(`/weather/${ROUTE_TYPE_CITY}/${city.Key}`, {
      state: { city: city },
    });
  };

  /**
   * Function to get current location of the device and navigate to weather results page
   */
  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          navigate(`/weather/${ROUTE_TYPE_LOCATION}/`, {
            state: {
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            },
          });
        },
        () => {
          setError(ERROR_MESSAGE_LOCATION);
        }
      );
    } else {
      setError(ERROR_MESSAGE_LOCATION_PERMISSION);
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          errorMessage={error}
          buttonText="Ok"
          buttonClick={() => {
            setError(null);
          }}
        />
      )}

      <div className={styles.card}>
        <div className={styles.card_header}>
          <h2>{TITLE_WEATHER_APP}</h2>
        </div>
        <div className={styles.card_body}>
          <input
            type="text"
            value={selectedCity || ''}
            placeholder="Enter City Name"
            onChange={(e) => {
              void debouncedDisplayCities(e.currentTarget.value);
              setSelectedCity(e.currentTarget.value);
            }}
            onFocus={(e) => {
              void debouncedDisplayCities(e.currentTarget.value);
            }}
            onBlur={() => {
              // to avoid instantly closing the list of cities
              setTimeout(() => {
                setCityList([]);
              }, 250);
            }}
          />
          {cityList.length ? (
            <div className={styles.auto_complete}>
              {cityList.map((city) => {
                return (
                  <div
                    key={city.Key}
                    className={styles.list_item}
                    onClick={() => {
                      void onCitySelectHandler(city);
                    }}
                  >
                    <span>{city?.LocalizedName},</span>
                    <span>{city?.Country.ID}</span>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className={styles.separator}>{'or'}</div>
          <button
            className={styles.button}
            onClick={() => {
              getDeviceLocation();
            }}
          >
            {'Get Device Location'}
          </button>
        </div>
      </div>
    </>
  );
}

export default WeatherSearch;
