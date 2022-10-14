import { Text, Card } from '@rneui/themed';
import { View } from './Themed';
import {  StyleSheet } from 'react-native';
import { formatMoney } from '../utils/Utils';

export default function CardView({item,style,children}:any) {

  if (!item) {
    return null;
  }
  return (
    <View style={[styles.container, style]} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)" >
      <Text style={styles.octubre2022}>{item.title}</Text>
      <View style={styles.loremIpsumRow}>
        <Text style={styles.loremIpsum}>{formatMoney(item.total)}</Text>
        <Text style={styles.ingresosTotales1}>ingresos totales {item.count}</Text>
      </View>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexWrap: "nowrap",
    overflow: "hidden",
    minWidth:"100%",
    backgroundColor: "rgba(255, 255, 255,1)",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: "rgba(0,0,0,0.2)",

  },
  loremIpsum: {
    // fontFamily: "roboto-regular",
    // color: "#121212",
    fontSize: 41,

  },
  ingresosTotales1: {
    textAlign: "right",
    flex: 1,
  },
  loremIpsumRow: {
    height: 49,
    flexDirection: "row",
    marginTop: 64,
    marginLeft: 6,
    backgroundColor: "rgba(255, 255, 255,1)",
    marginRight: 14
  },
  octubre2022: {
    // fontFamily: "roboto-regular",
    // color: "#121212",
    fontSize: 23,
    marginTop: 25,
    marginLeft: 12
  }
});