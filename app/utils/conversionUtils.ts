import { LengthUnit, TemperatureUnit } from '../types/conversion.types';

export const convertLength = (
  value: number,
  fromUnit: LengthUnit,
  toUnit: LengthUnit
): number => {
  if (fromUnit === toUnit) return value;

  if (fromUnit === 'meters' && toUnit === 'feet') {
    return value * 3.28084;
  } else if (fromUnit === 'feet' && toUnit === 'meters') {
    return value / 3.28084;
  }

  return value;
};

export const convertTemperature = (
  value: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  if (fromUnit === toUnit) return value;

  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return (value * 9) / 5 + 32;
  } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return ((value - 32) * 5) / 9;
  }

  return value;
};

export const isValidNumber = (text: string): boolean => {
  if (text === '' || text === '-' || text === '.') return true;
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(text);
};

export const formatNumber = (num: number): string => {
  return num.toFixed(4).replace(/\.?0+$/, '');
};
