import React from 'react';
import { StyleSheet, View, Dimensions,Image,FlatList,Text } from 'react-native';
import {
  TextInput,
  withTheme,
  Button,
  Surface,
  Dialog,
  Paragraph,
  Portal
} from 'react-native-paper';
import {CardOne, RowOne, RowTwo, RowThree} from '../components/objects';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../store/actions/AuthActions';
import { BadCredentialsError } from '../errors';

const { width, height } = Dimensions.get('window');

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: null,
      password: null,
      loading: false,
      showError: false,
      errorMsg: null,
      search:""
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

console.log(colors);
    return (

      <View style={styles.main}>

        <View style={{flex: 8,
        alignItems: "center",
        justifyContent: "center" }}>
          <FlatList
            numColumns={4}
            style={{padding: "1%", }}
            showsVerticalScrollIndicator={false}
            data={[
              {key: 1, image:"https://www.welcomeoffice.com/WO_Products_Images/Large/054796.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 2, image:"https://www.tntsport.fr/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/w/a/water_jug.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 3, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Gcuiv1CeUS8eJ7hvAXsRvW9q1ZR023wiITXWVjPVNUnz0tOE", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 4, image:"https://www.auchandirect.fr/backend/media/products_images/0N_16124.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 8, image:"https://www.welcomeoffice.com/WO_Products_Images/Large/054796.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 5, image:"https://www.tntsport.fr/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/w/a/water_jug.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 6, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Gcuiv1CeUS8eJ7hvAXsRvW9q1ZR023wiITXWVjPVNUnz0tOE", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
              {key: 7, image:"https://www.auchandirect.fr/backend/media/products_images/0N_16124.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },]}
          renderItem={({item}) =>
              <CardOne
              image={{
                uri:
                  item.image
              }}
              width={"23%"}
              shadowColor={item.shadowColor}
              title={item.title}
              onClick={()=>alert(item.key)}
            />
          }
          />

        </View>
        <View style={{ height: "98%", flex: 4,  margin: "0.5%"}} >
        <RowOne  text1={"Nom client "} text2={"fsdfsdf "} direction={'row'} color={"#ffff"} height={30} top={15} />
        <RowOne  text1={"# telephone "} text2={"2342342342"} direction={'row'}  color={"#ffff"} height={30} top={0} />
        <RowOne  text1={"Commande "} text2={"Chariot(7) "} direction={'row'}  color={"#ffff"} height={30} top={25} />

        <View style={{ height: 50, marginTop: 5, backgroundColor: "#fff"}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 16, fontWeight: 'bold'}}> {"Total de la commande  "}</Text></View>
          <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 16, fontWeight: 'bold'}}> {"44,024.00 "}</Text></View>
        </View>


        <View style={{ height: 50, marginTop: 5,flexDirection: 'row', backgroundColor: "#fff"}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 12, fontWeight: 'bold'}}> {"Article  "}</Text></View>
          <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Quantité "}</Text></View>
          <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Facture "}</Text></View>
        </View>


        <FlatList
          keyExtractor={(item, index) => JSON.stringify(item)}
          showsVerticalScrollIndicator={false}
          data={[
            {key: 1, name:"At1", qte:20, price:23 },
            {key: 2, name:"At2", qte:23, price:14 },
            {key: 3, name:"At3", qte:21, price:25 },
            {key: 4, name:"At4", qte:26, price:19 },
            {key: 5, name:"At5", qte:16, price:23 },
            {key: 6, name:"At6", qte:7, price:25 },]}
        renderItem={({item}) => <RowTwo text1={item.name} text2={item.qte} text3={item.price} />
        }
        />




          <Button
            style={{position: 'absolute', bottom: 3, width: "100%"}}
            mode="contained"
            onPress={() => {}}
            loading={false}
          >
            PAYER
          </Button>


        </View>

      {/*

        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2858a7"}} >
            <Image source={require("../../assets/swe-logo.png")} style={{width: "60%", resizeMode: "contain"}} />
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { backgroundColor: colors.background }
          ]}
        >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.background, }} >

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

        </View>
      </KeyboardAwareScrollView>*/}

        </View>
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

main:{flex: 1, backgroundColor: "#f8f8f8", flexDirection: 'row' },

  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center'
  },

  contentBox: {
    padding: 20,
    width: width * 0.5,
    height: 'auto',
    elevation: 0,
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
