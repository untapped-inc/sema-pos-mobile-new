import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Drawer } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import DrawerHeader from '../components/headers/DrawerHeader';

export default class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'order'
    }
  }

  render() {
    return (
      <ScrollView>
        <DrawerHeader />
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <Drawer.Item
            label="Order"
            active={this.state.active === 'order'}
            onPress={() => { this.setState({ active: 'first' }); }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});