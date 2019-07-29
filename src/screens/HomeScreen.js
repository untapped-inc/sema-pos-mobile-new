import React from 'react';
import {
  StyleSheet, Text, View, TouchableHighlight
} from 'react-native';
import MainHeader from '../components/headers/MainHeader';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: props => <MainHeader headerProps={props} />
  };

  constructor(props) {
    super(props);

    this._openDrawer = this._openDrawer.bind(this);
  }

  _openDrawer() {
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up HomeScreen.js to start working on your app!</Text>
        <TouchableHighlight onPress={() => this._openDrawer()}>
          <Text>Hello</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
