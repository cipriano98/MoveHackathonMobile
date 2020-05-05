import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {

    const [ personals, setPersonals] = useState([])
    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [ skills, setSkillss ] = useState(null);
 
    async function loadPersonals() {
        const { latitude, longitude } = currentRegion;
        
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                skills
            }

        });
        console.log(response.data.personals);
        setPersonals(response.data.personals);
    }

    useEffect(()=> {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted){

                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;
                
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                })
            }
        }

        loadInitialPosition();
    }, []);

    function handleRegionChanged(region) {
        // console.log(region)
        setCurrentRegion(region)
    }

    if (!currentRegion) {
        return null;
    }
    
    return (
        <>
        <MapView
            onRegionChangeComplete={ handleRegionChanged }
            initialRegion={ currentRegion }
            style={ styles.map }
        >
            { personals.map(personal => (
                <Marker
                    key={ personal._id }
                    coordinate={{
                        longitude: personal.location.coordinates[0],
                        latitude: personal.location.coordinates[1],
                    }}>
                    <Image
                        style={ styles.avatar }
                        source={{ uri: personal.avatar_url }}
                    />
                    <Callout onPress={() =>{
                        
                    }}>
                        <View style={ styles.callout }>
                            <Text style={ styles.personalName }>{ personal.name }</Text>
                            <Text style={ styles.personalCref }>{ personal.cref }</Text>
                            <Text style={ styles.personalSkills }>{ personal.skills.join(', ') }</Text>
                            <Text style={ styles.personalBio }>{ personal.bio }</Text>
                            <Text style={ styles.personalWhatsapp }>{ personal.whatsapp }</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>
        <View style={ styles.searchForm} >
            <TextInput 
                style={ styles.searchInput}
                placeholder={ 'Buscar profissionais por skills...' }
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={ false }
                value={ skills }
                onChangeText={ setSkillss }
            />
        <TouchableOpacity onPress={ loadPersonals } style={ styles.loadBotton } >
                <MaterialIcons name='my-location' size={ 20 } color='#fff' />
        </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },

    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#f9f9f9'
    },

    callout: {
        width: 260,
        borderRadius: 15,
    },

    personalName: {
        fontWeight: "bold",
        fontSize: 16,
    },

    personalBio: {
        color: '#666',
        marginTop: 5,
    },

    personalSkills: {
        marginTop: 5,
    },

    personalCreaf: {
        marginTop: 5,
    },
    
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadBotton: {
        width: 50,
        height: 50,
        backgroundColor: '#FF6B00',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },

    });

export default Main;