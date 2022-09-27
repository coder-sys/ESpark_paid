import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Particle_Background from './starbg';
export default function Frontpage(props) {
  return (
    <View>
                  <Particle_Background />

      <div style={{display:'flex',flexWrap:'wrap',flexDirection:'row',padding:'40px'}}>

        <div style={{backgroundColor:'#3275a6',width:'400px',height:'200px',marginBottom:'30px',borderRadius:'10px'}}>
          <div style={{marginTop:'90px',marginLeft:'120px',fontFamily:'serif'}}><h1><i>E spark</i><sub style={{'fontSize':'11px'}}><i>Learning is limitless</i></sub></h1></div>
        </div>

    

        <div>

            <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={()=>{
                props.navigation.navigate('SignIn')
            }}>Sign in</button>
            </div>

            <div>
               <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={()=>{
                props.navigation.navigate('Login')
            }}>Logn in</button>
            </div>
            </div>

    </View>
  );
}
