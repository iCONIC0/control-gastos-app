import {  FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, TextProps } from "react-native";
import { globalStyle } from "../utils/GlobalStyles";

type ButtonProps = {
    onPress: () => void;
    type: "Primary" | "Secondary" | "Alternate" ;
    size?: "sm" | "normal" | "big";
    title?: string;
    containerStyle?: any;
    textStyle?: any;
    withIcon?: boolean;
    iconName?: string;
    disabled?: boolean;
}

export function Button(props:ButtonProps) {
    let btnColor = props.disabled 
        ? globalStyle.baseButtonStylePrimaryDisabled 
        : globalStyle.baseButtonStylePrimary;
    if(props.type==="Secondary"){
        btnColor=props.disabled ? globalStyle.baseButtonStyleSecondaryDisabled :globalStyle.baseButtonStyleSecondary;
    }else if(props.type=="Alternate"){
        btnColor=props.disabled ? globalStyle.baseButtonStyleAlternateDisabled :globalStyle.baseButtonStyleAlternate;
    }
    
    let btnStyle = props.containerStyle 
        ? {...btnColor, ...props.containerStyle} 
        : btnColor;
    let textStyle = props.textStyle ? {...globalStyle.baseButtonTextStyle, ...props.textStyle} : globalStyle.baseButtonTextStyle;
    let onPress = props.onPress ? props.onPress : ()=>{console.log('Asing press')};

    btnStyle = props.disabled ? {...btnStyle, opacity:0.3} : btnStyle;
    return (
        <Pressable style={btnStyle} onPress={props.disabled ? null : onPress}>
            {props.title!=null ? <Text style={textStyle}>{props.title}</Text> : null}
            {props.withIcon ? <FontAwesome name={props.iconName ? props.iconName :"link"} size={24} color="#ffffff" /> : null}
        </Pressable>
    );
}
