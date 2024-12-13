import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const ExportData = () => {
  const [services, setServices] = useState([
    { id: '1', name: 'Service A', price: 100 },
    { id: '2', name: 'Service B', price: 150 },
    { id: '3', name: 'Service C', price: 200 },
    { id: '4', name: 'Raju D', price: 300 },
  ]);

  const exportToCSV = async () => {
    try {
      const header = 'Service Name,Service Price\n';
      const rows = services.map(service => `${service.name},${service.price}`).join('\n');
      const csvContent = header + rows;

      const filePath = `${RNFS.DocumentDirectoryPath}/services.csv`;

      await RNFS.writeFile(filePath, csvContent, 'utf8');
      console.log('CSV file created at:', filePath);

      await Share.open({
        url: `file://${filePath}`,
        type: 'text/csv',
        filename: 'services',
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services List</Text>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Export to CSV" onPress={exportToCSV} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ExportData;
