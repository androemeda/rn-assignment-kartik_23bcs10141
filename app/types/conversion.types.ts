export type ConversionType = 'length' | 'temperature';

export type LengthUnit = 'meters' | 'feet';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface ConversionResult {
  value: number;
  unit: string;
}
