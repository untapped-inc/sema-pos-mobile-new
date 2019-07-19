import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  TextInput,
  withTheme,
  Button
} from 'react-native-paper';

class AuthScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Version 1.0.0',
    headerLeft: (
      <Image source={require('../../assets/swe-logo.png')} resizeMode='stretch' style={{
        width: 50,
        height: 50,
        left: 5,
      }} />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      serviceUrl: null,
      site: null,
      usernameOrEmail: null,
      password: null
    }
  }

  render() {
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          style={styles.textInput}
          label='SEMA Service URL'
          mode="outlined"
          placeholder="SEMA Service URL"
          returnKeyType="next"
          maxLength={250}
          value={this.state.serviceUrl}
          onChangeText={serviceUrl => { this.setState({ serviceUrl }) }}
          onSubmitEditing={() => { this.siteInput.focus(); }}
          blurOnSubmit={false}
        />

        <TextInput
          ref={(input) => { this.siteInput = input; }}
          style={styles.textInput}
          label='Site'
          mode="outlined"
          placeholder="Site"
          returnKeyType="next"
          maxLength={250}
          value={this.state.site}
          onChangeText={site => { this.setState({ site }) }}
          onSubmitEditing={() => { this.usernameOrEmailInput.focus(); }}
          blurOnSubmit={false}
        />

        <TextInput
          ref={(input) => { this.usernameOrEmailInput = input; }}
          style={styles.textInput}
          label='Username or Email'
          mode="outlined"
          placeholder="Username or Email"
          returnKeyType="next"
          maxLength={250}
          value={this.state.usernameOrEmail}
          onChangeText={usernameOrEmail => { this.setState({ usernameOrEmail }) }}
          onSubmitEditing={() => { this.passwordInput.focus(); }}
          blurOnSubmit={false}
        />

        <TextInput
          ref={(input) => { this.passwordInput = input; }}
          style={styles.textInput}
          label='Password'
          mode="outlined"
          placeholder="Password"
          returnKeyType="done"
          maxLength={250}
          value={this.state.password}
          onChangeText={password => { this.setState({ password }) }}
          secureTextEntry={true}
        />

        <View style={styles.authButtons}>
          <Button mode="contained" onPress={() => console.log('Pressed')}>
            Connect
          </Button>
        </View>
      </View>
    );
  }
}

export default withTheme(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 200
  },

  authButtons: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center'
  },

  textInput: {
    marginTop: 10
  },
});
