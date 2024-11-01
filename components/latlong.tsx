import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
}

const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      const hasPermission = await Geolocation.requestAuthorization('whenInUse');
      if (hasPermission === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Erro ao obter localização:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    requestLocationPermission();
  }, []);

  return location;
};

export default useLocation;