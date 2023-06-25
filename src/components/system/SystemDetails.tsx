import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { System } from '../../utils/system';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import systenStore from '../../store/systemStore'
import { observer } from 'mobx-react';
import TopicIcon from '@mui/icons-material/Topic';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Grid from '@mui/material/Grid';

const SystemDetails: React.FC = () => {
  const navigate = useNavigate();
  const inputTopic: any = useRef();
  const inputObjectName: any = useRef();
  const inputDescription: any = useRef();
  const inputEmail: any = useRef();
  const inputPhone: any = useRef();
  const inputUrlName: any = useRef();
  const inputUrlImage: any = useRef();
  const [topicV, setTopicV] = useState<string>("**")
  const [objectNameV, setObjectNameV] = useState<string>("**")
  const [descriptionV, setDescriptionV] = useState<string>("**")
  const [emailV, setEmailV] = useState<string>("*@gmail.com")
  const [phoneV, setPhoneV] = useState<string>("12345678")
  const [urlNameV, setUrlNameV] = useState<string>("**")
  const [urlImageV, setUrlImageV] = useState<string>("**")
  const [system, setSystem] = useState<System>();
  const location = useLocation();
  const form: any = location.state;
  const { nameURL } = useParams();

  async function getSystem() {
    debugger
    try {
      debugger
      await systenStore.getSystemById(form.id);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getSystem();
  }, [])

  async function deleteSystem() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your service!",
      icon: "warning",
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            await systenStore.removeSystem();
            swal("Poof! Your system has been deleted!", {
              icon: "success",
            });
            navigate("/systems", { state: { id: system?.managerUid } })
          } catch (err) {
            console.log(err)
            swal("Your system is safe!");
          }

        } else {
          swal("Your system file is safe!");
        }
      });
  }

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const updateSystem = async () => {
    const systemToUpdate = {
      "topic": inputTopic.current?.value,
      "objectName": inputObjectName.current?.value,
      "managerUid": form.id,
      "description": inputDescription.current?.value,
      "email": inputEmail.current?.value,
      "phone": inputPhone.current?.value,
      "urlName": inputUrlName.current?.value,
      "urlImage": inputUrlImage.current?.value
    }
    try {
      await systenStore.editSystem(systemToUpdate);
      swal("your details update!", "You clicked the button!", "success");
    } catch (err) {
      console.log(err);
    }
    finally {
      handleClose()
    }
  }
  const handleClose = async () => {
    setOpen(false);
    getSystem();
    navigate("/systems", { state: { id: system?.managerUid } })
  };

  return (
    <div>
      <h1>{nameURL}</h1>
      {systenStore.currentSystem &&
       <Card sx={{ maxWidth: 2000, alignItems: 'center', marginTop: -2 }}>
     <Grid container spacing={2}>
        <Grid item xs={6}>
        <CardMedia
            component="img"
            height="620"
            image={systenStore.currentSystem?.urlImage}
            alt="ha ha ha"
          />
        </Grid>
 
        <Grid item xs={6}>
     
       
           
            <Grid item xs={12} sx={{marginLeft:'-30%'}}>
              <CardContent sx={{ marginLeft: '35%' }}>
                <Typography gutterBottom variant="h3" component="div" sx={{color:'#ffab91'}}>
                  {systenStore.currentSystem?.description}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" sx={{marginTop:'3%'}}>
                  <SettingsSuggestIcon />
                  {systenStore.currentSystem?.objectName}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <PhoneIphoneIcon />
                  {systenStore.currentSystem?.phone}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <TopicIcon />
                  {systenStore.currentSystem?.topic}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <EmailIcon />
                  {systenStore.currentSystem?.email}

                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs>
                <Button variant="contained" onClick={handleClickOpen} sx={{
                  width: '13%', height: '6vh',marginTop:'10%',marginLeft:'3%'
                }} endIcon={<ModeEditIcon />}>
                  Edit
                </Button>
            
              <Button variant="contained" endIcon={<DeleteIcon />} onClick={deleteSystem} sx={{
                width: '13%', height: '6vh',marginTop:'10%',marginLeft:'4%'
              }}>
                Delete
              </Button>
          
            </Grid>
            <Grid item xs>
            
                <Button sx={{
                 height: '10vh',marginTop:'5%',marginLeft:'2%'}} variant="outlined" onClick={() => { navigate(`/Map/${systenStore.currentSystem.urlName}/${systenStore.currentSystem._id}`) }}  endIcon={<RemoveRedEyeIcon />}  >
               
                  see all business location
               
                </Button>
            
            </Grid>
         
        </Grid>

         


          <div>



            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    details
                  </Typography>
                  <Button autoFocus color="inherit" onClick={updateSystem}>
                    save
                  </Button>
                </Toolbar>
              </AppBar>

              <List sx={{ marginLeft: "40%", marginTop: '3%' }}>
                <ListItem button>
                  <TextField
                    id="outlined-basic"
                    label="UrlName"
                    variant="outlined"
                    defaultValue={systenStore.currentSystem?.urlName}
                    inputRef={inputUrlName}
                    helperText={urlNameV === "" ? "required!" : ""}
                    error={urlNameV === ""}
                  // onChange={(e) => (setUrlNameV(e.target.value))}
                  // onBlur={(e) => setUrlNameV(e.target.value)}
                  />
                </ListItem>
                {/* <Divider /> */}
                <ListItem button>
                  <TextField
                    id="outlined-basic"
                    label="objectName"
                    variant="outlined"
                    defaultValue={systenStore.currentSystem?.objectName}
                    inputRef={inputObjectName}

                  />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="description" variant="outlined" defaultValue={systenStore.currentSystem?.description} inputRef={inputDescription} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="topic" variant="outlined" defaultValue={systenStore.currentSystem?.topic} inputRef={inputTopic} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="email" variant="outlined" defaultValue={systenStore.currentSystem?.email} inputRef={inputEmail} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="phone" variant="outlined" defaultValue={systenStore.currentSystem?.phone} inputRef={inputPhone} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="image url" variant="outlined" defaultValue={systenStore.currentSystem?.urlImage} inputRef={inputUrlImage} />
                </ListItem>

              </List>
            </Dialog>
          </div>
       
        </Grid> </Card>}
    </div>
  );
}

export default observer(SystemDetails);
