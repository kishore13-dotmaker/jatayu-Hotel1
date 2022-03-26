import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Modal,
  TextInput
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Colors from "../../assets/colors/colors";
import HomeStyles from "./HomeScreenStyles";
import SearchBar from "../SearchBar/SerachBar";
import ListOptions from "../ListOptions/ListOptions";
import Categories from "../Categories/Categories";
import Card from "../ShopCards/card";
import shops from "../consts/shops";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("screen");

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState();
  const handleSubmit = async () => {
    var accessToken = await SecureStore.getItemAsync("accessToken");
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
    fetch('http://172.19.14.185:3000/findUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        (navigation.navigate("Profile"))
        await SecureStore.setItemAsync('username', responseJson.user.username)
        await SecureStore.setItemAsync('name', responseJson.user.firstName)
      })
  }
  // const getHotels = () => {
  //   const encodedValue = encodeURIComponent(location);
  //   return fetch('http://172.19.14.185:3000/findHotels')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       return json.movies;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  var url = new URL('http://172.19.14.185:3000/findHotels'),
    params = { city: location }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  fetch(url).then((response) => response.json())
    .then((json) => {
      return json;
      console.log(json);
    })

  return (

    <SafeAreaView style={HomeStyles.safeArea}>
      <View style={HomeStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={HomeStyles.centeredView}>
            <View style={HomeStyles.modalView}>
              <TextInput
                style={HomeStyles.input}
                labelValue={location}
                onChangeText={(location) => setLocation(location)}
                placeholder="location"
              />
              <Pressable
                style={[HomeStyles.button, HomeStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={HomeStyles.textStyle}>Confirm Locatoin</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barstyle="dark-content"
      />
      <View style={HomeStyles.header}>
        <View>
          <Text style={{ color: Colors.greyHome }}>Location</Text>
          <Text
            style={{ color: Colors.black, fontSize: 20, fontWeight: "bold" }}
          >
            {location}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            handleSubmit();
          }}
        >
          <Image
            source={require("../../assets/images/app_icon/profile.jpg")}
            style={HomeStyles.profileImage}

          />
        </Pressable>
      </View>

      <SearchBar />
      <Categories />

      <FlatList
        snapToInterval={width - 20}
        contentontainerStyle={HomeStyles.contentontainerStyle}
        showsHorizontalScrollIndicator={false}
        vertical={true}
        data={shops}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("DetailedPage", item)}>
            <Card item={item} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
