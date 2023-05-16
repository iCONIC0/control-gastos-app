import {KeyboardAvoidingView, Platform,  StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {  View,Text } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { Input } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { addIncomes, incomesTypesList } from '../../Services/ApiService';
import { RadioButton } from 'react-native-paper';
import { Switch } from "@rneui/themed";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';


export default function IncomesForm({ navigation }: RootTabScreenProps<'Incomes'>) {
  const [formData,setFormData] = useState<any>({});
  const [loadingData,setLoadingData] = useState(false);
  const [incomesTypeList,setIncomesTypeList] = useState([]);
  const onChangeInput = (value:any,name:any)=>{
    setFormData({...formData,[name]:value});
  }
  useEffect(() => {
    async function loaddata() {
      let data = await incomesTypesList()
      if(data.status){
        setIncomesTypeList(data.data)
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
      <TouchableWithoutFeedback>
      <View style={styles.container}>
      <Input placeholder='nombre' value={formData?.name} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase(),'name')
        }}></Input>
      <Input placeholder='monto'value={formData?.amount} onChangeText={(text)=>{
          onChangeInput(text.toLowerCase().replace(/[^0-9]/g, ''),'amount')
        }} keyboardType="numeric"
        ></Input>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={incomesTypeList}
        search
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={formData?.type_id}
        onChange={value => onChangeInput(value,'type_id')}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="check" size={20} />
        )}
      />
      <View style={{flexDirection:"row",backgroundColor:"#fff",justifyContent:'center',alignContent:'center',alignItems: 'center',width:'100%',paddingTop:5}}>
        <Text darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{textAlign:"left" }}>Ingreso Familiar </Text><Switch
          
          value={formData?.family}
          onValueChange={(value) => onChangeInput(!formData?.family,'family')}
        />
      </View>
      <Button
            
            withIcon={false} 
            onPress={async ()=>{
              let resp = await addIncomes(formData);
              if(resp.status){
                navigation.goBack()
              }
            }}
            type="Primary"
            textStyle={{color:"#fff"}}
            title='Guardar'
            containerStyle={{
                height:50,
                width:"50%",
                marginTop:20,
            }}
        /> 

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff",
    paddingHorizontal:10,
    // justifyContent: "space-around"

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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    minWidth: '100%'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
