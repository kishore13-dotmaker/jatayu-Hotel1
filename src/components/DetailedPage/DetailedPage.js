import React, {useEffect, useContext, useState} from "react";
import { SafeAreaView, View, Text, FlatList, Dimensions, TextInput, Alert, Modal, Pressable  } from "react-native";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import DetailsStyles from "./DetailedPageStyle";
import { StatusBar } from "expo-status-bar";
import Colors from "../../assets/colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import PhoneImage from "./PhoneImage";
import FormButton from '../Buttons/FormButton';
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("screen");

const DetailedPage = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [guests, setGuests] = useState();
  const [roomCategory, setRoomCategory ] = useState('JavaScrpit')
  const item = route.params;
  return (
    <SafeAreaView style={DetailsStyles.SafeAreaView}>
      <ScrollView>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.white}
          barstyle="dark-content"
        />
        <View style={DetailsStyles.ImageContainer}>
          <ImageBackground
            style={DetailsStyles.ImageBackground}
            source={item.img}
          >
            <View style={DetailsStyles.header}>
            <TouchableOpacity onPress={navigation.goBack}>

              <View style={DetailsStyles.headerBtn} >
                <FontAwesome
                  name={"chevron-left"}
                  size={20}
                  color={Colors.black}
                />
              </View>
            </TouchableOpacity>
              <View style={DetailsStyles.headerBtn}>
                <FontAwesome
                  name={"heart"}
                  size={20}
                  color={Colors.red}
                  onPress={navigation.goBack}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={DetailsStyles.DetailsContainer}>
          <View style={DetailsStyles.title}>
            <Text style={DetailsStyles.titleText}>{item.title}</Text>
          </View>
          <Text style={DetailsStyles.locationText}>{item.location}</Text>
          <Text style={DetailsStyles.detailsText}>{item.details}</Text>
          <FlatList
            snapToInterval={width - 20}
            keyExtractor={(_, key) => key.toString()}
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={item.phoneImage}
            renderItem={({ item }) => <PhoneImage image={item} />}
          />
          <View style={DetailsStyles.footer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={DetailsStyles.footerText}>{item.rating}</Text>
              <FontAwesome
                name="star"
                size={21}
                color={Colors.blueHome}
                style={{ marginLeft: 10 }}
              />
            </View>

            <TouchableOpacity
            onPress={() => setModalVisible(true) }>
            <View style={DetailsStyles.bookNow}>
              <Text style={{ color: Colors.white }}>Book Now</Text>
            </View>
              </TouchableOpacity>

          </View>
        </View>
        {/* <FormButton
        buttonTitle="Checkout"
        onPress={() => navigation.navigate('StripePayment')}
      /> */}
      <View style={DetailsStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={DetailsStyles.centeredView}>
          <View style={DetailsStyles.modalView}>
            <View style={DetailsStyles.row}>
              <TextInput
                style={DetailsStyles.input}
                labelValue={checkin}
                onChangeText={(checkin) => setCheckin(checkin)}
                placeholder="Check-In"
              />
              <TextInput
                style={DetailsStyles.input}
                labelValue={checkout}
                onChangeText={(checkout) => setCheckout(checkout)}
                placeholder="Check-Out"
              />
            </View>
            <View>
              <TextInput
                style={DetailsStyles.input}
                labelValue={guests}
                onChangeText={(guests) => setGuests(guests)}
                placeholder="Guests Staying"
              />
            </View>

            <View style={DetailsStyles.container}>
              <Picker
                style={DetailsStyles.picker}
                selectedValue={roomCategory}
                onValueChange={(itemValue) => setRoomCategory(itemValue)}
              >
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Couple" value="couple" />
                <Picker.Item label="Super Deluxe" value="superDeluxe" />
                <Picker.Item label="Deluxe" value="deluxe" />
                <Picker.Item label="Luxury" value="luxury" />
              </Picker>
            </View>
            <Pressable
              style={[DetailsStyles.button, DetailsStyles.buttonClose]}
              onPress={() => handleSubmit()}
            >
              <Text style={DetailsStyles.textStyle}>Confirm Booking</Text>
            </Pressable>
            <Pressable
              style={[DetailsStyles.button, DetailsStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={DetailsStyles.textStyle}>Go Back to Hotel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
};

export default DetailedPage;
