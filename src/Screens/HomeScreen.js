import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RNText from '../Components/RNText';
import { all, allnonVeg, allTiffines, allvegmeals, bonda, drinks, meals, starters, vada } from '../assets/images';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const data = [
    { id: '1', title: 'Tiffin', image: allTiffines },
    { id: '2', title: 'Starters', image: starters },
    { id: '3', title: 'Non Veg Meals', image: allnonVeg },
    { id: '4', title: 'Veg Meals', image: allvegmeals },
    { id: '5', title: 'Drinks', image: drinks },
  ];
  const nav = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={()=>{nav.navigate('Order')}}>
      <Image source={item.image} style={styles.image} />
      <RNText style={styles.title}>{item.title}</RNText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <RNText style={styles.header}>Explore Our Items</RNText>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
});

export default HomeScreen;
