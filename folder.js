import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import Particle_Background from './starbg';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Folder(props){
    const [color,setColor] = useState('#3275A6')
    return(
        <SafeAreaProvider style={{backgroundColor:color,borderRadius:10}}>
        <div style={{float:'left',width:240,height:100,fontWeight:'bold',color:'white'}} onMouseEnter={()=>{setColor("#FFD700")}} onMouseLeave={()=>{setColor('#3275A6')}}>
            <TouchableOpacity onPress={props.task}>
                <h3>{props.data}</h3>
            </TouchableOpacity>
        </div>
    </SafeAreaProvider>
    )
}