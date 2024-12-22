import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // For QR code generation

const QRPayment = () => {
  const [amount, setAmount] = useState(0);
  const [qrVisible, setQrVisible] = useState(false);

  const generateUPILink = (amount) => {
    const payeeVPA = 'traju5329@ybl'; 
    const payeeName = 'Raju'; 
    const transactionNote = 'Payment for Services';
    const currency = 'INR';
    
    return `upi://pay?pa=${payeeVPA}&pn=${payeeName}&am=${amount}&cu=${currency}&tn=${transactionNote}`;
  };

  const handlePayment = (price) => {
    setAmount(price);
    setQrVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Payment</Text>
      
      <View style={styles.itemContainer}>
        <Text style={styles.item}>Service A - $1</Text>
        <Button title="Pay" onPress={() => handlePayment(1)} />
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.item}>Service B - $2</Text>
        <Button title="Pay" onPress={() => handlePayment(2)} />
      </View>

      {qrVisible && (
        <View style={styles.qrContainer}>
          <QRCode
            value={generateUPILink(amount)} 
            size={200}
          />
          <Text style={styles.qrText}>Scan this QR Code to Pay</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginVertical: 10,
  },
  item: {
    fontSize: 18,
  },
  qrContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  qrText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default QRPayment;