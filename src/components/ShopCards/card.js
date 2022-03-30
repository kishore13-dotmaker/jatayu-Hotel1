import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShopCardsStyle from './ShopCardsStyle';
import Colors from '../../assets/colors/colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function Cards(foundHotels){

  
    return(
    
      <View style={ShopCardsStyle.card}>
          <Image source={{uri:foundHotels.item.image}} style={ShopCardsStyle.cardImage}/>
          <View style={ShopCardsStyle.CardTextView}> 
          <Text style={ShopCardsStyle.CardTextTitle}> {foundHotels.item.hotelName} </Text>
          <View style={{flexDirection :'row'}}>

          <Text style={ShopCardsStyle.CardTextRating}> {foundHotels.item.star_rating} </Text>
          <FontAwesome name='star' size={20} color= {Colors.blueHome}/>
          </View>
          </View>
          <Text style={ShopCardsStyle.CardTextLocation}>{foundHotels.item.city}</Text>
      </View>
        
    )   

}