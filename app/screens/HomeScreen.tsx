import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ConversionType } from '../types/conversion.types';
import ConverterForm from '../components/ConverterForm';

const HomeScreen: React.FC = () => {
  const [conversionType, setConversionType] =
    useState<ConversionType>('length');

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-blue-500 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <Text className="text-white text-3xl font-bold mb-2">
          Unit Converter
        </Text>
        <Text className="text-blue-100 text-base">
          Convert length and temperature units easily
        </Text>
      </View>

      <View className="px-6 mt-6 mb-8">
        <View className="flex-row bg-white rounded-xl shadow-sm p-1 border border-gray-200">
          <TouchableOpacity
            onPress={() => setConversionType('length')}
            className={`flex-1 py-3 rounded-lg ${
              conversionType === 'length' ? 'bg-blue-500' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-center font-bold text-base ${
                conversionType === 'length' ? 'text-white' : 'text-gray-700'
              }`}
            >
              📏 Length
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setConversionType('temperature')}
            className={`flex-1 py-3 rounded-lg ${
              conversionType === 'temperature'
                ? 'bg-blue-500'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-center font-bold text-base ${
                conversionType === 'temperature'
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              🌡️ Temperature
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ConverterForm conversionType={conversionType} />

      <View className="px-6 mt-8 mb-8">
        <View className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <Text className="text-blue-800 font-semibold mb-2">
            ℹ️ Quick Info
          </Text>
          {conversionType === 'length' ? (
            <View>
              <Text className="text-blue-700 text-sm">
                • 1 meter = 3.28084 feet
              </Text>
              <Text className="text-blue-700 text-sm">
                • 1 foot = 0.3048 meters
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-blue-700 text-sm">
                • Formula: °F = (°C × 9/5) + 32
              </Text>
              <Text className="text-blue-700 text-sm">
                • Formula: °C = (°F - 32) × 5/9
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
