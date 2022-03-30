import React, { Component, useState, useEffect } from "react";
import {
  BookingHistoryStylesheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Dimensions,
} from "react-native";
import BookingHistoryStyles from "./bookingHistoryStyle";
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
const { width } = Dimensions.get("screen");
import BookCards from "../ShopCards/BookingCard";

const BookingHistory = (navigation) => {
  const[bookingHistory,setBookingHistory]= useState();

 useEffect(async() => {
  var accessToken = await SecureStore.getItemAsync('accessToken');
  // console.log(accessToken);
  var details = {
    accessToken: accessToken,
  }
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch('http://172.17.204.83:3000/bookingHistory', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  .then((response) => response.json())
  .then( async (response) =>{
    try {
      // console.log(response)
      setBookingHistory(response.foundBookings)
    } catch (e) {
      console.log(e)
    }
}).catch((error)=>{
    console.error(error);
  });
}, []);
// console.log(bookingHistory);
return(
  <FlatList
  snapToInterval={width - 20}
  contentontainerStyle={BookingHistoryStyles.contentontainerStyle}
  showsHorizontalScrollIndicator={false}
  vertical={true}
  data={bookingHistory}
  keyExtractor={( item , index) => {return item._id}}
  renderItem={({ item }) => (
      <BookCards item={item} />
  )}
/>
)
  }

export default BookingHistory;