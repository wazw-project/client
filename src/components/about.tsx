import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
export default function About() {
return (<div style={{textAlign:'center',marginTop:'7vh'}}>
  <Box sx={{ flexGrow: 1 }}>
  

  <Container style={{textAlign:'center'}} component="main" maxWidth="lg">
 
  <Box>
<div style={{fontSize:'4vh'}}>Manual</div>
<div style={{fontSize:'2.8vh',lineHeight:'1.9',marginTop:'2vh',textAlign:'justify',direction:'rtl'}}>

If you are a new user - this content is for you :)
</div>   </Box>
    </Container>

</Box>  
</div>)
}
