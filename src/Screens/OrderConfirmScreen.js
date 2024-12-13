import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RNText from '../Components/RNText';
import { bonda, drinks, meals, vada } from '../assets/images';
import { useNavigation } from '@react-navigation/native';
import RNButton from '../Components/RNButton';

const OrderConfirmScreen = () => {
  const data = [
    { id: '1', title: 'Tiffin', image: vada, price: 40 },
    { id: '2', title: 'Meals', image: meals, price: 100 },
    { id: '3', title: 'Veg Meals', image: meals, price: 150 },
    { id: '4', title: 'Drinks', image: drinks, price: 20 },
    { id: '5', title: 'Snacks', image: bonda , price: 20},
    // { id: '6', title: 'Snacks', image: bonda , price: 20},
    // { id: '7', title: 'Snacks', image: bonda , price: 20},
    // { id: '8', title: 'Snacks', image: bonda , price: 20},
    // { id: '9', title: 'Snacks', image: bonda , price: 20},
    // { id: '10', title: 'Snacks', image: bonda , price: 20},
    // { id: '11', title: 'Snacks', image: bonda , price: 20},
    // { id: '12', title: 'Snacks', image: bonda , price: 20},
  ];
  const nav = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <RNText style={styles.title}>{item.title}</RNText>
      <RNText style={styles.title}>{item.price}</RNText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Order Items</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <RNText style={styles.title}>{item.title}</RNText>
              <RNText style={styles.title}>{item.price}</RNText>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{padding:5}}>
        <RNButton title="PAY-330" btnStyle={{backgroundColor: '#2E7D32'}} onPress={()=>{nav.navigate("Thanks")}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    flex: 1,
    flexDirection:"row",
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent:"space-between"
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
});

export default OrderConfirmScreen;
