import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
export default function About() {
return (<div style={{textAlign:'center',marginTop:'7vh'}}>
  <Box sx={{ flexGrow: 1 }}>
  

  <Container style={{textAlign:'center'}} component="main" maxWidth="lg">
 
  <Box>
<div style={{fontSize:'4vh'}}>Manual</div>
<div style={{fontSize:'2.8vh',lineHeight:'1.9',marginTop:'2vh',textAlign:'justify',direction:'ltr'}}>
This site was developed to help you the user in solving problems of finding nearby businesses you are looking for effortlessly
All that's left for you is to enter the system you're looking for to enter your current location (of course your location will be identified by itself if you confirm it) and get in touch...
Not only that, but if you are interested in opening a business that all our users will be able to easily search for, you can log in, enter your business details and hope the customers are on their way!!
You will be able to approve customers who want to enter your business as a subsidiary, they will send you a request and all you have left is to approve them, so yes - if you are only interested in entering as a subsidiary in an existing system - you only need to enter your details, your location and send a request.
If you are approved, you will receive a notification by email and you will be able to see your business point within the selected system
</div>   </Box>
    </Container>

</Box>  
</div>)
}
