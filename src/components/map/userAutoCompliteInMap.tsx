/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { observer } from 'mobx-react';
import AutoComplete from './AutoComplite';
import Grid from '@mui/material/Grid';
import RequestToMarker from './RequestToMarker';
import TitleMapLocationUser from './titleMapLocationUser';

const UserAutoCompliteInMap: React.FC = () => {

return(
 <>
  <TitleMapLocationUser/>
 <Grid container spacing={2}>
    <Grid item xs={8}>
    <AutoComplete/>
  </Grid>
  <Grid item xs={4}>
  <RequestToMarker />
  </Grid>
  </Grid>
    
    </>
)
}
export default observer(UserAutoCompliteInMap)