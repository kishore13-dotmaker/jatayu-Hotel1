import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../Input/FormInput';
import FormButton from '../Buttons/FormButton';
import DismissKeyboard from '../../utils/DismissKeyboard';
import LoginStyles from './LoginStyles';
// import { AuthContext } from '../../navigation/AuthProviders';
import SocialButtons  from "../Buttons/SocialButtons";



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const {login} = useContext(AuthContext);

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
        onPress={() => navigation.navigate('Home')}
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

