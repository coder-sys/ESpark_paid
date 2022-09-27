import React,{useState,useEffect} from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {PayPalButton} from 'react-paypal-button-v2'
function PlanSelection(props){
    const [name,setName] = useState(props.navigation.getParam('name'))
    const [disablity,setDisability] = useState(true)
    const [updated,setUpdated] = useState(0)
    useEffect(async()=>{
        let api = await fetch(`http://localhost:8000/get_free_trial_disability/${name}`)
        api = await api.json()
        setDisability(api.data)
    },[updated])
    return(
        <SafeAreaProvider style={{'alignItems':'center'}}>
            <div style={{width:'50px',height:'25px',marginBottom:'140px'}}>

            <PayPalButton 
 options={{clientId:'AaUE7i5700ZGZexBDFN8Z39VqcimvOt2j1eKdkAcRQKDknfJBBzPEnLCHQ4hAfOQg4Wp7bIyUEhCtXhv',
 currency:'USD',
}}
amount='1.5'
onSuccess={async(details, data) => {
    let api = await fetch(`http://localhost:8000/store_timestamp_for_paid_version/${name}`)
    api = await api.json()
    console.log(api.data)
    let api1 = await fetch(`http://localhost:8000/update_plan_paid/${name}/paid/${api.data}`)
    api1 = await api1.json()
    props.navigation.navigate('HomePage',{"name":name})
  console.log({ details, data, });
  console.log(details.payer.name.given_name )
}}
/></div>
            <button disabled={disablity} style={{backgroundColor:"#3275A6",height:30,width:100,border:'none',borderRadius:10}} onClick={async()=>{
              let api = await fetch(`http://localhost:8000/store_timestamp_for_trial/${name}`)
              api = await api.json()
              console.log(api.data)
              let api1 =  await fetch(`http://localhost:8000/update_plan/${name}/free/${api.data}`)
              api1 = await api1.json()
              let api3 = await fetch(`http://localhost:8000/set_disability_for_free_trial/${name}`)
              api3 = await api3.json()
              api3 = api3['data']
              setUpdated(updated+1)
              props.navigation.navigate('HomePage',{'name':name})
              }}>One month free trial</button>
        </SafeAreaProvider>
    )
}

export default PlanSelection