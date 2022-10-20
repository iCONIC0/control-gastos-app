import {Platform,  StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {  View,Text } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { Input } from '@rneui/themed';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { addExpense,  expensesTypesList, } from '../../Services/ApiService';
import { RadioButton } from 'react-native-paper';
import { maskInput } from '../../utils/Utils';
import { Switch } from "@rneui/themed";

export default function ExpensesForm({ navigation }: RootTabScreenProps<'Expenses'>) {
  const [formData,setFormData] = useState<any>({});
  const [loadingData,setLoadingData] = useState(false);
  const [expensesTypeList,setExpensesTypeList] = useState([]);
  const [date, setDate] = useState<any>(new Date())
  const [open, setOpen] = useState(false)

  const onChangeInput = (value:any,name:any)=>{
    setFormData({...formData,[name]:value});
  }
  useEffect(() => {
    async function loaddata() {
      let data = await expensesTypesList()
      if(data.status){
        setExpensesTypeList(data.data??[])
        if(data.data.length>0){
          onChangeInput(data.data[0].value,'type_id')
        }
      }
      setLoadingData(true)
 
    }
    if(!loadingData){
        loaddata();
    }

  },[loadingData]);

  return (
     <View style={styles.container}>
      <Input placeholder='Fecha DD/MM/YYYY' value={formData?.date} onChangeText={(text)=>{
          onChangeInput(maskInput(text.toLowerCase(),'DD/MM/YYYY','/'),'date')
        }} keyboardType="numeric"></Input>
      <Input placeholder='nombre' value={formData?.name} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'name')
        }}></Input>
      <Input placeholder='monto'value={formData?.amount} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase().replace(/[^0-9]/g, ''),'amount')
        }} keyboardType="numeric"
        ></Input>
      <View style={{flexDirection:"row",backgroundColor:"#fff",justifyContent:'center',alignContent:'center',alignItems: 'center',width:'100%',paddingTop:5}}>
        <Text darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{textAlign:"left" }}>Ingreso Familiar </Text><Switch
          
          value={formData?.family}
          onValueChange={(value) => onChangeInput(!formData?.family,'family')}
        />
      </View>
      <RadioButton.Group
        onValueChange={value => onChangeInput(value,'type_id')} value={formData?.type_id}>      
      {expensesTypeList.map((item:any)=>{
          return (<RadioButton.Item label={item.name} value={item.value} key={item.value}/>)
        })
      }
      </RadioButton.Group>

      <Button
            
            withIcon={false} 
            onPress={async ()=>{
              let resp = await addExpense(formData);
              if(resp.status){
                navigation.goBack()
              }
            }}
            type="Primary" 
            title='Guardar'
            containerStyle={{
                marginTop:20,
                height:50,
                width:"50%",
            }}
        /> 

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff"
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
