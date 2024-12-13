import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const HomeContainer = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5', flex:1 }}>
      {/* Sidebar */}
      <View style={{ width: '15%', backgroundColor: '#fff', padding: 20, alignItems: 'center' }}>
        <View style={{ marginBottom: 40 }}>
          <View style={{ width: 50, height: 50, backgroundColor: '#ff6584', borderRadius: 10 }} />
        </View>
        {['Home', 'Dashboard', 'Messages', 'Bills', 'Setting', 'Log Out'].map((item, index) => (
          <TouchableOpacity key={index} style={{ padding: 15, marginVertical: 5, borderRadius: 8, backgroundColor: item === 'Home' ? '#ff6584' : 'transparent' }}>
            <Text style={{ color: item === 'Home' ? '#fff' : '#333', fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, padding: 20 }}>
        {/* Top Section */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Menu</Text>
          <TextInput style={{ backgroundColor: '#eaeaea', padding: 10, borderRadius: 8, width: '40%' }} placeholder="Search for food, coffee, etc" />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
          {['Hot', 'Burger', 'Pizza', 'Snack', 'Soft Drink', 'Coffee', 'Ice Cream'].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{ padding: 10, marginHorizontal: 5, borderRadius: 8, backgroundColor: category === 'Coffee' ? '#ffcd3c' : '#eaeaea' }}>
              <Text style={{ fontSize: 14, color: category === 'Coffee' ? '#fff' : '#000' }}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Items */}
        <ScrollView>
          <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[
              { name: 'Coffee Latte', price: '$1.20', isNew: true },
              { name: 'Hazelnut Latte', price: '$1.20' },
              { name: 'Vanilla Latte', price: '$1.20' },
              { name: 'Caramel Latte', price: '$1.20' },
              { name: 'Hot Cappuccino', price: '$1.00', isNew: true },
              { name: 'Hot Chocolate', price: '$1.00' },
            ].map((item, index) => (
              <View key={index} style={{ width: '30%', backgroundColor: '#fff', marginBottom: 20, borderRadius: 8, padding: 10, position: 'relative' }}>
                <View style={{ height: 80, backgroundColor: '#eaeaea', borderRadius: 8 }} />
                {item.isNew && <Text style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#ff6584', color: '#fff', padding: 5, fontSize: 12, borderRadius: 8 }}>New</Text>}
                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: '#888', marginTop: 5 }}>{item.price}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Order Summary */}
      <View style={{ width: '25%', backgroundColor: '#fff', padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Order Menu</Text>
        <ScrollView>
          {[
            { name: 'Cheese Burger', quantity: 2, price: '$8.80' },
            { name: 'Double Cheese', quantity: 1, price: '$4.99' },
            { name: 'Coffee Latte', quantity: 3, price: '$3.60' },
          ].map((order, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 16 }}>{order.name} x{order.quantity}</Text>
              <Text style={{ fontSize: 16 }}>{order.price}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sub Total</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>$17.39</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>PB (5%)</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>$0.86</Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#ff6584', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Charge $18.25</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeContainer;
