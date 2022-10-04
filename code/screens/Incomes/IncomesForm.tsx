import {Platform,  StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { Input } from '@rneui/themed';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { addIncomes, incomesTypesList } from '../../Services/ApiService';
import { CheckBox } from '@rneui/base';
import { RadioButton } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


export default function IncomesForm({ navigation }: RootTabScreenProps<'Incomes'>) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [formData,setFormData] = useState<any>({});
  const [loadingData,setLoadingData] = useState(false);
  const [incomesTypeList,setIncomesTypeList] = useState([]);
  const onChangeInput = (value:any,name:any)=>{
    setFormData({...formData,[name]:value});
  }
  useEffect(() => {
    async function loaddata() {
      let data = await incomesTypesList()
      setIncomesTypeList(data.data)
      setLoadingData(true)
      if(data.data.length>0){
        onChangeInput(data.data[0].value,'type_id')

      }
    }
    if(!loadingData){
        loaddata();
    }

  },[loadingData]);
  return (
     <View style={styles.container}>
      <Input placeholder='nombre' value={formData?.name} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'name')
        }}></Input>
      <Input placeholder='monto'value={formData?.amount} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'amount')
        }}></Input>
      <RadioButton.Group onValueChange={value => onChangeInput(value,'type_id')} value={formData?.type_id}>      
      {
        incomesTypeList.map((item:any)=>{
          return (<RadioButton.Item label={item.name} value={item.value} />)
        })
      }
      </RadioButton.Group>
      <Button
            
            withIcon={false} 
            onPress={async ()=>{
              let resp = await addIncomes(formData);
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