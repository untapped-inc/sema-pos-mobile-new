import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  TextInput,
  withTheme,
  Button,
  Surface,
  Dialog,
  Paragraph,
  Portal
} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import KeyboardAwareView from '../components/utils/KeyboardAwareView';
import { login } from '../store/actions/AuthActions';
import { BadCredentialsError } from '../errors';

const { width } = Dimensions.get('window');

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: null,
      password: null,
      loading: false,
      showError: false,
      errorMsg: null
    };

    this._handleLogin = this._handleLogin.bind(this);
    this._hideDialog = this._hideDialog.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('Main');
    }
  }

  _handleLogin() {
    this.setState({ loading: true });

    this.props
      .login(this.state.usernameOrEmail, this.state.password)
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('SitePicker');
      })
      .catch((err) => {
        if (err.name === BadCredentialsError.name) {
          return this.setState({
            errorMsg: err.message,
            errorTitle: 'Invalid Credential',
            showError: true
          });
        }

        return this.setState({
          errorMsg: err.message,
          errorTitle: 'Server Error',
          showError: true
        });
      });
  }

  _hideDialog() {
    this.setState({
      showError: false,
      loading: false
    });
  }

  render() {
    const { colors, roundness } = this.props.theme;

    return (
      <KeyboardAwareView
        backgroundColor={colors.background}
      >
        <Surface style={[styles.contentBox, { borderRadius: roundness }]}>
          <TextInput
            label="Username or Email"
            mode="outlined"
            returnKeyType="done"
            keyboardType="default"
            maxLength={250}
            value={this.state.usernameOrEmail}
            onChangeText={(usernameOrEmail) => {
              this.setState({ usernameOrEmail });
            }}
          />

          <TextInput
            label="Password"
            mode="outlined"
            returnKeyType="done"
            maxLength={250}
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({ password });
            }}
            secureTextEntry
          />

          <View style={styles.authButtons}>
            <Button
              mode="contained"
              onPress={() => this._handleLogin()}
              loading={this.state.loading}
            >
              Login
            </Button>
          </View>
        </Surface>

        <Portal>
          <Dialog visible={this.state.showError} onDismiss={this._hideDialog}>
            <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{this.state.errorMsg}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAwareView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(AuthScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  contentBox: {
    padding: 20,
    width: width * 0.5,
    height: 'auto',
    elevation: 4,
    backgroundColor: '#fff'
  },

  authButtons: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center'
  },

  formContainer: {
    elevation: 2
  }
});
