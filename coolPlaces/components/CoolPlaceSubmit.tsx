import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import type { Region } from 'react-native-maps';

type Props = {
    region: Region;
    onAddPlace: (reason: string, rating: number) => Promise<void> | void;
    cancelAddPlace?: () => void;
}   

export default function CoolPlaceSubmit({ onAddPlace, cancelAddPlace }: Props) {

    const [reason, setReason] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

  return (
    <View style={style.container}>
        
        <Text style={style.title}>CoolPlaceSubmit Component</Text>

        <TextInput
            style={style.reasonInput}
            placeholder="Enter reason"
            value={reason}
            onChangeText={setReason}
        />
        <TextInput
            style={style.ratingInput}
            placeholder="Enter rating"
            value={rating.toString()}
            onChangeText={(text) => setRating(parseInt(text) || 0)}
        />

        <View style={style.submitButton}>
            <Button title="Submit" onPress={() => onAddPlace(reason, rating)} />
        </View>
        <View style={style.submitButton}>
            <Button title="Cancel" onPress={cancelAddPlace ? () => cancelAddPlace : undefined} />
        </View>
    </View>
  )
}


const style = StyleSheet.create({
    container: {
        position: 'absolute',
        marginTop: -100,
        padding : 40,
        top: '50%',
        left: '20%',
        width: '60%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'white',
    },
    title:{
        fontSize: 16,
        marginBottom: 20,

    },
    reasonInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
    },
    ratingInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
    },
    submitButton: {
        padding: 10,
        borderRadius: 5,
    },
})