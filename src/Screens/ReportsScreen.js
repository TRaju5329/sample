import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ReportsScreen = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadOrders = async () => {
            const data = await fetchOrdersLocally();
            setOrders(data);
        };
        loadOrders();
    }, []);

    

    const fetchOrdersLocally = async () => {
        try {
            const orders = await AsyncStorage.getItem('orders');
            return orders ? JSON.parse(orders) : [];
        } catch (error) {
            console.error("Error fetching orders locally:", error);
            return [];
        }
    };

    const clearOrdersLocally = async () => {
        try {
            await AsyncStorage.removeItem('orders');
            Alert.alert("Orders Cleared", "All orders have been cleared.");
            setOrders([]);
        } catch (error) {
            console.error("Error clearing orders:", error);
        }
    };

    const renderOrder = ({ item, index }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.index]}>#{index + 1}</Text>
            <Text style={styles.cell}>{new Date(item.dateTime).toLocaleString()}</Text>
            <Text style={styles.cell}>₹{item.totalPrice.toFixed(2)}</Text>
            <View style={styles.cell}>
                {item.items.map((fruit, idx) => (
                    <Text key={idx}>- {fruit.name} x {fruit.quantity}</Text>
                ))}
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.title}>Order Reports</Text>

            {/* Clear Orders Button */}
            <View style={{ marginBottom: 10 }}>
                <Button title="Clear All Orders" onPress={clearOrdersLocally} color="red" />
            </View>

            {/* Table Headers */}
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.index]}>#</Text>
                <Text style={styles.cell}>Date</Text>
                <Text style={styles.cell}>Total</Text>
                <Text style={styles.cell}>Items</Text>
            </View>

            {/* Orders List */}
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderOrder}
                />
            ) : (
                <Text style={styles.emptyText}>No orders to display.</Text>
            )}

            {/* Bottom Button */}
            <TouchableOpacity
                style={styles.bottomButton}
                onPress={() => navigation.navigate('Fruitslist')} // Replace with your OrderScreen route name
            >
                <Text style={styles.bottomButtonText}>Go to Order</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReportsScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        paddingHorizontal: 5,
    },
    index: {
        flex: 0.5,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 25,
    },
    bottomButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
