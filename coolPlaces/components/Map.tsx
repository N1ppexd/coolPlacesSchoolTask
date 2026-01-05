import { View, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Region, Marker } from 'react-native-maps'
import CoolPlaceSubmit from './CoolPlaceSubmit'

type Props = {
    region: Region;
    onAddPlace?: (location: Region, reason: string, rating: number) => Promise<void> | void;

    coolPlaces?: Array<{
        region: {
            latitude: number;
            longitude: number;
        };
        reason: string;
        rating: number;
        createdAt?: Date | null;
    }>;
}

export default function Map({ region, onAddPlace, coolPlaces }: Props) {

    const [selectedLocation, setSelectedLocation] = useState<Region>(region);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        setSelectedLocation(region);
    }, [region, coolPlaces]);

    const handleAddPress = async (reason: string, rating: number) => {
        setIsSubmitting(false);
        if (!onAddPlace) return;
        try {
            await onAddPlace(selectedLocation, reason, rating);
        } catch (err) {
            console.error('onAddPlace error:', err);
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <MapView region={selectedLocation} style={styles.map}
                onPress={(e) => setSelectedLocation(
                    {
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitudeDelta: selectedLocation.latitudeDelta,
                        longitudeDelta: selectedLocation.longitudeDelta
                    }
                )}>
                <Marker coordinate={{ latitude: selectedLocation?.latitude, longitude: selectedLocation?.longitude }} />
                {
                    coolPlaces?.map((place, index) => (
                        <Marker 
                            key={index}
                            coordinate={{ latitude: place.region.latitude, longitude: place.region.longitude }}
                            title={place.reason}
                            description={`Rating: ${place.rating}`}
                            pinColor='green'
                        />
                    ))
                }
            </MapView>

            {isSubmitting && onAddPlace &&
                <CoolPlaceSubmit
                    region={selectedLocation}
                    onAddPlace={handleAddPress}
                    cancelAddPlace={() => setIsSubmitting(false)}
                />
            }

            <View style={styles.addButton}>
                <Button title="Add Place" onPress={() => setIsSubmitting(true)} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        padding: 10,
        borderRadius: 5,
    }
})