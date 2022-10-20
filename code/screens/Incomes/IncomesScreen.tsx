import { ScrollView,RefreshControl, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { ListItem,Avatar,Chip,Button  } from "@rneui/themed";
import { SetStateAction, useCallback, useState } from 'react';
import { useEffect } from 'react';
import { incomes, incomesFilters } from '../../Services/ApiService';
import ExpandedArea from '../../components/ExpandedArea';
import { formatDates, formatMoney } from '../../utils/Utils';
import { FAB } from '@rneui/base';
import CardView from '../../components/CardView';
import * as _ from 'lodash';
import { ButtonGroup } from "@rneui/themed";


export default function IncomesScreen({ navigation }: RootTabScreenProps<'Incomes'>) {
  const [filters,setFilters] = useState<any>();
  const [selectedFilters,setSelectedFilters] = useState<any>();
  const [items,setItems] = useState<any>();
  const [item,setItem] = useState<any>();
  const [loadingData,setLoadingData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [familyIncomes, setFamilyIncomes] = useState(0);
  useEffect(() => {
      async function loadFilter() {
        let data = await incomesFilters()
        setFilters(data.data)
        setLoadingData(true)
      }
      
      if(!loadingData){
          loadFilter();
      }

  },[loadingData]);
  useEffect(() => {
      async function loaddata() {
        let data = await incomes({...selectedFilters,family:familyIncomes})
        setItems(data.data.incomes ?? [])
        setItem(data.data.extra ?? {})
        setLoadingData(true)
      }
      setLoadingData(false)

      loaddata();

  },[filters,selectedFilters,familyIncomes]);
  // const onRefresh = useCallback(async () => {
  //     setRefreshing(true);

  //     let data = await incomes({...selectedFilters,family:familyIncomes})
  //     setItems(data.data.incomes??[])
  //     setItem(data.data.extra ?? {})
  //     setRefreshing(false);
  // }, []);
  const expandList = (i:any) =>{
    let itemList = [...items];
    itemList[i]['expand'] = !itemList[i]['expand']
    setItems(itemList)
  }
  return (
    <View style={{height:"100%",backgroundColor:"rgba(255,255,255,1)"}}>
      <ButtonGroup
        buttons={['Tus Ingresos', 'Ingresos Familiares']}
        selectedIndex={familyIncomes}
        onPress={(value) => {
          setFamilyIncomes(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <View style={{width:'100%',alignItems:"center",padding:10,backgroundColor:"rgba(255,255,255,1)"}}>
        <CardView key={item} item={item}>
        </CardView>
        <ScrollView style={{ backgroundColor: "white", minWidth:"100%",paddingTop:10}} horizontal>
          {
            (filters ?? []).map((l:any, i:any) => (
              <Chip key={i} title={l} onPress={()=>{
                setSelectedFilters({month:l})
              }
              }></Chip>))
          }
        </ScrollView>
      </View>
      <ScrollView style={{ 
        backgroundColor: "white", 
        flex: 1,
        borderLeftColor:"rgba(0,0,0,.2)",
        borderRightColor:"rgba(0,0,0,.2)",
        borderTopColor:"rgba(0,0,0,.2)",
        borderBottomColor:"rgba(255,255,255,1)",
        borderWidth:1, 
        marginHorizontal:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
      }}
        // refreshControl={
        //   <RefreshControl
        //       refreshing={refreshing}
        //       onRefresh={onRefresh}
        //   />
        // }  
      >
      {
        (items ?? []).map((l:any, i:any) => (
          <ListItem key={i} bottomDivider onPress={()=>{
            expandList(i)
          }} containerStyle={{borderTopRightRadius:10,borderTopLeftRadius:10,backgroundColor:"transparent"}}>
            <ListItem.Content>
              <ListItem.Title >{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.expand ? '' :  
                <View style={{flexDirection:"row",backgroundColor:"#fff",justifyContent:'space-between',alignContent:'space-around',width:'100%',paddingTop:5}}>
                  <Text darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{textAlign:"left" }}>{formatMoney(l.amount)}</Text>
                  <Text darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{textAlign:"left" }}>Fecha: {formatDates(l.created_at)}</Text>
                </View>
              }</ListItem.Subtitle>
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
