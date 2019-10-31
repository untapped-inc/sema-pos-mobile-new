import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

export default styles;
