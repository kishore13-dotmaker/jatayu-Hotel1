import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../Input/FormInput';
import FormButton from '../Buttons/FormButton';
import DismissKeyboard from '../../utils/DismissKeyboard';
import LoginStyles from './LoginStyles';
// import { AuthContext } from '../../navigation/AuthProviders';
import SocialButtons  from "../Buttons/SocialButtons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = async ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const {login} = useContext(AuthContext);
  const handleSubmit = () => { 
    var details = {
      username: email,
      password: password,
    }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://172.19.17.164:3000/loginCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
		.then((response) => response.json())
    .then(async (data)=>{
      try {
        await AsyncStorage.setItem('accessToken',data.accessToken)
        props.navigation.replace("Home")
      } catch (error) {
        console.error(error)
      }
})
			.then((responseJson) =>{
				console.log(responseJson);
			})
			.catch((error)=>{
				console.error(error);
			});
     console.log( JSON.stringify({
				username: email,
        password: password,
			})
     )
}

  return (
    <DismissKeyboard>
    <View style={LoginStyles.container}>
      <Image
        source={require('../../assets/images/app_icon/Phoenixlogo.png')}
        style={LoginStyles.logo}
        resizeMode='contain'
      />
      <Text style={LoginStyles.text}>Hotel-1</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => handleSubmit() }
      />

      <TouchableOpacity style={LoginStyles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={LoginStyles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      
      <SocialButtons
        googleButtonViewStyle= {LoginStyles.googleSignInBackground} 
        googleLogoStyle= {LoginStyles.googleSignInBackground}
        googleTextStyle= {LoginStyles.googleSignInText}
      
      />
      

      <TouchableOpacity
        style={LoginStyles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}
        >
        <Text style={LoginStyles.navButtonText}>
          Don't have an acount? Create here
          
        </Text>
      </TouchableOpacity>
    </View>
    </DismissKeyboard>
  );
};

export default LoginScreen;

