import { Chip } from '@rneui/base';
import {  FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { formatDates, formatMoney } from '../utils/Utils';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ExpandedArea({item}:any) {

  return (
    <View  lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        <View style={{flexDirection:"row",backgroundColor:"#fff",justifyContent:'space-between',alignContent:'space-around',bottom: 0,width:'100%'}}>
            <Chip title={<Text  darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{fontSize:25}}>{formatMoney(item.amount)}</Text>}   type="outline" icon={{
              name: 'coins',
              type: 'font-awesome-5',
              size: 25,
            }}/>
            <Text darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{textAlign:"left" }}>Fecha: {formatDates(item.created_at)}</Text>
        </View>
        <View style={{flexDirection:"row",backgroundColor:"#fff", marginTop:"5%"}}>
            {
               (item.type ? [item.type] : []).map((t)=>{
                    return <Chip key={t} title={<Text  lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)" >{t.name}</Text>}/>
                })
            }
        </View>
    </View>
  );
}