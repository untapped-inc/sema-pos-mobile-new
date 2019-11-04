import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  IconButton,
  TextInput,
  Text,
} from 'react-native-paper';

import CustomDataTable from '../components/CustomDataTable';
import MainHeader from '../components/headers/MainHeader';
import OrderDetails from '../components/OrderDetails';
import Customers from '../../assets/data/customer_accounts.json';
import SalesChannel from '../../assets/data/sales_channels.json';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: props => <MainHeader headerProps={props} />
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTxt: '',
      tableHeaderLabels: [
        { id: 1, title: 'Account Name' },
        { id: 2, title: 'Telephone#' },
        { id: 3, title: 'Address' },
        { id: 4, title: 'Balance' },
        { id: 5, title: 'Channel' },
      ],
      cellStyle: {
        width: ['28%', '19%', '28%', '10%', '15%']
      },
      tableBodyDatas: [],
      selectedCell: null,
      isDetail: false,
    };
  }

  componentDidMount() {
    const customerData = Customers.map(customer => ({
      name: customer.name,
      phoneNumber: customer.phone_number,
      address: customer.address_line1,
      balance: customer.due_amount,
      channel: SalesChannel.find(sChannel => sChannel.id === customer.sales_channel_id).name,
    }));
    this.setState({
      tableBodyDatas: customerData
    });
  }

  _openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  toggleDetails = (evt, cell) => {
    console.log('cell, evt', cell, evt);
    const { isDetail } = this.state;
    this.setState({ isDetail: !isDetail, selectedCell: cell });
  }

  render() {
    const {
      searchTxt, tableHeaderLabels, tableBodyDatas, cellStyle, isDetail, selectedCell
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <IconButton
            icon="add-circle-outline"
            color="#222"
            size={40}
            style={{ width: 40 }}
            onPress={() => this._openDrawer()}
          />
          <IconButton
            icon="edit"
            color="#222"
            size={40}
            style={{ width: 40 }}
            onPress={() => this._openDrawer()}
          />
          <TextInput
            label="Search by Name or Telephone"
            mode="outlined"
            returnKeyType="done"
            keyboardType="default"
            style={{ width: 250, height: 60 }}
            maxLength={250}
            value={searchTxt}
            onChangeText={(value) => {
              this.setState({ searchTxt: value });
            }}
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
        <CustomDataTable
          header={tableHeaderLabels}
          data={tableBodyDatas}
          cellStyle={cellStyle}
          toggleDetails={this.toggleDetails}
        />
        <OrderDetails isOpen={isDetail} data={selectedCell} toggleDetails={this.toggleDetails} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  toolbar: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
