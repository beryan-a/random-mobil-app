import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProtectedRoute({ children }) {
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPlayer = async () => {
      try {
        const storedPlayer = await AsyncStorage.getItem('player');
        setPlayer(storedPlayer);
      } catch (error) {
        console.error('Kullanıcı okunamadı:', error);
        setPlayer(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkPlayer();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!player) {
    // Giriş yapılmamışsa ana ekrana veya login sayfasına yönlendirir
    return <Redirect href="/(auth)/login" />;
  }

  return children;
}