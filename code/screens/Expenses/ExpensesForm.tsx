import {Platform,  StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {  View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { Input } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { addExpense,  expensesTypesList, } from '../../Services/ApiService';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'


export default function ExpensesForm({ navigation }: RootTabScreenProps<'Expenses'>) {
  const [formData,setFormData] = useState<any>({});
  const [loadingData,setLoadingData] = useState(false);
  const [expensesTypeList,setExpensesTypeList] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

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
  const onChange = (event:any, selectedDate:any) => {
    setShow(false);
    setDate(selectedDate);

  };

  return (
     <View style={styles.container}>
      <Button  title="Open" onPress={() => setShow(true)} type={'Primary'} />
      <DatePicker
        modal
        open={show}
        date={date}
        onConfirm={(date) => {
          setShow(false)
          setDate(date)
        }}
        onCancel={() => {
          setShow(false)
        }}
      />

      <Input placeholder='nombre' value={formData?.name} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'name')
        }}></Input>
      <Input placeholder='monto'value={formData?.amount} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase().replace(/[^0-9]/g, ''),'amount')
        }} keyboardType="numeric"
        ></Input>
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
