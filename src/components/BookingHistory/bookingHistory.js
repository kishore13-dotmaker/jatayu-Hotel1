import React, { Component, useState } from "react";
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
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }
  async componentDidMount() {
    
    const accessToken = await SecureStore.getItemAsync("accessToken");
    var details = {
      accessToken: accessToken,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);

    }
    formBody = formBody.join("&");
    const postResponse = fetch("http://192.168.181.77:3000/bookingHistory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.foundBookings,
        });
      });
  }
  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => {}}>
    <View style={BookingHistoryStyles.contentontainerStyle}>
    <Text>{item._id}</Text>  
    <Text>{item.hotelName}</Text>
      <Text>{item.price}</Text>
      <Text>{item.check_in}</Text>
      <Text>{item.check_out}</Text>
      <Text>{item.guests}</Text>
      </View>
    </TouchableOpacity>
    
  );
  render() {
    if (this.state.isLoading) {
      return (
        <View style={BookingHistoryStyles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <View style={BookingHistoryStyles.container}>
          <FlatList
        snapToInterval={width - 20}
        contentontainerStyle={BookingHistoryStyles.contentontainerStyle}
        showsHorizontalScrollIndicator={false}
        vertical={true}
        data={this.state.dataSource}
        renderItem={this.renderItem}                                                                                                                                                                                                     
        keyExtractor={(item,index) => index}      
        />
        </View>
      );
    }
  }
}
