import {Platform,  ScrollView,  StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {  View,Text } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { Input, ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { addExpensesType, addIncomes, addIncomesType, expensesTypesList, incomesTypesList } from '../../Services/ApiService';
import { RadioButton } from 'react-native-paper';
import { Switch } from "@rneui/themed";
import { globalStyle } from '../../utils/GlobalStyles';


export default function ExpensesTypesForm({ navigation }: RootTabScreenProps<'Incomes'>) {
  const [formData,setFormData] = useState<any>({});
  const [loadingData,setLoadingData] = useState(false);
  const [typeList,setTypeList] = useState([]);

  const onChangeInput = (value:any,name:any)=>{
    setFormData({...formData,[name]:value});
  }
  useEffect(() => {
    async function loaddata() {
      let data = await expensesTypesList()
      if(data.status){
        setTypeList(data.data)
      }
      setLoadingData(true)
    }
    if(!loadingData){
        loaddata();
    }

  },[loadingData]);
  return (
     <View style={styles.container}>
      <TextInput placeholder='Nombre' value={formData?.name} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'name')
        }} style={globalStyle.baseTextInputStyle} placeholderTextColor={'#000'}></TextInput>
      <TextInput placeholder='Descripcion'value={formData?.description} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'description')
        }} style={globalStyle.baseTextInputStyle} placeholderTextColor={'#000'}></TextInput>
      <Button
            withIcon={false} 
            onPress={async ()=>{
              let resp = await addExpensesType(formData);
              if (resp.status) {
                setFormData({});
                setLoadingData(false);
              }
            }}
            type="Primary"
            textStyle={{color:"#fff"}}
            title='Añadir'
            containerStyle={{
                height:45,
                width:"50%",
                marginBottom:10
            }}
        /> 
        <ScrollView style={{ 
            backgroundColor: "white", 
            flex: 1,
        }}>{
            (typeList ?? []).map((l:any, i:any) => (
                <ListItem key={i} bottomDivider containerStyle={{minWidth:'98%',margin:0,padding:0}}>
                <ListItem.Content style={{borderColor:'#f8f8f8',backgroundColor:"#f8f8f8",borderWidth:2,borderRadius:10,padding:10}}>
                    <ListItem.Title >{l.name}</ListItem.Title>
                    <ListItem.Subtitle style={{color:"#a3a3a3"}}>{l.description}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            ))
            }
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff",
    paddingTop:25,
    paddingHorizontal:10
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
