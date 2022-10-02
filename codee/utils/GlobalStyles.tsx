import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

  /**
   * primary #ffffff
   * secondary #ff5555
   * alternate #6be1c1
   * letters and borders #622f2e
   */
export const  globalStyle =StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: '100%',
        padding:5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#622f2e',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    description: {
        fontSize:20,
        marginVertical:20,
        marginHorizontal:40,
        paddingBottom:40,
        color: '#622f2e'

    },
    baseButtonTextStyle : {
        paddingRight:10,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#ffffff',
        textAlign: 'center',
    },
    baseButtonStylePrimary :  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: '#ff5555',
    },
    baseButtonStyleSecondary :  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: '#6be1c1',
    },
    baseButtonStyleAlternate :  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: '#622f2e',
    },
    baseButtonStylePrimaryDisabled :  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 85, 85,0.5)',
    },
    baseButtonStyleSecondaryDisabled :  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: 'rgba(107, 225, 193,0.5)',
    },
    baseButtonStyleAlternateDisabled :  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: 'rgba(98, 47, 46,0.5)',
    },
    baseTextInputStyle:{
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        width:"80%",
        height:50,
        paddingHorizontal: 3,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginBottom:10,
        color:"#622f2e",
        borderWidth:1,
        borderColor:"#6be1c1"
    },
    baseSelectStyle:{
        minWidth: '100%',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginBottom:10,
        color:"#622f2e",
        borderWidth:1,
        borderColor:"#6be1c1",
        paddingLeft:10,
        minHeight:50,
    }
})
export const themeBase = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };