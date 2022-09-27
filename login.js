
import { useLinkProps } from '@react-navigation/native';
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert } from 'react-native';
import Particle_Background from './starbg';

export default function Login(props){
    const [fname,setFname] = useState("")
    const [password,setPassword] = useState("")
    const [marginTop,setMargin] = useState(200)
    const [marginLeft,setMarginLeft] = useState(500)
    const [marginRight,setMarginRight] = useState(600)
    const [opacity,setOpacity] = useState(0.8)
    const [access,setAccess] = useState("denied")
    const [updated_,setUpdated] = useState(0)
    useEffect(async()=>{
      if (fname != ''){
      let api = await fetch(`http://localhost:8000/get_selected_plan/${fname}`)
      api = await api.json()
      setSelectedPlan(api.data)

      }
      
    },[updated_])
    return (
        <View >
                      <Particle_Background />

          <div style={{marginTop:marginTop,marginLeft:marginLeft,marginRight:marginRight,opacity:opacity,width:'40%'}} >
    
            <TextInput placeholder='first name' style={{padding:15,marginLeft:'100px',borderWidth:2,color:'black',backgroundColor:'white'}} onChangeText={(e)=>{setFname(e)}}/>
         
            <br></br>        <br></br>
            <br></br>
    
            <br></br>
            <input placeholder='password' type={'password'} style={{padding:15,marginLeft:100,borderWidth:2,color:'black'}} onChange={(e)=>(setPassword(e.target.value))}/>
            <br></br>
            <button style={{backgroundColor:"#3275A6",marginLeft:155,height:50,width:100,border:'none',borderRadius:10}} onClick={async()=>{
                  let selectedplan = await fetch(`http://localhost:8000/get_selected_plan/${fname}`)
                  selectedplan = await selectedplan.json()
                  selectedplan = selectedplan['data']
                  console.log(selectedplan)
               

                if(selectedplan == ''){
                  props.navigation.navigate('PlanSelection',{name:fname}) 
              }
                
                if(selectedplan == 'free'){
                  console.log('free trial ')
                  let api = await fetch(`http://localhost:8000/date_subtraction/${fname}`)
                  api = await api.json()
                  let days_differance = api.data
                  if (days_differance >= 30){
                    console.log('data')
                    let api_ = await fetch(`http://localhost:8000/set_disability_for_free_trial/${fname}`)
                    api_ = await api_.json()
                    props.navigation.navigate('PlanSelection',{name:fname})
                  }
                 else{
                  let api = await fetch(`http://localhost:8000/login/${fname}`)
                  api = await api.json()
                  if(api['data'] == "username not found"){
                    console.log('username not found')
                    alert("username not found")
                  }
                  if(password == api["data"]){
                    setAccess("Granted")
                    console.log(access)
                    props.navigation.navigate('HomePage',{name:fname})
                  }
                 }
                }
                
                 

              
              if(selectedplan == "paid"){
                console.log("paid version")
                let api = await fetch(`http://localhost:8000/date_subtraction_for_paid_version/${fname}`) 
                api = await api.json()
                let days_differance = api.data
                if (days_differance >= 31){
                  props.navigation.navigate('PlanSelection',{name:fname})
//                  let __api__ = await fetch(`http://localhost:8000/store_timestamp_for_paid_version/${fname}`)
//                  __api__ = await __api__.json()
//                  console.log(__api__)
                }
                else{
                  props.navigation.navigate('HomePage',{'name':fname})
                }
              }
        }}><Text>Log in (Triple click)</Text></button><br></br><br></br>

   
            </div>
            </View>
    )
}