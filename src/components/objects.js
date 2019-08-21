import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;


class CardOne extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    let { image, title,width, shadowColor, onClick } = this.props;
    return (
      <TouchableOpacity
      onPress={()=>onClick()}
        style={{
          width: width,
          height: 200,
          margin: 5,
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 5,


        }}
      >

          <Image
            source={image}
            style={{
              width: 140,
              height: 161,
              resizeMode: "cover",
              marginTop: 10
            }}
          />
          <View
            style={{
              width: "100%",
              height: 50,
              zIndex: 3,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: shadowColor,
              position: 'absolute',
              bottom: 0,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{

                color: "#ffffff",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {title}
            </Text>

          </View>

      </TouchableOpacity>
    );
  }
}

class RowOne extends Component<Props> {
 constructor(props) {
   super(props);
 }

 render() {
   let { text1, text2, color, height, top, direction } = this.props;
   return (
     <View style={{ height: height,flexDirection: direction, backgroundColor: color, marginTop:top}}>
       <View style={{flex: 1, justifyContent: 'center'}} ><Text  style={{}}> {text1}</Text></View>
       <View style={{flex: 2,  justifyContent: 'center'}} ><Text  style={{}} > {text2}</Text></View>
     </View>
   );
 }
}

class RowTwo extends Component<Props> {
 constructor(props) {
   super(props);
 }

 render() {
   let { text1, text2, text3 } = this.props;
   return (
     <View style={{ height: 25, marginTop: 2,flexDirection: 'row', backgroundColor: "#fff"}}>
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 14, fontWeight: 'bold'}}> {text1}</Text></View>
       <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 14, fontWeight: 'bold'}}> {text2}</Text></View>
       <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 14, fontWeight: 'bold'}}> {text3}</Text></View>
     </View>
   );
 }
}

class RowThree extends Component<Props> {
 constructor(props) {
   super(props);
 }

 render() {
   let {  name, phone, address, balance, canal  } = this.props;
   return (
     <View style={{ height: 45, marginTop: 2,flexDirection: 'row', backgroundColor: "#fff"}}>
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 14, fontWeight: 'bold'}}> {name}</Text></View>
       <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 14, fontWeight: 'bold'}}> {phone}</Text></View>
       <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 14, fontWeight: 'bold'}}> {address}</Text></View>
       <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 14, fontWeight: 'bold'}}> {balance}</Text></View>
       <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 14, fontWeight: 'bold'}}> {canal}</Text></View>
     </View>
   );
 }
}


export {CardOne, RowOne, RowTwo, RowThree}
