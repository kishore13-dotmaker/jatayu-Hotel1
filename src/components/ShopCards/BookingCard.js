import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BookCardsStyle from './BookingCardStyles';
import Colors from '../../assets/colors/colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function BookCards(bookingHistory){

  
    return(
    
      <View style={BookCardsStyle.card}>
          {/* <Image source={shops.item.img} style={BookCardsStyle.cardImage}/> */}
          <View style={BookCardsStyle.CardTextView}> 
          <Text style={BookCardsStyle.CardTextTitle}> {bookingHistory.item.hotelName} </Text>
          <View style={{flexDirection :'row'}}>

          <FontAwesome name='rupee' size={20} color= {Colors.blueHome}/>
          <Text style={BookCardsStyle.CardTextRating}> {bookingHistory.item.price} </Text>
          </View>
          </View>
          <Text style={BookCardsStyle.CardTextLocation}>{bookingHistory.item.bookingName}</Text>
          <Text style={BookCardsStyle.CardTextLocation}>{bookingHistory.item._id}</Text>
          <Text style={BookCardsStyle.CardTextLocation}>CheckIn Date:{bookingHistory.item.check_in}</Text>
          <Text style={BookCardsStyle.CardTextLocation}>CheckOut Date:{bookingHistory.item.check_out}</Text>
      </View>
        
    )   

}