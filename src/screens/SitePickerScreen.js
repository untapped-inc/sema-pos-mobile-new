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

class SitePickerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      sites: [],
      selectedSite: null,
    };

    this._onSiteSelected = this._onSiteSelected.bind(this);
  }

  componentDidMount() {
    const preparedSites = this.props.kiosks.map((kiosk, idx) => {
      return {
        value: {
          id: kiosk.id,
          name: kiosk.name,
          idx
        },
        label: kiosk.name,
      }
    });

    this.setState({
      sites: preparedSites,
      loading: false,
      selectedSite: preparedSites[0].label
    });
  }

  _onSiteSelected(selectedSite) {
    this.setState({ selectedSite: this.props.kiosks[selectedSite.idx].label })
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
                value={this.state.selectedSite}
                onChangeText={this._onSiteSelected}
                label='Select Site...'
                data={this.state.sites}
                containerStyle={[styles.dropdownContainer, { width: width * .5 }]}
              />
            </TouchableOpacity>
          </Surface>}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  kiosks: state.session.kiosks,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SitePickerScreen));

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
