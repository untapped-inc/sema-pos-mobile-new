import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>OrderList</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
  }
});
