import { Chip } from '@rneui/base';
import {  FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { formatDates, formatMoney } from '../utils/Utils';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ExpandedArea({item}:any) {

  return (
    <View  lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        <View style={{flexDirection:"row",backgroundColor:"#fff",justifyContent:'space-between' }}>
            <Chip title={<Text  lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">{formatMoney(item.amount)}</Text>} />
            <Text darkColor="rgba(0,0,0,0.8)" lightColor="rgba(255,255,255,0.8)" style={{textAlign:"left"}}>Fecha: {formatDates(item.created_at)}</Text>
        </View>
        <View style={{flexDirection:"row",backgroundColor:"#fff"}}>
            {
                [item.type].map((t)=>{
                    return <Chip  title={<Text  lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)" >{t.name}</Text>} />
                })
            }
        </View>
    </View>
  );
}