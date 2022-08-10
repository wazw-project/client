import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { System } from '../utils/system';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SystemDetails() {
  const inputTopic: any = useRef();
  const inputObjectName: any = useRef();
  const inputDescription: any = useRef();
  const inputEmail: any = useRef();
  const inputPhone: any = useRef();
  const inputUrlName: any = useRef();
  const inputUrlImage: any = useRef();

  const [system, setSystem] = useState<System>();
  const location = useLocation();
  const from: any = location.state;
  // const { nameURL } = useParams();
  async function getSystem() {
    try {
      console.log(from)
      const res = await axios.get(` http://localhost:3333/system/systemById/${from.id}`)
      console.log(res.data);
      setSystem(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSystem();
  }, [from.id]);

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
    debugger;
    console.log("open");
    setOpen(true);
  };

  const handleClose = async () => {
    const systemToUpdate = {
      "topic": inputTopic.current?.value,
      "objectName": inputObjectName.current?.value,
      "managerUid": "62f263ea1729335c6aff4480",
      "description": inputDescription.current?.value,
      "email": inputEmail.current?.value,
      "phone": inputPhone.current?.value,
      "urlName": inputUrlName.current?.value,
      "urlImage": inputUrlImage.current?.value
    }
    console.log(systemToUpdate);
    try {
      const res = await axios.put(` http://localhost:3333/system/${from.id}`, systemToUpdate)
      console.log(res.data)
    } catch (err) {
      return err
    }

    finally {
      setOpen(false);
    }
  };

  return (
    <div>
      {system &&
        <Card sx={{ maxWidth: 2000, alignItems: 'center', marginTop: 2 }}>
          <CardMedia
            component="img"
            height="480"
            image={system?.urlImage}
            alt="ha ha ha"
          />
          <CardContent>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h3" component="div">
              {system?.description}
            </Typography>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
              {system?.objectName}
            </Typography>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
              {system?.phone}
            </Typography>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
              {system?.topic}
            </Typography>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
              {system?.urlName}
            </Typography>
          </CardContent>
          <div style={{ marginRight: 'left' }}></div>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              edit
            </Button>
            <Button variant="outlined" >
              delete
            </Button>
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
                  <Button autoFocus color="inherit" onClick={handleClose}>
                    save
                  </Button>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem button>
                  <TextField id="outlined-basic" label="UrlName" variant="outlined" defaultValue={system?.urlName} inputRef={inputUrlName} />
                </ListItem>
                {/* <Divider /> */}
                <ListItem button>
                  <TextField id="outlined-basic" label="objectName" variant="outlined" defaultValue={system?.objectName} inputRef={inputObjectName} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="description" variant="outlined" defaultValue={system?.description} inputRef={inputDescription} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="topic" variant="outlined" defaultValue={system?.topic} inputRef={inputTopic} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="email" variant="outlined" defaultValue={system?.email} inputRef={inputEmail} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="phone" variant="outlined" defaultValue={system?.phone} inputRef={inputPhone} />
                </ListItem>
                <ListItem button>
                  <TextField id="outlined-basic" label="phone" variant="outlined" defaultValue={system?.urlImage} inputRef={inputUrlImage} />
                </ListItem>
                {/* <ListItem button>
                  <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                  />
                </ListItem> */}
              </List>
            </Dialog>
          </div>
        </Card>}
    </div>
  );
}

