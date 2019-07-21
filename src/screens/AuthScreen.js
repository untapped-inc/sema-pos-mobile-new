import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
  withTheme,
  Button,
  Surface,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Dropdown } from 'react-native-material-dropdown';
import { handleLogin } from '../store/actions/AuthActions';
import KeyboardAwareView from '../components/utils/KeyboardAwareView';

const width = Dimensions.get('window').width;

const sitesData = [
  { value: 'Display2' },
  { value: 'Display1' },
  { value: 'Headline' },
  { value: 'Title' },
  { value: 'Subheading' },
  { value: 'Body' },
  { value: 'Caption' },
];

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceUrl: null,
      site: null,
      usernameOrEmail: null,
      password: null,
      loading: false,
      isLoggedIn: false,
      selectedSite: 'Subheading',
    };

    this._handleLogin = this._handleLogin.bind(this);
    this._onSiteSelected = this._onSiteSelected.bind(this);
  }

  _handleLogin() {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({
        loading: false,
        isLoggedIn: true
      });
    }, 4000);
    // this.props.handleLogin(this.state);
  }

  _onSiteSelected(selectedSite) {
    this.setState({ selectedSite })
  }

  render() {
    const { colors, roundness } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Surface style={styles.formContainer}>
          {this.state.isLoggedIn ?
            <TouchableOpacity>
              <Dropdown
                value={this.state.selectedSite}
                onChangeText={this._onSiteSelected}
                label='Select Site...'
                data={sitesData}
                containerStyle={[styles.dropdownContainer, { width: width * .5}]}
              />
            </TouchableOpacity> :
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
                  loading={this.state.loading}
                >
                  Login
            </Button>
              </View>
            </React.Fragment>
          }
        </Surface>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: bindActionCreators(handleLogin, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(withTheme(AuthScreen));

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

  sitePicker: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sitePickerText: {
    color: '#fff',
  },

  dropdownContainer: {
  },
});
