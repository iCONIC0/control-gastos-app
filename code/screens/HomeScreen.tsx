import { StatusBar } from 'expo-status-bar';
import React, {  useCallback, useEffect, useState } from 'react';
import { Platform,ScrollView, RefreshControl,StyleSheet,Text } from 'react-native';
import {  View } from '../components/Themed';
import CardView from '../components/CardView';
import { home } from '../Services/ApiService';

export default function HomeScreen({ navigation }: any) {
    const [loadingData, setLoadingData] = useState(false);
    const [data, setData] = useState<any>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        async function loaddata() {
          let data = await home()
          console.log(data)

          setData(data.data)
          console.log(data.data)
          setLoadingData(true)
        }
        if(!loadingData ){
            loaddata();
        }
  
      },[loadingData]);
      const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await home()
        console.log(data)
        setData(data.data)

        setRefreshing(false);
    }, []);
  return (
    <View style={styles.container}>
        <View style={{flexDirection:"column",backgroundColor:"#ffffff"}}>
        {
            ( data?? []).map((item:any,i:any)=><CardView key={i} item={item} style={{marginTop:20 }}/>)
        }
        </View>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor:"#ffffff",
    padding:20,
    itemAlign:"center",
    minWidth:"100%",
    minHeight:"100%"
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
