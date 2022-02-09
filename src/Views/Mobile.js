import { Box,  Grid,  TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Styles from './css.module.css'
import Pics from "./static/pics.png"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Mobile() {

  //hooks
   const [submit,setSubmit] = useState(false);
   const [phone,setphone] = useState("");
   const [Password,setpassword]= useState(false);
   
  const [pError, setErr] = useState({"color":"#FFFFFF",
  "text":"Enter phone number"})
    
  const phoneRef = useRef();
   //for fetch api
   useEffect(()=>{
        if(submit){
            const data = { "phoneNumber": phone,
            "password":Password };
             fetch('http://3.135.237.248:5222/v0.0.1/auth/login', {
            method: "POST",
            headers: {
                "cb-client-api-key": "6df22a6a-c971-493f-9161-6ecfc72ddc35",
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
                  },
            body: JSON.stringify({
                  phoneNumber:phone,
                  password: Password
                  }),                                                                              
                })
                .then(response => response.json())
                            .then(data => {
                                alert(JSON.stringify(data));
                  console.log('Success:', data);
                        })
                        .catch((error) => {
                          alert(error)
                          console.error('Error:', error);
                    });
                      }  
                        setSubmit(false);
                         },[submit])

  useEffect(()=>{
    if(isNaN(phone)&&phone!=""){
     setErr({color:"#FF0000",
     text:"only numbers, no letters"})
     
    }else{
      setErr({color:"#FFFFFF",
      text:"Enter phone number"})
    }
    //
  },[phone])

  useEffect(()=>{
    try{
     phoneRef.current.focus();
      }catch(e){
        alert(e)
      }
  })

   //for creating responsive site // matches == ture if screen size =< lg                      
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up('lg'));









  







   
  return (
  <div className={Styles.cont}>
  <Grid container>
  <Grid item xl={4} md={12} lg={4} xs={12} sm={12}>
  <Grid container>
   <Grid item xs={2} xl={2} md={3} sm={2} lg={2}/>
   <Grid item xs={8} xl={8} md={6} sm={8}lg={8}>
  <div className={Styles.container}>
      <p className={Styles.tx1}>Login</p>
      <TextField  ref={phoneRef} id="outlined-basic" style={{width:"100%",backgroundColor:pError.color}} label={pError.text} onChange={(e) => { setphone(e.target.value)}} variant="outlined"  value={phone} />
          <br/> <br/>
          <TextField   id="outlined-basic" label="password" onChange={(e) => { setpassword(e.target.value)}} type="password" variant="outlined" className={Styles.password} />
            <Box className={Styles.fp}>Forget password</Box>
            <input type="checkbox" name="remember" value="ok"/>
  <label for="vehicle1"> Remember me</label>
          <Box className={Styles.Box} onClick={()=>{setSubmit(true);}} >Login</Box>
          <div className={Styles.label}>
         <label >Don't have account yet?</label>
          <Box className={Styles.Box1}>Create Account</Box>
          </div>
     </div>
     </Grid>
     <Grid item xs={2} xl={2} md={3} sm={2} lg={2}/>
     </Grid>
  </Grid>
  <Grid item xl={8} lg={8}  >
    {matches&&( <img src={Pics} className={Styles.pics}/>)}
 
  </Grid>
  </Grid>
  </div>
  )




}

export default Mobile;
