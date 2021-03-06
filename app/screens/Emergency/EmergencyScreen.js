import React, { useEffect } from "react";
import { 
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
 } from "react-native";
import { useState } from "react";
import {Linking} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function EmergencyScreen({ navigation,async }) {
  const police = require("../../assets/police.png");
  const ambulance = require("../../assets/ambulance.png");
  const nextofkin = require("../../assets/man.png");
  const pictures = {police, ambulance, nextofkin};
  const [pic, setPic] = useState(pictures.police);
  const [number, setNumber] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(text);
  const [nokData, setNokData] = useState({  nokName: '', nokNumber: '' });

  // Fetch NokName and contact from storage
  useEffect(() => {
    async function fetchFromStorage() {
      let stateArr = await AsyncStorage.multiGet(["nokName", "nokNumber"]);
      stateArr = stateArr.map(([key, value]) => [
        key,
        value == null ? "" : value,
      ]); // Default to empty string
      setNokData(Object.fromEntries(stateArr))
    }
    fetchFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}> Click on the button you want to call</Text>
        <View style={styles.parent}>
          <TouchableOpacity style={styles.policeButton}
          onPress={() => setModalVisible(!modalVisible) || setText("Police") || setPic(pictures.police) || setNumber('tel:999')}  
          >
            <Image source={police}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.ambulanceButton}
            onPress={() => setModalVisible(!modalVisible) || setText("Ambulance") || setPic(pictures.ambulance) || setNumber('tel:995')}  
          >
            <Image source={ambulance}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.NOKButton}
            onPress={() => setModalVisible(!modalVisible) || setText(nokData.nokName) || setPic(pictures.nextofkin) || setNumber('tel: ' + nokData.nokNumber)} 
          >
            <Image source={nextofkin}/>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
              style={styles.modalPic}
              source={pic}
              ></Image>
              <Text style={styles.modalText}>Call {text}?</Text>
              <View style={styles.parentButtons}>
                <TouchableOpacity
              style={[styles.buttonGreen]}
              onPress={() => setModalVisible(!modalVisible) || Linking.openURL(number)}
                >
                <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
              style={[styles.buttonRed]}
              onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
            </View>
          </View>
          </View>
          </Modal>  
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
parent: {
  top: 50,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: 'center',
  padding:20,
},
policeButton: {
  padding:20,
},
ambulanceButton: {
  padding:20,
},
NOKButton: {
  padding:20,

},
container: {
  // flexDirection: 'column',
  flex: 2,
  // paddingTop: 20,
  backgroundColor: "white",
  alignItems: "center",
  justifyContent: "center",
},
feature_box: {
  flex: 1,
  flexDirection: "row",
  alignContent: "flex-end",
},
pictures: {
  height: "30%",
  width: "100%",
  alignSelf: "center",
  resizeMode: "contain",
},
rectangles: {
  flex: 1,
  justifyContent: "center",
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  // width: 250,
  // height: 200,
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 40,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
buttonGreen: {
  borderRadius: 20,
  backgroundColor: "green",
  padding: 10,
  elevation: 2,
  marginRight:5,
},
buttonRed: {
  borderRadius: 20,
  backgroundColor: "red",
  padding: 10,
  elevation: 2,
  marginLeft:5,
},
parentButtons: {
  flexDirection: "row",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 20,
},
infoText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 20,
},
// modalPic: {
//   height: 50,
//   width: 50,
// }
});
