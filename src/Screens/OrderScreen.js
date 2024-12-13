import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { all, allnonVeg, allTiffines, allvegmeals, biriyani, bonda, drinks, meals, starters, vada } from '../assets/images';
import RNButton from '../Components/RNButton';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', title: 'All', image: all },
  { id: '2', title: 'Tiffin', image: allTiffines, filter: ['Vada', 'Bonda'] },
  { id: '3', title: 'Starters', image: starters, filter: ['Prawns Fry'] },
  { id: '4', title: 'Non Veg Meals', image: allnonVeg, filter: ['Chicken Biryani', 'Mutton Biryani'] },
  { id: '5', title: 'Veg Meals', image: allvegmeals, filter: ['Veg Biryani', 'Normal Rice'] },
  { id: '6', title: 'Drinks', image: drinks, filter: ['Drinks'] },
];

const items = [
  { id: '1', title: 'Vada', weight: '250 g', price: 50, oldPrice: 60, image: vada },
  { id: '2', title: 'Bonda', weight: '250 g', price: 45, oldPrice: 50, image: bonda },
  { id: '3', title: 'Chicken Biryani', weight: '250 g - 280 g', price: 260, oldPrice: 300, image: biriyani },
  { id: '4', title: 'Mutton Biryani', weight: '200 g', price: 300, oldPrice: 320, image: allnonVeg },
  { id: '5', title: 'Veg Biryani', weight: '250 g', price: 200, oldPrice: 240, image: meals },
  { id: '6', title: 'Normal Rice', weight: '250 g', price: 150, oldPrice: 220, image: allvegmeals },
  { id: '7', title: 'Drinks', weight: '250 g', price: 18, oldPrice: 21, image: drinks },
  { id: '8', title: 'Prawns Fry', weight: '200 g', price: 150, oldPrice: 200, image: starters },
];

const OrderScreen = () => {
  const nav = useNavigation();
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState('1');
  const [quantities, setQuantities] = useState({}); // Track quantities
  const [prices, setPrices] = useState({}); // Track total prices

  const handleCategoryPress = (category) => {
    setActiveCategory(category.id);
    if (category.filter) {
      setFilteredItems(items.filter((item) => category.filter.includes(item.title)));
    } else {
      setFilteredItems(items);
    }
  };

  const handleAdd = (item) => {
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
    setPrices((prev) => ({
      ...prev,
      [item.id]: { totalPrice: item.price, totalOldPrice: item.oldPrice },
    }));
  };

  const handleIncrease = (item) => {
    setQuantities((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    setPrices((prev) => ({
      ...prev,
      [item.id]: {
        totalPrice: ((prev[item.id]?.totalPrice || 0) + item.price),
        totalOldPrice: ((prev[item.id]?.totalOldPrice || 0) + item.oldPrice),
      },
    }));
  };

  const handleDecrease = (item) => {
    setQuantities((prev) => {
      if (prev[item.id] > 1) {
        return { ...prev, [item.id]: prev[item.id] - 1 };
      }
      const updated = { ...prev };
      delete updated[item.id];
      return updated;
    });

    setPrices((prev) => {
      if (prev[item.id]?.totalPrice > item.price) {
        return {
          ...prev,
          [item.id]: {
            totalPrice: prev[item.id].totalPrice - item.price,
            totalOldPrice: prev[item.id].totalOldPrice - item.oldPrice,
          },
        };
      }
      const updated = { ...prev };
      delete updated[item.id];
      return updated;
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        activeCategory === item.id && styles.activeCategoryCard,
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.id && styles.activeCategoryText,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const quantity = quantities[item.id] || 0;
    const price = prices[item.id]?.totalPrice || item.price;
    const oldPrice = prices[item.id]?.totalOldPrice || item.oldPrice;

    return (
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>₹{price}</Text>
          <Text style={styles.oldPrice}>₹{oldPrice}</Text>
        </View>
        {quantity > 0 ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleDecrease(item)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleIncrease(item)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAdd(item)}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.productContainer}>
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productListContainer}
          />
        </View>
      </View>
      <View style={{ padding: 5 }}>
        <RNButton
          title="Order"
          btnStyle={{ backgroundColor: '#2E7D32' }}
          onPress={() => nav.navigate('OrderConfirm')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryContainer: {
    flex: 0.2,
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
  activeCategoryCard: {
    backgroundColor: '#C8E6C9',
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
  activeCategoryText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  productContainer: {
    flex: 0.8,
    padding: 10,
  },
  productListContainer: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#444',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 5,
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  addButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 5,
    padding: 10,
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default OrderScreen;
