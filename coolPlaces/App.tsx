import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from './components/Map';
import type { Region } from 'react-native-maps';
import {db, addDoc, serverTimestamp, collection, COOLPLACES, orderBy, getDocs, query, onSnapshot} from './firebase/config';
import { useEffect, useState } from 'react';

import { CoolPlaceType } from './types/coolPlaceType';

export default function App() {
  const initialRegion: Region = {
    latitude: 60.192059,
    longitude: 24.945831,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [places, setPlaces] = useState<CoolPlaceType[]>([]);


  useEffect(() => {

    // You can load existing places from Firestore here if needed
    //ask for permission and get current location
    // Example: await requestLocationPermission();
  
    

    loadPlaces();

  }, []);


  const loadPlaces = async () => {
    const q = query(collection(db, COOLPLACES), orderBy("createdAt", "desc"));

    const unsubscibe = onSnapshot(q, (querySnapshot) => {

    const rows: CoolPlaceType[] = querySnapshot.docs.map(d => {
        const data = d.data() as any;

        const place: CoolPlaceType = {
          region: {
            latitude: data.latitude,
            longitude: data.longitude
          },
          reason: data.reason ?? 'No reason',
          rating: data.rating ?? '0',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt ?? null
        }
        return place
      })
      setPlaces(rows)
    }, (err) => {
        console.error('loadPlaces onSnapshot error:', err)
    });

    return () => unsubscibe()
  }


  //location is the location of the cool place, 
  // reason is why it's cool, 
  // rating is how cool it is from 1-5
  const handleAddPlace = async (location: Region, reason: string, rating: number) => {
    try {
      // Example async work: network call or DB write

      const collectionRef = collection(db, COOLPLACES);
      const docRef = await addDoc(collectionRef, {
        latitude: location.latitude,
        longitude: location.longitude,
        reason: reason,
        rating: rating,
        createdAt: serverTimestamp()
      });
      console.log('Document written with ID: ', docRef.id);

    } catch (err) {
      console.error('handleAddPlace error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map region={initialRegion} onAddPlace={handleAddPlace} coolPlaces={places} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
