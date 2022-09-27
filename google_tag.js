import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import Particle_Background from './starbg';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Google_Tag(props){
    const [color,setColor] = useState('#3275A6')
    return(
        <View style={{backgroundColor:color,borderRadius:10}}>
        <div style={{float:'left',width:240,height:220,fontWeight:'bold',color:'white',alignContent:'center',alignItems:'center'}} >
            <a target={'_parent'}  style={{marginLeft:'80px',marginBottom :'190px'}} href={props.link}><p style={{'color':'white'}}>{props.val}</p></a><br></br>
            <p><button style={{'border':'none',backgroundColor:"#3275A6"}}onClick={
                props.clickfunction
            }>{props.bn}</button></p>
        </div>
    </View>
    )
}