import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const PokemonEvolutions = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=500');
            const { results } = response.data;
            setPokemonList(results);
        } catch (error) {
            console.log(error);
        }
    };

    const renderPokemonCard = ({ item }) => {
        const imageUrl = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`;
        return (
            <View style={styles.pokemonCard}>
                <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
                <Text style={styles.pokemonName}>{item.name}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokémon Evolutions</Text>
            <FlatList
                data={pokemonList}
                renderItem={renderPokemonCard}
                keyExtractor={(item) => item.name}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    pokemonCard: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
    },
    pokemonImage: {
        width: 100,
        height: 100,
    },
    pokemonName: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default PokemonEvolutions;
