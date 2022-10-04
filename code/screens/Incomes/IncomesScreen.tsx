import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { ListItem,Avatar,Chip  } from "@rneui/themed";
import { useState } from 'react';
import { useEffect } from 'react';
import { incomes } from '../../Services/ApiService';
import ExpandedArea from '../../components/ExpandedArea';
import { formatDates, formatMoney } from '../../utils/Utils';
import { FAB } from '@rneui/base';


export default function IncomesScreen({ navigation }: RootTabScreenProps<'Incomes'>) {
  const [items,setItems] = useState<any>();
  const [loadingData,setLoadingData] = useState(false);
  useEffect(() => {
      async function loaddata() {
        let data = await incomes()
        setItems(data.data)
        setLoadingData(true)
      }
      if(!loadingData){
          loaddata();
      }

    },[loadingData]);
  const expandList = (i:any) =>{
    let itemList = [...items];
    itemList[i]['expand'] = !itemList[i]['expand']
    setItems(itemList)
  }
  return (
    <View style={{height:"100%"}}>
      <Text style={styles.title}>Egresos/Gastos</Text>
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>

      {
        (items ?? []).map((l:any, i:any) => (
          <ListItem key={i} bottomDivider onPress={()=>{
            expandList(i)
          }}>
            <ListItem.Content>
              <ListItem.Title >{l.name}({formatDates(l.created_at)})</ListItem.Title>
              <ListItem.Subtitle>{l.expand ? '' : formatMoney(l.amount) }</ListItem.Subtitle>
              { l.expand ? <ExpandedArea item={l}/> : null }
            </ListItem.Content>
          </ListItem>
        ))
      }
      </ScrollView>
      <FAB
        placement="right"
        onPress={()=>{navigation.navigate('IncomesAdd')}}
        icon={{ name: 'add', color: 'white' }}
        color="black"
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
    textAlign:"center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
