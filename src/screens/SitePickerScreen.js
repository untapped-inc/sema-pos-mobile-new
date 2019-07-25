import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  withTheme,
  Surface,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Dropdown } from 'react-native-material-dropdown';
import { login } from '../store/actions/AuthActions';

const width = Dimensions.get('window').width;

const sitesData = [
  { value: { name: 'Corail', id: 1 }, label: 'Corail' },
  { value: { name: 'Cabaret', id: 1 }, label: 'Cabaret' },
  { value: { name: 'Saintard', id: 1 }, label: 'Saintard' },
  { value: { name: 'Quartier Morin', id: 1 }, label: 'Quartier Morin' },
];

class SitePickerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSite: null,
      currentUser: null,
      loading: true
    };

    this._onSiteSelected = this._onSiteSelected.bind(this);
  }

  componentDidMount() {
    this.setState({ currentUser: this.props.navigation.getParam('user', {}) }, () => {
      if (this.state.currentUser.role[0].code === 'admin') {
        this.props.navigation.navigate('Main');
      }
    });
  }

  _onSiteSelected(selectedSite) {
    this.setState({ selectedSite })
  }

  render() {
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {this.state.loading ?
          <ActivityIndicator size="large" color={colors.primary} /> :
          <Surface style={styles.formContainer}>
            <TouchableOpacity>
              <Dropdown
                value={this.state.selectedSite ? this.state.selectedSite.name : sitesData[0].label}
                onChangeText={this._onSiteSelected}
                label='Select Site...'
                data={sitesData}
                containerStyle={[styles.dropdownContainer, { width: width * .5 }]}
              />
            </TouchableOpacity>
          </Surface>}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(withTheme(SitePickerScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    flex: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  dropdownContainer: {
  },
});
