import React, { useSate, useEffect } from 'react';
import { useState } from 'react';
import { Touchable } from 'react-native';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const Pokemons = props => {
    const [pokemons, setPokemons] = useState([]);
    const [searchfeild, setSearchfeild] = useState('');

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
            .then(response => response.json())
            .then(pokemons => setPokemons(pokemons.results));
    };

    return (
        <View>
            <View style={styles.searchCont}>
                <TextInput
                    style={styles.searchfeild}
                    placeholder="Search Pokemons"
                    onChangeText={value => setSearchfeild(value)}
                    value={searchfeild}
                />
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {pokemons
                        .filter(pokemon =>
                            pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
                        )
                        .map((pokemon, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    key={index}
                                    style={styles.card}
                                    onPress={() =>
                                        props.navigation.navigate('Details', {
                                            pokemon: pokemon.name,
                                        })
                                    }>
                                    <Image
                                        style={{ width: 150, height: 150 }}
                                        source={{
                                            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name
                                                }.png`,
                                        }}
                                    />
                                    <Text>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </ScrollView>
        </View>
    );
};

export default Pokemons;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 30,

    },
    card: {
        display: 'flex',
        alignContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
    },
    searchCont: {
        position: 'absolute',
        marginBottom: 70,
        left: '20%',
        zIndex: 1,
        marginTop: 10,
    },
    searchfeild: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        width: 250,
        borderRadius: 50,
    },
});