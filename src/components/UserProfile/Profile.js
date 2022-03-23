import React, {useContext, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileScreen from './Profileimage';
import * as SecureStore from 'expo-secure-store'
import ProfileStyles from './ProfileStyle';

const ProfileScreen = ({navigation}) => {
  const [username, setUserName] = useState();
  const [Name, setName] = useState();

  const handleSubmit = async () => {
  var username =  await SecureStore.getItemAsync("username")
   if (username !== null){
     setUserName(username);
   }
  var name =  await SecureStore.getItemAsync("name");
  if (name !== null){
    setName(name);
  }
  var accessToken = await SecureStore.getItemAsync("accessToken");
  // var details = {
  //   username: username,
  //   Name: name,                  
  //   accessToken: accessToken,
  // }
  // console.log(details);
  }
 handleSubmit();
    return (
      <SafeAreaView style={ProfileStyles.container}>

      <View style={ProfileStyles.userInfoSection}>
      <TouchableOpacity onPress={() => navigation.navigate('Profileimage')}></TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
           source={require("../../assets/images/app_icon/profile.jpg")}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[ProfileStyles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{Name}</Title>
            <Caption style={ProfileStyles.caption}>{username}</Caption>
          </View>
        </View>
      </View>

      <View style={ProfileStyles.userInfoSection}>
        <View style={ProfileStyles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Chennai, India</Text>
        </View>
        <View style={ProfileStyles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
        </View>
        <View style={ProfileStyles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{username}</Text>
        </View>
      </View>
      <View >
        {/* <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={()=>{}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => navigation.navigate("BookingHistory")}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="account-check-outline" color="#000" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Booking History</Text>
          </View>
        </TouchableRipple>
       
      </View>
    </SafeAreaView>
      );
    };


export default ProfileScreen;

