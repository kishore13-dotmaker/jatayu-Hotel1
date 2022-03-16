import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import files from '../assets/filesBase64';

import ProfileStyles from './ProfileStyle';

const ProfileScreen = () => {

  const myCustomShare = async() => {
    const shareOptions = {
      message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
      url: files.appLogo,
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };

  return (
    <SafeAreaView style={ProfileStyles.container}>

      <View style={ProfileStyles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[ProfileStyles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>John Doe</Title>
            <Caption style={ProfileStyles.caption}>@j_doe</Caption>
          </View>
        </View>
      </View>

      <View style={ProfileStyles.userInfoSection}>
        <View style={ProfileStyles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
        </View>
        <View style={ProfileStyles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
        </View>
        <View style={ProfileStyles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>john_doe@email.com</Text>
        </View>
      </View>

      <View style={ProfileStyles.infoBoxWrapper}>
          <View style={[ProfileStyles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={ProfileStyles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View>

      <View style={ProfileStyles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={myCustomShare}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

