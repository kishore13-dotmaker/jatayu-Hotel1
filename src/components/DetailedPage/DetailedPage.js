import React, { useEffect, useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import DetailsStyles from "./DetailedPageStyle";
import { StatusBar } from "expo-status-bar";
import Colors from "../../assets/colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import HotelImage from "./HotelImage";
import FormButton from "../Buttons/FormButton";
import { Picker } from "@react-native-picker/picker";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStripe } from "@stripe/stripe-react-native";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("screen");

const DetailedPage = ({ navigation, route, props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [guests, setGuests] = useState();
  const [roomCategory, setRoomCategory] = useState("superDeluxe");
  const item = route.params;
  const [shouldShow, setShouldShow] = useState(false);
  const API_URL = "http://127.0.0.1:3000";
  // const [cardDetails, setCardDetails] = useState();
  const stripe = useStripe();
  const [email, setEmail] = useState();
  const [hotel_id, setHotel_id] = useState();
  const [days, setDays] = useState();
  const [roomPrice, setRoomPrice] = useState();
  // var hotel_id = "62323b951ab3cd1006950954";
  // const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    var email = await SecureStore.getItemAsync("username");
    var roomPrice = await SecureStore.getItemAsync("roomPrice");
    setRoomPrice(roomPrice)
    setEmail(email);
    const response = await fetch(`${API_URL}/pay`, {
      method: "POST",
      body: JSON.stringify({
        email:email,
        hotel_id:hotel_id,
        type: roomCategory,
        check_in: checkin,
        price:roomPrice
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    var accessToken = await SecureStore.getItemAsync("accessToken");

    const billingDetails = {
      email: email,
      hotel_id: hotel_id,
      checkInDate: checkin,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const initSheet = await stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          googlePay: true,
          merchantDisplayName: 'Merchant Name',
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        const presentSheet = await stripe.presentPaymentSheet({
          clientSecret,
        });
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);
        {
          var details = {
            accessToken: accessToken,
            check_in: checkin,
            check_out: checkout,
            category: roomCategory,
            guests: guests,
            hotel_id: hotel_id,
          };
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          fetch(`${API_URL}/newBooking`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formBody,
          })
            .then((response) => response.json())
            .then((responseJson) => {
              // console.log(responseJson);
              Alert.alert("Booking Successful, thank you!");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //3.Confirm the payment with the card details
  const getPrice = async () => {
    var hotel_id = await SecureStore.getItemAsync("hotel_id");
    // console.log(hotel_id);
    setHotel_id(hotel_id);
    var details = {
      hotel_id: hotel_id,
      days: days,
      category: roomCategory,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://127.0.0.1:3000/findprice", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        
        await SecureStore.setItemAsync("roomPrice",JSON.stringify(responseJson.price))
      });
  };
  const onpress =()=>{
    getPrice();
    setShouldShow(true);
  }
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
            source={{uri:item.image}}
          >
            <View style={DetailsStyles.header}>
              <TouchableOpacity onPress={navigation.goBack}>
                <View style={DetailsStyles.headerBtn}>
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
            <Text style={DetailsStyles.titleText}>{item.hotelName}</Text>
          </View>
          <Text style={DetailsStyles.locationText}>{item.city}</Text>
          <Text style={DetailsStyles.detailsText}>{item.description}</Text>

          <FlatList
            snapToInterval={width - 20}
            keyExtractor={(_, key) => key.toString()}
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={item.phoneImage}
            renderItem={({ item }) => <HotelImage image={item} />}
          />
          <View style={DetailsStyles.footer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={DetailsStyles.footerText}>{item.star_rating}</Text>
              <FontAwesome
                name="star"
                size={21}
                color={Colors.blueHome}
                style={{ marginLeft: 10 }}
              />
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                  <TextInput
                    style={DetailsStyles.input}
                    labelValue={days}
                    onChangeText={(days) => setDays(days)}
                    placeholder="Days Staying"
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
                  onPress={() => onpress()}
                >
                  <Text style={DetailsStyles.textStyle}>Get Price</Text>
                </Pressable>
               
                {shouldShow ? (
                <Pressable
                  style={[DetailsStyles.button, DetailsStyles.buttonClose]}
                  onPress={() => {setShouldShow(!shouldShow);handlePayPress();}}
                > 
                  <Text style={DetailsStyles.textStyle}>Confirm Booking</Text>
                </Pressable>
                ) : null}
                <StripeProvider publishableKey="pk_test_51LOKycSAHBKLERfHvIoXVb5S6tPtStzg09KD0Kv9Uvw7rqNYKfUXPaLrsyUgut8N7OftC4uPC3YFl7NpmsEK5xM900VVClZWd7">
                  {/* <StripeProvider
          publishableKey="pk_test_51KFMKpSFhRwTxyXZDMXbRgR1LeBYbfdyZzuqldHxyFpZz3WYamRyYZ9428b0P8sXpk7zP3QMWJrwcO07dJ5HStGL00FHZ5gd72"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        > */}

                  {/* </StripeProvider> */}
                  
                  <Pressable
                    style={[DetailsStyles.button, DetailsStyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={DetailsStyles.textStyle}>
                      Go Back to Hotel
                    </Text>
                  </Pressable>
                </StripeProvider>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailedPage;