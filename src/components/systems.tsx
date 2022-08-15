import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { System } from '../utils/system';
import { Alert, Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { url } from 'inspector';

const Systems: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<System>();
    const location = useLocation();
    const from: any = location.state;
    const [systems, setSystems] = useState<System[]>([]);
    const [open, setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    const inputTopic = useRef<HTMLInputElement>();
    const inputObjectName = useRef<HTMLInputElement>();
    const inputDescription = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputUrlName = useRef<HTMLInputElement>();
    const inputUrlImage = useRef<HTMLInputElement>();
    const [topicV, setTopicV] = useState<string>("")
    const [objectNameV, setObjectNameV] = useState<string>("")
    const [descriptionV, setDescriptionV] = useState<string>("")
    const [emailV, setEmailV] = useState<string>("")
    const [phoneV, setPhoneV] = useState<string>("")
    const [urlNameV, setUrlNameV] = useState<string>("")
    const [urlImageV, setUrlImageV] = useState<string>("")
    const [startTopic, setStartTopic] = useState<boolean>(false)
    const [startDescriptionV, setStartDescriptionV] = useState<boolean>(false)
    const [startObjectNameV, setStartObjectNameV] = useState<boolean>(false)
    const [startEmailV, setStartEmailV] = useState<boolean>(false)
    const [startPhoneV, setStartPhoneV] = useState<boolean>(false)
    const [startUrlNameV, setStartUrlNameV] = useState<boolean>(false)
    const [startUrlImageV, setStartUrlImageV] = useState<boolean>(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function isValidEmail(email:string) {
        return /\S+@\S+\.\S+/.test(email);
      }
    const addSystem = async () => {
        if(topicV===""||objectNameV===""||descriptionV===""||emailV===""||phoneV===""||urlNameV===""||urlImageV===""||!isValidEmail(emailV)){
            swal("your form is not validate!!", "You clicked the button!", "error");
        }
        else{
        debugger
        const dataSystem = {
            "topic": inputTopic.current?.value,
            "objectName": inputObjectName.current?.value,
            "managerUid": from.id,
            "description": inputDescription.current?.value,
            "email": inputEmail.current?.value,
            "phone": inputPhone.current?.value,
            "urlName": inputUrlName.current?.value,
            "urlImage": inputUrlImage.current?.value
        }
        console.log(dataSystem)
        try {
            const res = await axios.post(`http://localhost:3333/system/addSystem`, dataSystem);
            console.log(res)
            swal("your system added!!", "You clicked the button!", "success");
        } catch (error) { console.log(error); }
        finally { setOpen(false); }
    }
    }

    async function getSystems() {
        debugger
        try {
            debugger;
            const res = await axios.get(`http://localhost:3333/system/${from.id}`);
            let tempList = await res.data;
            // console.log(tempList[0]._id)
            setSystems(tempList);
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        getSystems();
    }, [])

    const logOut = () => {
        navigate('/Dashboard')
    }
    return (
        <div id="allBusiness" >
            <button onClick={() => logOut()}>log out</button>
            <Typography gutterBottom variant="h2" component="div" sx={{ textAlign: 'center', padding: '10px', }}>All systems</Typography>
            <Stack padding={3} direction="row" spacing={5} sx={{ '& .MuiCard-root': { m: 5 }, flexWrap: 'wrap' }} >

                <Button variant="contained" onClick={handleClickOpen}>
                    add system
                </Button>
                {systems && systems.map((system: System) =>
                    <Card key={system._id}>
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
                            <Button variant="contained" onClick={() => navigate(`/systemDetails/hello/${system.urlName}/${system._id}`, { state: { id: system._id } })}>see the system</Button>
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
                            <FormControl sx={{ mt: 2, minWidth: 120 }} onSubmit={handleSubmit(addSystem)}>


                                <TextField
                                    required
                                    inputRef={inputTopic}
                                    id="outlined-textarea"
                                    label="Topic"
                                    multiline
                                    onChange={(e) =>( setTopicV(e.target.value),setStartTopic(true))} 
                                    onBlur={(e) => (setTopicV(e.target.value),setStartTopic(true))}                              
                                    helperText={topicV === "" ? "required!" : " "}
                                    error={topicV === ""&& startTopic}

                                />

                                <TextField
                                    inputRef={inputDescription}
                                    id="outlined-textarea"
                                    label="Description"
                                    multiline
                                    sx={{ marginTop: 1 }}
                                    onChange={(e) => (setDescriptionV(e.target.value),setStartDescriptionV(true))}
                                    onBlur={(e) => (setDescriptionV(e.target.value),setStartDescriptionV(true))}   
                                    helperText={descriptionV === "" ? "required!" : " "}
                                    error={descriptionV === ""&& startDescriptionV}
                                />

                                <TextField
                                    inputRef={inputObjectName}
                                    id="outlined-textarea"
                                    label="object name"
                                    multiline
                                    sx={{ marginTop: 1 }}
                                    onChange={(e) => (setObjectNameV(e.target.value),setStartObjectNameV(true))}
                                    onBlur={(e) => (setObjectNameV(e.target.value),setStartObjectNameV(true))}  
                                    helperText={objectNameV === "" ? "required!" : " "}
                                    error={objectNameV === ""&& startObjectNameV}
                                />
                                <TextField
                                    inputRef={inputEmail}
                                    id="outlined-textarea"
                                    label="Email"
                                    multiline
                                    sx={{ marginTop: 1 }}
                                    onChange={(e) => (setEmailV(e.target.value),setStartEmailV(true))}
                                    onBlur={(e) => (setEmailV(e.target.value),setStartEmailV(true))}  
                                    helperText={emailV === "" ? "required!" :isValidEmail(emailV)? "":"not valid email"}
                                    error={(emailV === ""||!isValidEmail(emailV))&& startEmailV}
                                />
                                <TextField
                                    inputRef={inputPhone}
                                    id="outlined-textarea"
                                    label="phone"
                                    multiline
                                    sx={{ marginTop: 1 }}
                                    onChange={(e) => (setPhoneV(e.target.value),setStartPhoneV(true))}
                                    onBlur={(e) => (setPhoneV(e.target.value),setStartPhoneV(true))}  
                                    helperText={phoneV === "" ? "required!" :phoneV.length<8? "At least 8 characters": " "}
                                    error={(phoneV === ""||phoneV.length<8)&& startPhoneV}
                                />
                                <TextField
                                    inputRef={inputUrlName}
                                    id="outlined-textarea"
                                    label="name for navigate to your system"
                                    multiline
                                    sx={{ marginTop: 1 }}
                                    onChange={(e) => (setUrlNameV(e.target.value),setStartUrlNameV(true))}
                                    onBlur={(e) => (setUrlNameV(e.target.value),setStartUrlNameV(true))}  
                                    helperText={urlNameV === "" ? "required!" : " "}
                                    error={urlNameV === ""&& startUrlNameV}
                                />
                                <TextField
                                    inputRef={inputUrlImage}
                                    id="outlined-textarea"
                                    label="url of your image"
                                    multiline
                                    sx={{ marginTop: 1 }}
                                    onChange={(e) => (setUrlImageV(e.target.value),setStartUrlImageV(true))}
                                    onBlur={(e) => (setUrlImageV(e.target.value),setStartUrlImageV(true))}  
                                    helperText={urlImageV === "" ? "required!" : " "}
                                    error={urlImageV === ""&& startUrlImageV}
                                />

                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                
                        <Button onClick={addSystem} type="submit">Add</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </div>
    )
}
export default Systems




