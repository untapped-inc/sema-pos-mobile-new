import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Appbar,
  IconButton,
  Text,
  Menu,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/AuthActions';
import semaLogo from '../../../assets/swe-logo.png';

class MainHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this._openDrawer = this._openDrawer.bind(this);
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._logout = this._logout.bind(this);
  }

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  _logout = () => {
    this.props.logout();

    this.props.headerProps.navigation.navigate('Auth');
  }

  _openDrawer() {
    this.props.headerProps.navigation.openDrawer();
  }

  render() {
    return (
      <Appbar.Header style={styles.container}>
        <IconButton
          icon="menu"
          color="#fff"
          // size={50}
          onPress={() => this._openDrawer()}
        />

        <Image
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
          source={semaLogo}
        />

        <View style={styles.userInfo}>
          <Text style={styles.userFullNameText}>{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</Text>

          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            style={styles.userInfoMenu}
            anchor={(
              <IconButton
                icon="account-circle"
                color="#fff"
                size={30}
                onPress={() => this._openMenu()}
              />
)}
          >
            <Menu.Item onPress={() => this._logout()} title="Logout" />
          </Menu>
        </View>
      </Appbar.Header>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

const styles = StyleSheet.create({
  container: {
  },

  userInfoMenu: {
    marginTop: 35,
  },

  userFullNameText: {
    color: '#fff'
  },

  userInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
