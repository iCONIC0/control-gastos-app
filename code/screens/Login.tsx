import { StatusBar } from 'expo-status-bar';
import React, {  useState } from 'react';
import {Alert, Image, Platform, StyleSheet, TextInput } from 'react-native';
import { Button } from '../components/Button';
import { Text, View } from '../components/Themed';
import { globalStyle } from '../utils/GlobalStyles';
import GlobalAxios from '../utils/GlobalAxios';
import { resolverApiErrors } from '../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { useAuth } from '../Providers/AuthContext';
import { logIn } from '../Services/ApiService';

export default function LoginScreen({ navigation }: any) {
  const [formData,setFormData] = useState<any>({});
  const {login} = useAuth()

  const onChangeInput = (value:any,name:any)=>{
    setFormData({...formData,[name]:value});
  }
  async function logInFunction (){
    await login(formData);
  }
  return (
    <View style={styles.container}>
        {/* <Image source={require('../assets/images/pets.png')} style={{width:"70%",height:"25%"}} resizeMode="cover"/> */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput value={formData?.email} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'email')
        }} placeholderTextColor="#622f2e" style={globalStyle.baseTextInputStyle} textContentType="emailAddress" keyboardType="email-address"/>
        <TextInput value={formData?.password} onChangeText={(text)=>{
          onChangeInput(text,'password')
        }} placeholderTextColor="#622f2e" style={globalStyle.baseTextInputStyle} secureTextEntry/>
        <Button 
            withIcon={true} 
            onPress={logInFunction}
            type="Primary" 
            title='Ingresar'
            containerStyle={{
                height:70,
                width:"70%",
                marginBottom:10
            }}
            iconName={'arrow-right'}/>
        <Button 
            withIcon={false} 
            onPress={()=>{navigation.navigate('Root',{params:{userAccount:"invited"}} )}}
            type="Primary" 
            title='Continuar como invitado'
            containerStyle={{
                height:50,
                width:"50%",
            }}
        />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff",
    padding:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '80%',
  },
  baseTextInputStyle:{
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    width:"80%",
    height:50,
    paddingHorizontal: 3,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom:10,
    color:"#622f2e",
    borderWidth:1,
    borderColor:"#6be1c1"
},
});
