import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStripe } from "@stripe/stripe-react-native";

import * as SecureStore from 'expo-secure-store';
import PaymentStyles from './PaymentStyles';



const PaymentScreen = async ({ navigation, props }) => {
  //ADD localhost address of your server
  var checkin =  await SecureStore.getItemAsync("checkin")
  var checkout =  await SecureStore.getItemAsync("checkout")
  var guests =  await SecureStore.getItemAsync("guests")
  var roomCategory =  await SecureStore.getItemAsync("roomCategory")
  var accessToken =  await SecureStore.getItemAsync("accessToken")
  const API_URL = "http://172.19.14.252:3000";

  const [email, setEmail] = useState();
  // const [cardDetails, setCardDetails] = useState();
  const stripe = useStripe();
  // const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/pay`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!email) {
      Alert.alert("Please enter valid Email");
      return;
    }
    const billingDetails = {
      email: email,
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
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        const presentSheet = await stripe.presentPaymentSheet({
          clientSecret,
        });
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);
        // Alert.alert("Booking Successful");
        // var details = {
        //   check_in: checkin,
        //   check_out: checkout,
        //   category : roomCategory,
        //   guests: guests
        // }
        // var formBody = [];
        // for (var property in details) {
        //   var encodedKey = encodeURIComponent(property);
        //   var encodedValue = encodeURIComponent(details[property]);
        //   formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");
        // fetch('http://192.168.1.6:3000/newBooking', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        //   },
        //   body: formBody
        // })
        // .then((response) => response.json())
        //   .then((responseJson) =>{
        //     console.log(responseJson);
        //   })
        //   .catch((error)=>{
        //     console.error(error);
        //   });
    
      };

    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={PaymentStyles.container}>
      <StripeProvider publishableKey="pk_test_51KFMKpSFhRwTxyXZDMXbRgR1LeBYbfdyZzuqldHxyFpZz3WYamRyYZ9428b0P8sXpk7zP3QMWJrwcO07dJ5HStGL00FHZ5gd72">
        {/* <StripeProvider
          publishableKey="pk_test_51KFMKpSFhRwTxyXZDMXbRgR1LeBYbfdyZzuqldHxyFpZz3WYamRyYZ9428b0P8sXpk7zP3QMWJrwcO07dJ5HStGL00FHZ5gd72"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        > */}

        {/* </StripeProvider> */}
        <TextInput
          value={email}
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          style={PaymentStyles.input}
        />
        <Button onPress={handlePayPress} title="Pay" />
      </StripeProvider>

    </View>

  );
};




export default PaymentScreen;
