//import {CardOne, RowOne, RowTwo , RowThree} from '../components/objects';


// <View style={{flex: 8,
// alignItems: "center",
// justifyContent: "center" }}>
//   <FlatList
//     numColumns={4}
//     style={{padding: "1%", }}
//     showsVerticalScrollIndicator={false}
//     data={[
//       {key: 1, image:"https://www.welcomeoffice.com/WO_Products_Images/Large/054796.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 2, image:"https://www.tntsport.fr/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/w/a/water_jug.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 3, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Gcuiv1CeUS8eJ7hvAXsRvW9q1ZR023wiITXWVjPVNUnz0tOE", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 4, image:"https://www.auchandirect.fr/backend/media/products_images/0N_16124.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 8, image:"https://www.welcomeoffice.com/WO_Products_Images/Large/054796.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 5, image:"https://www.tntsport.fr/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/w/a/water_jug.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 6, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Gcuiv1CeUS8eJ7hvAXsRvW9q1ZR023wiITXWVjPVNUnz0tOE", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },
//       {key: 7, image:"https://www.auchandirect.fr/backend/media/products_images/0N_16124.jpg", shadowColor:"rgba(0,0,0,0.5)", title:"25 litres" },]}
//   renderItem={({item}) =>
//       <CardOne
//       image={{
//         uri:
//           item.image
//       }}
//       width={"23%"}
//       shadowColor={item.shadowColor}
//       title={item.title}
//       onClick={()=>alert(item.key)}
//     />
//   }
//   />
//
// </View>
// <View style={{ height: "98%", flex: 4,  margin: "0.5%"}} >
// <RowOne  text1={"Nom client "} text2={"fsdfsdf "} direction={'row'} color={"#ffff"} height={30} top={15} />
// <RowOne  text1={"# telephone "} text2={"2342342342"} direction={'row'}  color={"#ffff"} height={30} top={0} />
// <RowOne  text1={"Commande "} text2={"Chariot(7) "} direction={'row'}  color={"#ffff"} height={30} top={25} />
//
// <View style={{ height: 50, marginTop: 5, backgroundColor: "#fff"}}>
//   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 16, fontWeight: 'bold'}}> {"Total de la commande  "}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 16, fontWeight: 'bold'}}> {"44,024.00 "}</Text></View>
// </View>
//
//
// <View style={{ height: 50, marginTop: 5,flexDirection: 'row', backgroundColor: "#fff"}}>
//   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 12, fontWeight: 'bold'}}> {"Article  "}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Quantité "}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Facture "}</Text></View>
// </View>
//
//
// <FlatList
//   keyExtractor={(item, index) => JSON.stringify(item)}
//   showsVerticalScrollIndicator={false}
//   data={[
//     {key: 1, name:"At1", qte:20, price:23 },
//     {key: 2, name:"At2", qte:23, price:14 },
//     {key: 3, name:"At3", qte:21, price:25 },
//     {key: 4, name:"At4", qte:26, price:19 },
//     {key: 5, name:"At5", qte:16, price:23 },
//     {key: 6, name:"At6", qte:7, price:25 },]}
// renderItem={({item}) => <RowTwo text1={item.name} text2={item.qte} text3={item.price} />
// }
// />
//
//
//
//
//   <Button
//     style={{position: 'absolute', bottom: 3, width: "100%"}}
//     mode="contained"
//     onPress={() => {}}
//     loading={false}
//   >
//     PAYER
//   </Button>
//
//
// </View>






















//
//
// <View style={{ flexDirection: 'row'}}>
//
//   <View style={{flex: 8, alignItems: "center", justifyContent: "center" }}>
//     <TextInput
//       placeholder="Search"
//       returnKeyType="done"
//       keyboardType="default"
//       maxLength={250}
//       style={{height: 50, marginTop: 10,width: "80%"}}
//       value={this.state.search}
//       onChangeText={(search) => {
//         this.setState({ search });
//       }}
//     />
//   </View>
//   <View style={{ height: 100, flex: 4,  }} >
//     <RowOne  text1={"Nom client "} text2={"fsdfsdf "} direction={'row'} color={"#ffff"} height={40} top={15} />
//     <RowOne  text1={"# telephone "} text2={"2342342342"} direction={'row'}  color={"#ffff"} height={40} top={0} />
//   </View>
//
// </View>
// <View style={{ height: 50, marginTop: 5,flexDirection: 'row', backgroundColor: "#fff"}}>
//   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><Text style={{fontSize: 12, fontWeight: 'bold'}}> {"Nom client"}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Telephone "}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Adresse "}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Balance "}</Text></View>
//   <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}} ><Text  style={{fontSize: 12, fontWeight: 'bold'}}> {"Canal de vente "}</Text></View>
//
// </View>
// <FlatList
//   keyExtractor={(item, index) => JSON.stringify(item)}
//   showsVerticalScrollIndicator={false}
//   data={[
//     {key: 1, name:"At1", phone:"324234324", address:"add", balance:"bal", canal:"can" },
//     {key: 2, name:"At1", phone:"324234324", address:"add", balance:"bal", canal:"can" },
//     {key: 3, name:"At1", phone:"324234324", address:"add", balance:"bal", canal:"can" },
//     {key: 4, name:"At1", phone:"324234324", address:"add", balance:"bal", canal:"can" },
//     {key: 5, name:"At1", phone:"324234324", address:"add", balance:"bal", canal:"can" },
//     {key: 6, name:"At1", phone:"324234324", address:"add", balance:"bal", canal:"can" },]}
// renderItem={({item}) => <RowThree name={item.name} phone={item.phone} address={item.address} balance={item.balance}  canal={item.canal}  />
// }
// />
