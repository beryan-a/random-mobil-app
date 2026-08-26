import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export default function Weather() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // OpenWeatherMap kodlarını Ionicons ikon isimleriyle eşleme
  const allIcons = {
    "01d": "sunny",
    "01n": "moon",
    "02d": "partly-sunny",
    "02n": "cloudy-night",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rainy",
    "10n": "rainy",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13n": "snow",
    "50d": "water",
    "50n": "water",
  };

  const getWeatherData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Hata", data.message || "Hava durumu bilgisi bulunamadı.");
        return;
      }

      const iconName = allIcons[data.weather[0].icon] || "sunny";

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: iconName,
      });
    } catch (error) {
      setWeatherData(null);
      Alert.alert("Hata", "Bağlantı hatası oluştu.");
      console.error("Hava durumu çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    if (!city || city.trim() === "") {
      Alert.alert("Hata", "Lütfen bir şehir adı girin!");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`;
    await getWeatherData(url);
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    await getWeatherData(url);
  };

  useEffect(() => {
    const initializeLocationAndWeather = async () => {
      try {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          await fetchWeatherByCity("Istanbul");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = currentLocation.coords;
        await fetchWeatherByCoords(latitude, longitude);
      } catch (error) {
        console.warn("Konum alınamadı, varsayılan şehre geçiliyor:", error);
        await fetchWeatherByCity("Istanbul");
      }
    };

    initializeLocationAndWeather();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.mainContainer}>
      <View style={styles.weatherCard}>
        
        {/* Arama Çubuğu */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Şehir Ara..."
            placeholderTextColor="#888"
            value={cityInput}
            onChangeText={setCityInput}
            onSubmitEditing={() => fetchWeatherByCity(cityInput)}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => fetchWeatherByCity(cityInput)}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Yükleniyor Durumu */}
        {loading && (
          <ActivityIndicator size="large" color="#ffffff" style={{ marginVertical: 40 }} />
        )}

        {/* Hava Durumu Bilgileri */}
        {!loading && weatherData && (
          <View style={styles.infoWrapper}>
            <Ionicons name={weatherData.icon} size={120} color="#fff" style={styles.weatherIcon} />
            <Text style={styles.temperature}>{weatherData.temperature}°c</Text>
            <Text style={styles.location}>{weatherData.location}</Text>

            {/* Alt Detaylar (Nem & Rüzgar) */}
            <View style={styles.weatherData}>
              {/* Nem */}
              <View style={styles.col}>
                <Ionicons name="water-outline" size={28} color="#fff" />
                <View>
                  <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
                  <Text style={styles.detailLabel}>Humidity</Text>
                </View>
              </View>

              {/* Rüzgar */}
              <View style={styles.col}>
                <Ionicons name="speedometer-outline" size={28} color="#fff" />
                <View>
                  <Text style={styles.detailValue}>{weatherData.windSpeed} Km/h</Text>
                  <Text style={styles.detailLabel}>Wind Speed</Text>
                </View>
              </View>
            </View>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  weatherCard: {
    width: '100%',
    maxWidth: 380,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#3b3dbf',
    alignItems: 'center',
    elevation: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#ebfffc',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#333333',
    fontSize: 16,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#ebfffc',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  weatherIcon: {
    marginVertical: 15,
  },
  temperature: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: 'bold',
  },
  location: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 10,
  },
  weatherData: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailLabel: {
    color: '#e0e0e0',
    fontSize: 13,
  },
});