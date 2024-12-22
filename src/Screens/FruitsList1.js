import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { useAtom } from "jotai";
import { fruitsAtom, totalQuantityAtom, totalPriceAtom } from "../store/atoms";
import QRCode from 'react-native-qrcode-svg'; // For QR code generation

const FruitsList1 = () => {
  const [fruits, setFruits] = useAtom(fruitsAtom);
  const [totalQuantity] = useAtom(totalQuantityAtom);
  const [totalPrice] = useAtom(totalPriceAtom);

  const [amount, setAmount] = useState(0);
  const [qrVisible, setQrVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Timer for modal auto-close
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Increase quantity
  const increaseQuantity = (id) => {
    setFruits((prev) =>
      prev.map((fruit) =>
        fruit.id === id ? { ...fruit, quantity: fruit.quantity + 1 } : fruit
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setFruits((prev) =>
      prev.map((fruit) =>
        fruit.id === id && fruit.quantity > 0
          ? { ...fruit, quantity: fruit.quantity - 1 }
          : fruit
      )
    );
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
    setQrVisible(true);
    
    // Open the modal when clicking Place Order
    setModalVisible(true);

    // Start a timer to close the modal after 30 seconds
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);  // Clear the interval once time runs out
          setModalVisible(false); // Close the modal after 30 seconds
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Render a single fruit item
  const renderItem = ({ item }) => (
    <View style={styles.fruitItem}>
      <Text style={styles.fruitName}>{item.name}</Text>
      <Text style={styles.fruitPrice}>${item.price}</Text>
      
      {/* Display "Add" button when quantity is 0 */}
      {item.quantity === 0 ? (
        <TouchableOpacity
          onPress={() => increaseQuantity(item.id)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityControls}>
          {/* Show "Decrease" and "Increase" buttons */}
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.id)}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.id)}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Items: {totalQuantity}</Text>
        <Text style={styles.summaryText}>Total Price: ${totalPrice}</Text>
      </View>
<View style={styles.Buttoncontainer}>

      <TouchableOpacity style={styles.placeOrderButton} onPress={() => handlePayment(totalPrice)}>
        <Text style={styles.placeOrderText}>View cart</Text>
        <Text style={styles.summaryText}>{totalQuantity} Items</Text>
      </TouchableOpacity>
</View>

      {/* Simple Modal for showing amount and timer */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Amount: ₹{totalPrice}</Text>
            <Text style={styles.modalText}>Closing in: {timeLeft}s</Text>
            
            {/* Display the QR Code with the total amount */}
            <QRCode
              value={generateUPILink(totalPrice)} 
              size={200}
            />
            <Text style={styles.qrText}>Scan to Pay</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  fruitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 1,
  },
  fruitName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fruitPrice: {
    fontSize: 16,
    color: "gray",
  },
  addButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  controlText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
    width: 30,
    textAlign: "center",
  },
  summary: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  },
  Buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
    justifyContent:"center"
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  qrText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});

export default FruitsList1;