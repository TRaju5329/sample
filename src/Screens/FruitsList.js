import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { fruitsAtom, categoriesAtom } from '../store/atoms';


const FruitsList = () => {
  const [fruits, setFruits] = useAtom(fruitsAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [orderedFruits, setOrderedFruits] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [filteredFruits, setFilteredFruits] = useState(fruits);  
  const [selectedCategory, setSelectedCategory] = useState('1');  // '1' represents "All" category by default

  // Function to filter fruits based on the selected category
  const filterFruits = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (categoryId === '1') {
      // 'All' category: Show all fruits
      setFilteredFruits(fruits);
    } else {
      // Filter fruits based on selected category filter
      const filtered = fruits.filter((fruit) => category.filter.includes(fruit.name));
      setFilteredFruits(filtered);
    }
  };

  // Handle category selection from the menu
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    filterFruits(categoryId);
  };

  // Function to add fruit to the order
  const addToOrder = (item) => {
    const existingItem = orderedFruits.find((fruit) => fruit.id === item.id);
    if (existingItem) {
      // Increase quantity and update total price
      const updatedOrder = orderedFruits.map((fruit) =>
        fruit.id === item.id
          ? { ...fruit, quantity: fruit.quantity + 1 }
          : fruit
      );
      setOrderedFruits(updatedOrder);
      setTotalPrice((prev) => prev + item.price);
    } else {
      // Add new item and update total price
      setOrderedFruits((prev) => [...prev, { ...item, quantity: 1 }]);
      setTotalPrice((prev) => prev + item.price);
    }
  };

  // Function to remove fruit from the order
  const removeFromOrder = (item) => {
    const updatedOrder = orderedFruits.filter((fruit) => fruit.id !== item.id);
    setOrderedFruits(updatedOrder);
    setTotalPrice((prev) => prev - item.price * item.quantity); // Subtract total price of the removed item
  };

  // Function to decrease quantity of fruit in the order
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity and update total price
      const updatedOrder = orderedFruits.map((fruit) =>
        fruit.id === item.id
          ? { ...fruit, quantity: fruit.quantity - 1 }
          : fruit
      );
      setOrderedFruits(updatedOrder);
      setTotalPrice((prev) => prev - item.price);
    } else {
      // If quantity is 1, remove the item completely
      removeFromOrder(item);
    }
  };

  // Function to increase quantity of fruit in the order
  const increaseQuantity = (item) => {
    const updatedOrder = orderedFruits.map((fruit) =>
      fruit.id === item.id
        ? { ...fruit, quantity: fruit.quantity + 1 }
        : fruit
    );
    setOrderedFruits(updatedOrder);
    setTotalPrice((prev) => prev + item.price);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => addToOrder(item)}
      style={{
        backgroundColor: 'green',
        height: 150,
        width: 150,
        padding: 10,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>{item.name}</Text>
      <Text style={{ color: '#fff', fontSize: 25 }}>${item.price}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleCategorySelect(item.id)}
      style={{
        padding: 15,
        margin: 5,
        borderRadius: 8,
        backgroundColor: selectedCategory === item.id ? '#ff6584' : 'transparent',
      }}
    >
      <Text style={{ color: selectedCategory === item.id ? '#fff' : '#333', fontSize: 16 }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
      {/* Sidebar */}
      <View style={{ backgroundColor: 'red', flex: 0.1, paddingVertical: 20, paddingHorizontal: 5 }}>
        <View style={{ marginBottom: 40, alignItems: 'center', marginTop: 20 }}>
          <View style={{ width: 50, height: 50, backgroundColor: '#ff6584', borderRadius: 10 }} />
        </View>
        {['Home', 'Dashboard', 'Messages', 'Bills', 'Setting', 'Log Out'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 15,
              marginVertical: 5,
              borderRadius: 8,
              backgroundColor: item === 'Home' ? '#ff6584' : 'transparent',
            }}
          >
            <Text style={{ color: item === 'Home' ? '#fff' : '#333', fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <View style={{ backgroundColor: 'yellow', flex: 0.6, paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={{ backgroundColor: 'blue', flex: 0.3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '600' }}>Menu</Text>
            <Text style={{ fontSize: 28, fontWeight: '400', marginLeft: 5 }}>Category</Text>
          </View>

          {/* Category Filter */}
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>

        <View style={{ backgroundColor: 'pink', flex: 0.7 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>Choose</Text>
            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5 }}>Order</Text>
          </View>
          <FlatList
            data={filteredFruits}  // Use filteredFruits instead of fruits
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
          />
        </View>
      </View>

      {/* Order Menu */}
      <View style={{ backgroundColor: 'green', flex: 0.3, paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={{ backgroundColor: 'pink', flex: 0.1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>Order</Text>
            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5 }}>Menu</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'red', flex: 0.8, padding: 10 }}>
          {orderedFruits.map((fruit) => (
            <View
              key={fruit.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 5,
                backgroundColor: '#fff',
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, flex: 1 }}>{fruit.name}</Text>
              {/* Increase and Decrease Buttons in the middle */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2 }}>
                <TouchableOpacity onPress={() => decreaseQuantity(fruit)} style={{ marginHorizontal: 5 }}>
                  <Text style={{ color: 'blue', fontSize: 18 }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>{fruit.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(fruit)} style={{ marginHorizontal: 5 }}>
                  <Text style={{ color: 'blue', fontSize: 18 }}>+</Text>
                </TouchableOpacity>
              </View>
              {/* Total Price for the item */}
              <Text style={{ fontSize: 18 }}>${fruit.price * fruit.quantity}</Text>

              {/* Remove Button */}
              <TouchableOpacity onPress={() => removeFromOrder(fruit)} style={{ marginLeft: 10 }}>
                <Text style={{ color: 'red', fontSize: 18 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: 'pink', flex: 0.1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ed13c2',
              padding: 20,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Charge ${totalPrice.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FruitsList;
