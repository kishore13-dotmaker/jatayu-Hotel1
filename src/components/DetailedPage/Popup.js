import React, { useState } from "react";
import {
  Alert,
  Modal,
  stylesheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import PopUpstyles from "./PopupPageStyle";
import { Picker } from "@react-native-picker/picker";
const Popup = (navigation) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [guests, setGuests] = useState();
  const [pickerValue, setPickerValue ] = useState('JavaScrpit')

  return (
    <View style={PopUpstyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(modalVisible);
        }}
      >
        <View style={PopUpstyles.centeredView}>
          <View style={PopUpstyles.modalView}>
            <View style={PopUpstyles.row}>
              <TextInput
                style={PopUpstyles.input}
                labelValue={checkin}
                onChangeText={(checkin) => setCheckin(checkin)}
                placeholder="Check-In"
              />
              <TextInput
                style={PopUpstyles.input}
                labelValue={checkout}
                onChangeText={(checkout) => setCheckout(checkout)}
                placeholder="Check-Out"
              />
            </View>
            <View>
              <TextInput
                style={PopUpstyles.input}
                labelValue={guests}
                onChangeText={(guests) => setGuests(guests)}
                placeholder="Guests Staying"
              />
            </View>

            <View style={PopUpstyles.container}>
              <Picker
                style={PopUpstyles.picker}
                selectedValue={pickerValue}
                onValueChange={(itemValue) => setPickerValue(itemValue)}
              >
                <Picker.Item label="JavaScript" value="JavaScrpit" />
                <Picker.Item label="Java" value="Java" />
                <Picker.Item label="C#" value="c#" />
              </Picker>
            </View>
            <Pressable
              style={[PopUpstyles.button, PopUpstyles.buttonClose]}
              onPress={() => handleSubmit()}
            >
              <Text style={PopUpstyles.textStyle}>Confirm Booking</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
