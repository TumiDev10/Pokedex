import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

const Details = ({ navigation }) => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchPokemonDetails();
    }, []);

    const fetchPokemonDetails = () => {
        const { state } = navigation;
        fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
            .then(res => res.json())
            .then(details => setDetails(details));
    };

    const navigateToEvolutions = () => {
        navigation.navigate('Evolutions', { pokemon: details.name });
    };

    return details.name ? (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
                style={styles.image}
                source={{
                    uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
                }}
            />
            <Text style={styles.text}>Name: {details.name}</Text>
            <Text style={styles.text}>Height: {details.height}</Text>
            <Text style={styles.text}>Weight: {details.weight}</Text>
            <Text style={styles.text}>Ability: {details.abilities[0].ability.name}</Text>
            <Text style={styles.text}>Type: {details.types[0].type.name}</Text>
            <TouchableOpacity style={styles.button} onPress={navigateToEvolutions}>
                <Text style={styles.buttonText}>Evolutions</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#E63F34" />
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 22,
        marginBottom: 15,
        textTransform: 'capitalize',
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#E63F34',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
