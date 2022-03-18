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
  const handleSubmit = () => { 
    fetch('https://hardeepwork.000webhostapp.com/react/register.php', {
			method: 'POST',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				firstName: setFirstName,
				lastName: setLastName,
				email: setEmail,
        password: setPassword,
        confirmPassword: setConfirmPassword,
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
				alert(responseJson);
			})
			.catch((error)=>{
				console.error(error);
			});
}
 
  return (
    <DismissKeyboard>
    <View style={SignUpStyles.container}>
      <Text style={SignUpStyles.text}>Signup</Text>
      <FormInput onSubmit={handleSubmit}
        labelValue={firstName}
        onChangeText={(firstName) => setFirstName(firstName)}
        placeholderText="First Name"
        iconType="pencil"
      />
      
      <FormInput onSubmit={handleSubmit}
        labelValue={lastName}
        onChangeText={(lastName) => setLastName(lastName)}
        placeholderText="Last Name"
        iconType="pencil"
      />

      <FormInput onSubmit={handleSubmit}
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user-o"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput onSubmit={handleSubmit}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput onSubmit={handleSubmit}
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => handleSubmit }
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

