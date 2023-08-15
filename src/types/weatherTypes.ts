export type CountryType = {
  ID: string;
  LocalizedName: string;
};

export type AdministrativeAreaType = {
  ID: string;
  LocalizedName: string;
};

export type CityType = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: CountryType;
  AdministrativeArea: AdministrativeAreaType;
};

export type TemperatureType = {
  Value: number;
  Unit: string;
  UnitType: number;
};

export type RealFeelTemperatureType = {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase: string;
};
export type RealFeelTemperatureShadeType = {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase: string;
};

export type WeatherDataType = {
  DateTime: string;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  IsDaylight: boolean;
  Temperature: TemperatureType;
  RealFeelTemperature: RealFeelTemperatureType;
  RealFeelTemperatureShade: RealFeelTemperatureShadeType;
  WetBulbTemperature: TemperatureType;
  DewPoint: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Wind: {
    Speed: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
  };
  WindGust: {
    Speed: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  Visibility: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Ceiling: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  UVIndex: number;
  UVIndexText: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  TotalLiquid: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Rain: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Snow: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Ice: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  CloudCover: number;
  Evapotranspiration: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  SolarIrradiance: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  MobileLink: string;
  Link: string;
};
