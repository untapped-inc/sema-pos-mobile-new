import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Dimensions,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import ProductList from './ProductList';
import CartSection from './CartSection';

const { width } = Dimensions.get('window');

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCustomer: null,
    };
    this.posValue = new Animated.Value(-width);
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, data } = nextProps;
    this.setState({ selectedCustomer: data });
    if (isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  open = () => {
    Animated.timing(this.posValue, {
      toValue: 0,
      duration: 1000,
    }).start();
  }

  close = () => {
    Animated.timing(this.posValue, {
      toValue: -width,
      duration: 1000,
    }).start();
  }

  render() {
    const { toggleDetails } = this.props;
    const { selectedCustomer } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          { left: this.posValue }
        ]}
      >
        <View style={styles.toolbar}>
          <IconButton
            icon="forward"
            color="#222"
            size={40}
            style={{ width: 40, transform: [{ rotate: '180deg' }] }}
            onPress={evt => toggleDetails(evt, selectedCustomer)}
          />
          <View style={styles.accountInfoView}>
            <Text>
              Account Name
              {' '}
            </Text>
            <Text>
              Telephone #
              {' '}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <ProductList />
          <CartSection />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width,
    position: 'absolute',
    top: 0,
    backgroundColor: 'white'
  },
  toolbar: {
    width: '100%',
    height: 70,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  accountInfoView: {
    backgroundColor: '#a6c1e1',
    width: 250,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  }
});
