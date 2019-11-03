import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomDataTable from '../CustomDataTable';

export default class CartSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productCount: 0,
      price: 0.00,
      tableHeaderLabels: [
        { id: 1, title: 'Item' },
        { id: 2, title: 'Quantity Change ' },
      ],
      cellStyle: {
        width: ['70%', '30%']
      },
      tableBodyDatas: [],
    };
  }

  render() {
    const {
      productCount, price, tableHeaderLabels, tableBodyDatas, cellStyle
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subjectSection}>
          <Text>Order Summary</Text>
          <Text>
            Cart (
            { productCount }
            )
          </Text>
        </View>
        <View style={styles.priceSection}>
          <Text>Order Total</Text>
          <Text>{price}</Text>
        </View>
        <CustomDataTable
          header={tableHeaderLabels}
          data={tableBodyDatas}
          cellStyle={cellStyle}
        />
        <TouchableOpacity style={{
          width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'
        }}
        >
          <Text style={{ color: '#608ac6', fontSize: 20, fontWeight: '600' }}>Pay</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    backgroundColor: '#1658ad',
    padding: 5,
  },
  subjectSection: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black'
  },
  priceSection: {
    width: '100%',
    height: 70,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  }
});
