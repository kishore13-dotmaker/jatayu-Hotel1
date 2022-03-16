import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../Input/FormInput';
import FormButton from '../Buttons/FormButton';
import DismissKeyboard from '../../utils/DismissKeyboard';
import SignUpStyles from './SignUpStyles';
// import { AuthContext } from '../../navigation/AuthProviders';
import SocialButtons  from "../Buttons/SocialButtons";




const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName , setFirstName] = useState();
  const [lastName , setLastName] = useState();


  // const {login} = useContext(AuthContext);

  return (
    <DismissKeyboard>
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.text}>Signup</Text>
      <FormInput
        labelValue={firstName}
        onChangeText={(userPassword) => setFirstName(userPassword)}
        placeholderText="First Name"
        iconType="pencil"
      />
      
      <FormInput
        labelValue={lastName}
        onChangeText={(userPassword) => setLastName(userPassword)}
        placeholderText="Last Name"
        iconType="pencil"
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user-o"
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

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => navigation.navigate('Home')}
      />
    

      <SocialButtons 
        screen = {"signup"}
        facebookButtonText= { "Continue with Facebook" }
        googleButtonText= { "Continue with Google" }
        googleButtonViewStyle= { SignUpStyles.googleSignInBackground} 
        googleLogoStyle= {SignUpStyles.googleSignInBackground}
        googleTextStyle= {SignUpStyles.googleSignInText}
      
      />
    
      
      

      <TouchableOpacity
        style={SignUpStyles.forgotButton}
         onPress={() => navigation.navigate('Login')}
        >
        <Text style={SignUpStyles.navButtonText}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
    </DismissKeyboard>
  );
};

export default SignUpScreen;

