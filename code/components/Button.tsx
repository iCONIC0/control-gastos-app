import {  FontAwesome } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, Text, TextProps } from "react-native";
import { globalStyle } from "../utils/GlobalStyles";

type ButtonProps = {
    onPress: () => void;
    type: "Primary" | "Secondary" | "Alternate" ;
    outlined?: boolean;
    size?: "sm" | "normal" | "big";
    title?: string;
    containerStyle?: any;
    textStyle?: any;
    withIcon?: boolean;
    iconName?: string;
    disabled?: boolean;
    typeIcon?: 'material' | 'material-community' | 'simple-line-icon' | 'zocial' | 'font-awesome' | 'octicon' | 'ionicon' | 'foundation' | 'evilicon' | 'entypo' | 'antdesign' | 'font-awesome-5' | string;
}

export function Button(props:ButtonProps) {
    let  keyBase = 'baseButtonStyle'+(props.type || "Primary") + (props.outlined ? "Outlined" : "");
    let btnColor = props.disabled 
        ? globalStyle.baseButtonStylePrimaryDisabled 
        : globalStyle[keyBase];
    if(props.type==="Secondary"){
        btnColor=props.disabled ? globalStyle.baseButtonStyleSecondaryDisabled :globalStyle[keyBase];
    }else if(props.type=="Alternate"){
        btnColor=props.disabled ? globalStyle.baseButtonStyleAlternateDisabled :globalStyle[keyBase];
    }
    
    let btnStyle = props.containerStyle 
        ? {...btnColor, ...props.containerStyle} 
        : btnColor;
    let textStyle = props.textStyle ? {...globalStyle.baseButtonTextStyle, ...props.textStyle} : globalStyle.baseButtonTextStyle;
    let onPress = props.onPress ? props.onPress : ()=>{
        console.log("Button pressed");
    };

    btnStyle = props.disabled ? {...btnStyle, opacity:0.3} : btnStyle;
    return (
        <Pressable style={btnStyle} onPress={props.disabled ? null : onPress}>
            {props.title!=null ? <Text style={textStyle}>{props.title}</Text> : null}
            {props.withIcon ? <Icon name={props.iconName ? props.iconName :"link"} size={24} color="#ffffff" type={props.typeIcon || 'FontAwesome'} /> : null}
        </Pressable>
    );
}
