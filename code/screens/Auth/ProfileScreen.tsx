import React, { useEffect, useState } from 'react';
import { Text, View } from '../../components/Themed';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet,TextInput, TouchableWithoutFeedback} from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../Providers/AuthContext';
import { createFamily, leaveFamily, profile, updateProfile } from '../../Services/ApiService';
import { Avatar, Icon, ListItem, Overlay } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";
import { globalStyle } from '../../utils/GlobalStyles';

export default function ProfileScreen({ navigation }:any) {
    const [loadingData,setLoadingData] = useState(false);
    const [profileData,setProfileData] = useState<any>({});
    const [formData,setFormData] = useState<any>({});
    const [newFamilyName,setNewFamilyName] = useState("");
    const [familyShow,setFamilyShow] = useState(false);
    const {signOut} = useAuth();
    const optionList = [
      // {
      //   name: 'Configuracion',
      //   subtitle: 'Preferencias de cuenta'
      // },
      // {
      //   name: 'Ayuda',
      //   subtitle: 'Informacion adicional dedl uso de la app.'
      // },
      {
        name: 'Grupo Familiar',
        subtitle: 'Administra el grupo familiar o crea uno nuevo.',
        action:()=>setFamilyShow(true)
      },
    ];

    useEffect(() => {
        async function loadProfile() {
          let data = await profile()
          setProfileData(data.data)
          setLoadingData(true)
        }
        if(!loadingData){
            loadProfile();
        }

      },[loadingData]);

    const pickImage = async () => {
      if (Constants?.platform?.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled && result.uri) {
        let type = result.uri.split('.').pop() || 'jpg';
        let fmd = new FormData();
        fmd.append('profile_image', {
          uri:result.uri,
          name:result.fileName,
          type
        });

        let res = await updateProfile(fmd);
        if(res.status){
          setLoadingData(false)
        }
      }
    };
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#fff"}}>
              <Avatar size={150} rounded source={{uri:profileData['profile_image'] || require('../../assets/images/icon.png')}}/>
              <Button 
                onPress={pickImage}
                type="Primary"
                textStyle={{color:"#fff"}}
                iconName="edit"
                withIcon={true}
                typeIcon="material"
                containerStyle={{
                  position:'absolute',
                  right:5,
                  bottom:5,
                  height:40,
                  width:40,
                  borderRadius:20,
                }}
              />
            </View>
            <Text style={styles.title}>{profileData['name']}</Text>
            <Text style={styles.subtitle}>{profileData['rol'] || ''}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="#eee" />
            <Overlay isVisible={familyShow}  onBackdropPress={()=>setFamilyShow(!familyShow)} overlayStyle={{borderRadius:10,maxHeight:'35%',marginHorizontal:10}}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TouchableWithoutFeedback>
                  {profileData['family'] ? <View style={{minWidth:'90%',backgroundColor:'#fff'}}>
                  <Button
                    onPress={()=>setFamilyShow(!familyShow)}
                    type="Primary"
                    iconName="close"
                    typeIcon="material-community"
                    withIcon={true}
                    containerStyle={{
                      position:'absolute',
                      right:-20,
                      top:-20,
                      height:40,
                      width:40,
                      borderRadius:20,
                    }}
                  /><Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'#000',paddingBottom:20}}>Grupo Familiar</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'#a5a5a5',paddingBottom:20}}>Eres {
                      profileData['family']['user_admin_id']==profileData['id'] ? 'Administrador' : 'Miembro'
                    } de un grupo familiar.</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',color:'#050505',paddingBottom:20}}>{ profileData['family']['name'] }</Text>
                    <Button
                      onPress={async ()=>{
                        Alert.alert(
                          "Salir del grupo familiar",
                          "¿Estas seguro de salir del grupo familiar?",
                          [
                            {
                              text: "Cancelar",
                              style: "cancel"
                            },
                            { text: "OK", onPress: async () => {
                              let resp = await leaveFamily();
                              if(resp.status){
                                setFamilyShow(false)
                                setLoadingData(false)
                              }
                              
                            }}
                          ]
                        )
                      }}
                      type="Primary"
                      containerStyle={{
                        marginHorizontal:10,
                        borderRadius:10,
                        height:50,
                      }}
                      textStyle={{color:"#fff"}}
                      title="Abandonar Grupo Familiar"
                    />
                  </View> : <View style={{minWidth:'90%',backgroundColor:'#fff'}}>
                    <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'#000',paddingBottom:20}}>Crear Grupo Familiar</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'#a5a5a5',paddingBottom:20}}>Seras el administrador de tu grupo familiar,
                      podras invitar a otros usuarios que no tengan grupo familar,
                      y solo podras tener un grupo familiar.
                    </Text>
                    <TextInput value={newFamilyName} onChangeText={(text)=>{setNewFamilyName(text)}} placeholderTextColor="#333333" style={globalStyle.baseTextInputStyle}/>
                    <Button
                      onPress={async ()=>{
                        if(newFamilyName.length > 0){
                          let resp = await createFamily({name:newFamilyName});
                          if(resp.status){
                            setFamilyShow(false)
                            setLoadingData(false)
                            Alert.alert('Grupo Familiar','Grupo Familiar creado con exito.')
                          }
                        }
                      }}
                      type="Primary"
                      containerStyle={{
                        marginVertical:10,
                        marginHorizontal:10,
                        borderRadius:10,
                        height:50,
                      }}
                      textStyle={{color:"#fff"}}
                      title="Crear Grupo Familiar"
                    />
                  </View>} 
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Overlay>
            <ScrollView style={{ 
              backgroundColor: "white", 
              flex: 1,
              marginHorizontal:10,
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
            }}>{
                (optionList ?? []).map((l:any, i:any) => (
                  <ListItem key={i} containerStyle={{minWidth:'90%',margin:0,padding:5}} onPress ={l.action}>
                    <ListItem.Content style={{borderColor:'#f8f8f8',backgroundColor:"#f8f8f8",borderWidth:2,borderRadius:10,padding:15}}>
                      <ListItem.Title>{l.name}</ListItem.Title>
                      <ListItem.Subtitle style={{color:"#a3a3a3"}}>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              }
            </ScrollView>
            <Button 
                onPress={async ()=>{
                    await signOut();
                }} 
                title="Cerrar Sesion" 
                type='Secondary'
                outlined
                containerStyle={{
                    height:60,
                    width:"70%",
                    marginBottom:25
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"rgba(255,255,255,1)"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#000",
    paddingTop:10
  },
  subtitle: {
    fontSize: 16,
    color:"#a1a1a1",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
