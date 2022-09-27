import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import Particle_Background from './starbg';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Folder from './folder';
import particlesConfig from './particlesConfig.json'
import Particles from 'react-tsparticles';

export default function HomePage(props) {
let fname = props.navigation.getParam('name')
useEffect(async()=>{
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
})
const [name,setName] = useState(fname)
const [folderfield,setFolderField] = useState('')
const [update,setUpdated] = useState(0)
const [folderdata,setFolderData] = useState([])
useEffect(async()=>{
  let api = await fetch(`http://localhost:8000/get_folders/${name}`)
  api = await api.json()
  console.log(api.data)
  setFolderData(api.data)
  console.log(folderdata)
console.log(true,name)
},[update])
  return (
    <SafeAreaProvider style={{backgroundColor:'white'}}>
      <Particle_Background />
        <div style={{marginLeft:600,display:'inline-block'}}>
            <div style={{"display":"inline-block","margin":"20px"}}>
            <TextInput type='text' placeholder='folder name' style={{borderWidth:4,color:'white'}} onChangeText={(data)=>{setFolderField(data);console.log(folderfield)
            }}/>
            <button style={{backgroundColor:"#3275A6",height:30,width:100,border:'none',borderRadius:10}} onClick={async()=>{
              setUpdated(update+1)
              let api = await fetch(`http://localhost:8000/add_folder/${name}/${folderfield}`)
              api = await api.json()
              console.log(api)
              let api2 = await fetch(`http://localhost:8000/add_folder/${name}`)
              api2 = await api2.json()
              console.log(api2)
              setFolderField("");
              }}>Create folder</button>
            </div>
            <div style={{"display":"inline-block","margin":"20px"}}>{name}</div>
         
        </div>    
        <div style={{marginTop:50,'display':'inline-block'}}>
        {
               folderdata.map((data,index)=>{
                 return(
                   <div key={index}>
                     <Folder task={()=>{props.navigation.navigate('FolderContent',{foldername_:{data},name:name})}} data={data}/>

                  <br></br>
                  </div>
                 )
                 
               }) 
              
              }
          </div>
    </SafeAreaProvider>
  );
}
//        <Folder task={()=>{props.navigation.navigate('FolderContent',{foldername_:'data',name:name})}} data='data'/>
