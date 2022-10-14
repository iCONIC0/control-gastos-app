import React, { useEffect, useState } from 'react';
import { Text, View } from '../../components/Themed';
import {StyleSheet} from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../Providers/AuthContext';
import { profile } from '../../Services/ApiService';

export default function ProfileScreen({ navigation }:any) {
    const [loadingData,setLoadingData] = useState(false);
    const [profileData,setProfileData] = useState<any>({});
    const {signOut} = useAuth();
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
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Text style={styles.title}>{profileData['name']}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="#eee" />
            <Button 
                onPress={async ()=>{
                    await signOut();
                }} 
                title="Cerrar Sesion" 
                type='Secondary' 
                containerStyle={{
                    height:70,
                    width:"70%",
                    marginBottom:10
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
