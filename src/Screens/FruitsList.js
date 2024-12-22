import { View, Text, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { fruitsAtom, categoriesAtom } from '../store/atoms';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg'; // For QR code generation
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




const FruitsList = () => {

  const [fruits, setFruits] = useAtom(fruitsAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [orderedFruits, setOrderedFruits] = useState([]); // Tracks the items in the order
  const [totalPrice, setTotalPrice] = useState(0); // Tracks the total price of the order
  const [filteredFruits, setFilteredFruits] = useState(fruits);
  const [selectedCategory, setSelectedCategory] = useState('1'); // '1' represents "All" category by default
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [qrVisible, setQrVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Timer for modal auto-close
  const [timerReference, setTimerReference] = useState(null); // To keep track of the timer reference
  const [paymentCompleted, setPaymentCompleted] = useState(false); // New state to track payment status


const nav =useNavigation();

  const saveOrderLocally = async (order) => {
    try {
      // Get existing orders
      const existingOrders = await AsyncStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];

      // Add the new order
      orders.push(order);

      // Save back to AsyncStorage
      await AsyncStorage.setItem('orders', JSON.stringify(orders));
      console.log("Order saved locally:", orders);
    } catch (error) {
      console.error("Error saving order locally:", error);
    }
  };



  const toggleModal = () => {
    if (isModalVisible) {
      // Close the modal
      setModalVisible(false);
      clearInterval(timerReference); // Clear any existing timer
      setTimerReference(null); // Reset the timer reference
      setPaymentCompleted(false); // Reset payment status when modal is closed
    } else {
      // Open the modal and reset the timer
      setTimeLeft(30); // Reset timeLeft to 30 seconds
      setModalVisible(true);
      startTimer(); // Start the timer
    }
  };

  // Function to start the timer
  const startTimer = () => {
    clearInterval(timerReference); // Clear any existing timer to avoid duplicates
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimerReference(null); // Reset the timer reference
          setModalVisible(false); // Close the modal when time is up
          clearOrder(); // Clear the order menu
          return 30; // Reset timer value for the next use
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerReference(timer); // Save the timer reference
  };

  const clearOrder = () => {
    setOrderedFruits([]); // Clear the ordered fruits
    setTotalPrice(0); // Reset the total price
  };

  const generateUPILink = (totalPrice) => {
    const payeeVPA = 'traju5329@ybl';
    const payeeName = 'Raju';
    const transactionNote = 'Payment for Services';
    const currency = 'INR';

    return `upi://pay?pa=${payeeVPA}&pn=${payeeName}&am=${totalPrice}&cu=${currency}&tn=${transactionNote}`;
  };

  const handlePayment = (price) => {
    setAmount(price);
    setQrVisible(price > 0); // Show QR code only if total price is greater than 0
    toggleModal(); // Open the modal
  };

  // Simulate QR code scan and payment
  const completePayment1 = () => {
    setQrVisible(false); // Hide QR code
    setPaymentCompleted(true); // Mark payment as completed
    clearInterval(timerReference); // Stop the timer
    console.log("Order Menu:", orderedFruits);
  };

  const completePayment = () => {
    if (orderedFruits.length === 0) {
      console.warn("Order menu is empty. No items to complete payment for.");
      Alert.alert("No Items", "Your order menu is empty.");
      return;
    }


    const order = {
      items: orderedFruits,
      totalPrice: totalPrice,
      dateTime: new Date().toISOString(),
    };

    // Save order locally
    saveOrderLocally(order);
    console.log("Order Menu:", orderedFruits);
    Alert.alert("Payment Completed", "Your payment is successful. Order is being prepared.");

    // Clear the order menu after payment
    setOrderedFruits([]);
    setTotalPrice(0);
    setModalVisible(false);
  };

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
      style={{ backgroundColor: 'green', height: 150, width: 150, padding: 10, margin: 20, alignItems: 'center', justifyContent: 'center', }} >
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
            style={{ padding: 15, marginVertical: 5, borderRadius: 8, backgroundColor: item === 'Home' ? '#ff6584' : 'transparent', }} >
            <Text style={{ color: item === 'Home' ? '#fff' : '#333', fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => nav.navigate("Reports")}
          style={{ padding: 15, backgroundColor: "blue", margin: 10, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff" }}>View Reports</Text>
        </TouchableOpacity>
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
            <View key={fruit.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 5, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center', }} >
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
            onPress={() => handlePayment(totalPrice)}
            style={{ backgroundColor: '#ed13c2', padding: 20, borderRadius: 8, alignItems: 'center', marginTop: 20, }} >
            <Text style={{ color: '#fff', fontSize: 16 }}>Charge ${totalPrice.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      </View>



      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {paymentCompleted ? (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Order Preparing...</Text>
              <Text style={{ fontSize: 18, marginBottom: 15 }}>Your payment of ₹{totalPrice.toFixed(2)} is successful.</Text>
            </>
          ) : qrVisible ? (
            <>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Amount: ₹{totalPrice}</Text>
              <Text style={{ fontSize: 18, marginBottom: 15 }}>Scan QR Code</Text>
              <QRCode value={generateUPILink(totalPrice)} size={200} />
              <Text style={{ fontSize: 18, marginTop: 10, color: 'red' }}>Closing in: {timeLeft}s</Text>
              <TouchableOpacity
                onPress={completePayment}
                style={{
                  backgroundColor: '#28a745',
                  padding: 10,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Simulate Payment</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{ fontSize: 18, marginBottom: 15 }}>Please select an item</Text>
          )}
          <Button title="Close Modal" onPress={toggleModal} />
        </View>
      </Modal>


    </View>
  );
};
export default FruitsList;
