import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
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
import { bindActionCreators } from "redux";
import { login } from '../store/actions/AuthActions';
import KeyboardAwareView from '../components/utils/KeyboardAwareView';
import {
  SERVER_ERR,
  BAD_CREDENTIALS_ERR
} from '../errors/types';

const width = Dimensions.get('window').width;

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: null,
      password: null,
      loading: false,
      selectedSite: 'Subheading',
      showError: false,
      errorMsg: null
    };

    this._handleLogin = this._handleLogin.bind(this);
    this._onSiteSelected = this._onSiteSelected.bind(this);
    this._hideDialog = this._hideDialog.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('Main');
    }
  }

  _handleLogin() {
    this.setState({ loading: true, });

    this.props.login(this.state.usernameOrEmail, this.state.password)
      .then(user => {
        this.setState({ loading: false, });
        this.props.navigation.navigate('SitePicker', { user });
      })
      .catch(err => {
        if (err.type === SERVER_ERR) {
          this.setState({
            errorMsg: err.msg,
            errorTitle: 'Network Error',
            showError: true,
          });
        } else if (err.type === BAD_CREDENTIALS_ERR) {
          this.setState({
            errorMsg: err.msg,
            errorTitle: 'Bad Credentials',
            showError: true,
          });
        }
      })
  }

  _onSiteSelected(selectedSite) {
    this.setState({ selectedSite })
  }

  _hideDialog() {
    this.setState({
      showError: false,
      loading: false
    })
  }

  render() {
    const { colors, roundness } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Surface style={styles.formContainer}>
          <React.Fragment>
            <KeyboardAwareView style={{ justifyContent: 'center' }}>
              <TextInput
                ref={(input) => { this.usernameOrEmailInput = input; }}
                style={[styles.textInput, { width: width * .5 }]}
                label='Username or Email'
                mode="outlined"
                returnKeyType="next"
                maxLength={250}
                value={this.state.usernameOrEmail}
                onChangeText={usernameOrEmail => { this.setState({ usernameOrEmail }) }}
                onEndEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
              />

              <TextInput
                ref={(input) => { this.passwordInput = input; }}
                style={[styles.textInput, { width: width * .5 }]}
                label='Password'
                mode="outlined"
                returnKeyType="done"
                maxLength={250}
                value={this.state.password}
                onChangeText={password => { this.setState({ password }) }}
                secureTextEntry={true}
              />
            </KeyboardAwareView>

            <View style={styles.authButtons}>
              <Button
                mode="contained"
                onPress={() => this._handleLogin()}
                loading={this.state.loading}>Login</Button>
            </View>

            <Portal>
              <Dialog
                visible={this.state.showError}
                onDismiss={this._hideDialog}>
                <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{this.state.errorMsg}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={this._hideDialog}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </React.Fragment>
        </Surface>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AuthScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  authButtons: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center'
  },

  textInput: {
    marginTop: 10,
    backgroundColor: '#fff'
  },

  formContainer: {
    flex: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
