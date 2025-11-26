import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  ConversionType,
  LengthUnit,
  TemperatureUnit,
} from '../types/conversion.types';
import {
  convertLength,
  convertTemperature,
  isValidNumber,
  formatNumber,
} from '../utils/conversionUtils';

interface ConverterFormProps {
  conversionType: ConversionType;
}

const ConverterForm: React.FC<ConverterFormProps> = ({ conversionType }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(
    conversionType === 'length' ? 'meters' : 'celsius'
  );
  const [toUnit, setToUnit] = useState<string>(
    conversionType === 'length' ? 'feet' : 'fahrenheit'
  );
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (conversionType === 'length') {
      setFromUnit('meters');
      setToUnit('feet');
    } else {
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    }
    setInputValue('');
    setResult('');
  }, [conversionType]);

  useEffect(() => {
    if (inputValue === '' || inputValue === '-' || inputValue === '.') {
      setResult('');
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setResult('');
      return;
    }

    let converted: number;
    if (conversionType === 'length') {
      converted = convertLength(
        numValue,
        fromUnit as LengthUnit,
        toUnit as LengthUnit
      );
    } else {
      converted = convertTemperature(
        numValue,
        fromUnit as TemperatureUnit,
        toUnit as TemperatureUnit
      );
    }

    setResult(formatNumber(converted));
  }, [inputValue, fromUnit, toUnit, conversionType]);

  const handleInputChange = (text: string) => {
    if (isValidNumber(text)) {
      setInputValue(text);
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const clearInput = () => {
    setInputValue('');
    setResult('');
  };

  const units =
    conversionType === 'length'
      ? ['meters', 'feet']
      : ['celsius', 'fahrenheit'];

  return (
    <View className="px-6">
      <View className="mb-6">
        <Text className="text-gray-700 text-sm font-medium mb-2">From</Text>
        <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <TextInput
            className="text-3xl font-bold text-gray-800 mb-3"
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={handleInputChange}
          />
          <View className="flex-row gap-2">
            {units.map((unit) => (
              <TouchableOpacity
                key={unit}
                onPress={() => setFromUnit(unit)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  fromUnit === unit ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-center font-semibold capitalize ${
                    fromUnit === unit ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View className="items-center mb-6">
        <TouchableOpacity
          onPress={swapUnits}
          className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center shadow-md"
        >
          <Text className="text-white text-xl font-bold">⇅</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 text-sm font-medium mb-2">To</Text>
        <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <Text className="text-3xl font-bold text-blue-600 mb-3">
            {result || '0'}
          </Text>
          <View className="flex-row gap-2">
            {units.map((unit) => (
              <TouchableOpacity
                key={unit}
                onPress={() => setToUnit(unit)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  toUnit === unit ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-center font-semibold capitalize ${
                    toUnit === unit ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {inputValue !== '' && (
        <TouchableOpacity
          onPress={clearInput}
          className="bg-red-500 py-3 px-6 rounded-xl shadow-md"
        >
          <Text className="text-white text-center font-bold text-lg">
            Clear
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ConverterForm;
