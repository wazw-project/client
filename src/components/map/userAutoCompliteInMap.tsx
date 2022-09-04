/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import AutoComplete from './AutoComplite';
import Grid from '@mui/material/Grid';
import RequestToMarker from './RequestToMarker';
import TitleMapLocationUser from './titleMapLocationUser';
import CardOfShortDistances from './cardOfShortDistances';
import Button from '@mui/material/Button';
import MapStore from '../../store/mapStore';

const UserAutoCompliteInMap: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <TitleMapLocationUser />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <AutoComplete />
        </Grid>
        <Grid item xs={4}>
          <RequestToMarker />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() =>
            {
              MapStore.resultWays = !MapStore.resultWays;
              // setOpen(true);
              // <CardOfShortDistances />
            }}>
            Accepting places near me</Button>
            {MapStore.resultWays && <CardOfShortDistances />}
        </Grid>
      </Grid>
    </>
  )
}
export default observer(UserAutoCompliteInMap)