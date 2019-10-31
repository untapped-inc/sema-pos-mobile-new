/* eslint-disable no-shadow */
import React from 'react';
import { View } from 'react-native';
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

import KeyboardAwareView from '../../components/utils/KeyboardAwareView';
import { login } from '../../store/actions/AuthActions';
import { BadCredentialsError } from '../../errors';
import styles from './style';

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
    const { currentUser, navigation: { navigate } } = this.props;
    if (currentUser) {
      navigate('Main');
    }
  }

  _handleLogin() {
    const { login, navigation: { navigate } } = this.props;
    const { usernameOrEmail, password } = this.state;

    this.setState({ loading: true });
    login(usernameOrEmail, password)
      .then(() => {
        this.setState({ loading: false });
        navigate('SitePicker');
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
    const { theme: { colors, roundness } } = this.props;
    const {
      usernameOrEmail, password, loading, showError, errorTitle, errorMsg
    } = this.state;

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
            value={usernameOrEmail}
            onChangeText={(value) => {
              this.setState({ usernameOrEmail: value });
            }}
          />

          <TextInput
            label="Password"
            mode="outlined"
            returnKeyType="done"
            maxLength={250}
            value={password}
            onChangeText={(value) => {
              this.setState({ password: value });
            }}
            secureTextEntry
          />

          <View style={styles.authButtons}>
            <Button
              mode="contained"
              onPress={() => this._handleLogin()}
              loading={loading}
            >
              Login
            </Button>
          </View>
        </Surface>

        <Portal>
          <Dialog visible={showError} onDismiss={this._hideDialog}>
            <Dialog.Title>{errorTitle}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{errorMsg}</Paragraph>
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
