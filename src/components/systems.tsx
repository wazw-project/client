import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { System } from '../utils/system';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { padding, style } from "@mui/system";
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dashboard from './Dashboard';

const Systems: React.FC = () => {
    const [systems, setSystems] = useState<System[]>([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    const inputTopic:any = useRef();
    const inputObjectName:any = useRef();
    const inputDescription:any = useRef();
    const inputEmail:any = useRef();
    const inputPhone:any = useRef();
    const inputUrlName:any = useRef();
    const inputUrlImage:any = useRef();
    const managerUid = '62f1fefd238a932105836927'
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addSystem= async()=>{
        const dataSystem={
            "topic":inputTopic.current?.value,
            "objectName":inputObjectName.current?.value,
             "managerUid":managerUid,
            "description":inputDescription.current?.value,
            "email":inputEmail.current?.value,
            "phone":inputPhone.current?.value,
            "urlName":inputUrlName.current?.value,
            "urlImage":inputUrlImage.current?.value
           }
           console.log(dataSystem)
        try {
              debugger;      
            const res = await axios.post(`http://localhost:3333/system/addSystem`,dataSystem);
            //let tempList = await res.data;
            console.log(res)
           // setSystems(tempList);
        } catch (error) { console.log(error); }
        finally{setOpen(false);}
        
    }







    async function getSystems() {
        try {
            const managerId='62f263ea1729335c6aff4480';
            const res = await axios.get(`http://localhost:3333/system/${managerId}`);
            let tempList = await res.data;
            console.log(tempList[0]._id)
            setSystems(tempList);
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        debugger;
        getSystems();
    }, [])

    const logOut=()=>{
        navigate('/Dashboard')
    }
    return (
        <div id="allBusiness" >
            <button onClick={()=>logOut()}>log out</button>
            <Typography gutterBottom variant="h2" component="div" sx={{ textAlign: 'center', padding: '10px', }}>All systems</Typography>
            <Stack padding={3} direction="row" spacing={5} sx={{ '& .MuiCard-root': { m: 5 }, flexWrap: 'wrap' }} >

                <Button variant="contained" onClick={handleClickOpen}>
                    add system
                </Button>
                {systems && systems.map((system: System) =>
                    <Card >
                        <CardMedia
                            component="img"
                            alt="system"
                            height="140"
                            image={system.urlImage}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {system.topic}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {system.objectName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {system.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => navigate('/systemDetails', { state: { id: system._id } })}>see the system</Button>
                        </CardActions>

                    </Card>)}

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>add system</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add system details
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                              
                            <TextField
                                    inputRef={inputTopic}
                                    id="outlined-textarea"
                                    label="Topic"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                              
                              
                                 <TextField
                                    inputRef={inputDescription}
                                    id="outlined-textarea"
                                    label="Description"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                               
                                 <TextField
                                    inputRef={inputObjectName}
                                    id="outlined-textarea"
                                    label="object name"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                                 <TextField
                                    inputRef={inputEmail}
                                    id="outlined-textarea"
                                    label="Email"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                                 <TextField
                                    inputRef={inputPhone}
                                    id="outlined-textarea"
                                    label="phone"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                                 <TextField
                                    inputRef={inputUrlName}
                                    id="outlined-textarea"
                                    label="name for navigate to your system"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                                 <TextField
                                    inputRef={inputUrlImage}
                                    id="outlined-textarea"
                                    label="url of your image"                               
                                    multiline
                                    sx={{marginTop:1}}
                                />
                            
                            </FormControl>                                                                                                      
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={addSystem}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </div>
    )
}
export default Systems




