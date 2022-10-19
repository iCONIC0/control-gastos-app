import React, { Dispatch, SetStateAction } from 'react';
import {  Image, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { RootTabScreenProps } from '../types';
import { globalStyle } from '../utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SliderPages(props:{
    setShowSlider:Dispatch<SetStateAction<boolean>>,
    pages:Array<any>
    haveCancelButton?:boolean
    withOutButtons?:boolean
    cancelAction:()=>void
}) {
    const {setShowSlider} = props;
    const [step, setStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(true);
    const {pages} = props;
    const {haveCancelButton=false} = props;
    const {withOutButtons=true} = props;
    const onNext = async (type:string) => {
        let current = step;
        if(type==='next' && current<pages.length-1){
            setStep(current+1);
            current++;
        }else if(type==='prev' && current>0){
            setStep(current-1);
            current--;
        }
        if(current<pages.length-1){
            setIsLastStep(false);
        }else {
            setIsLastStep(true);
        }
        if(current==0){
            setIsFirstStep(true);
        }else{
            setIsFirstStep(false);
        }
    }
    const selected = (pageId:number) => {
        setStep(pageId);

    }
    return (
        <View style={globalStyle.container}>
            { haveCancelButton ?
                <View style={{
                    width:"100%",
                    marginLeft:"10%",
                    marginTop:"1%",
                }}>
                    <Button 
                        withIcon={true} 
                        onPress={props.cancelAction}
                        type="Secondary" 
                        containerStyle={{
                            height:50,
                            width:50,
                        }}
                        iconName="close"/>
                </View>: null
            }
            <View style={{flex:1,margin:10}}>
                {pages && pages[step] && pages[step]['content'] ? pages[step]['content']   :null }
            </View>
            <View style={{
                flexDirection:"row",
                alignContent:"center",
                alignItems:"center",
                justifyContent: 'space-around',
                width:"100%",
            }}>
                {withOutButtons ? <Button 
                    withIcon={isFirstStep ? false :true } 
                    onPress={()=>onNext('prev')}
                    type="Primary" 
                    containerStyle={{
                        height:80,
                        width:100,
                    }}
                    disabled={isFirstStep}
                    iconName={isFirstStep ? '' :'chevron-left'}/> : null}
                { pages.map((page,index)=>{
                    return (
                        <Button 
                            key={page.id}
                            withIcon={page.id==pages[step]['id'] ? true : false}
                            onPress={()=>selected(page.id)}
                            type="Primary" 
                            containerStyle={{
                                width: 40,
                                height: 40,
                                padding: 10,
                                borderRadius: 20,
                                paddingVertical: 1,
                                paddingHorizontal: 3,
                            }}
                            iconName='circle-o'
                        />
                    );
                })}
                {withOutButtons ? <Button 
                    withIcon={true} 
                    onPress={()=> onNext('next')}
                    type="Primary" 
                    containerStyle={{
                        height:80,
                        width:100,
                    }}
                    iconName={isLastStep ? 'check' :'chevron-right'}/>: null}
            </View>
        </View>
    );
}

