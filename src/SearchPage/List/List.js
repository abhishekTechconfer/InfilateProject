import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './Styles.js';

const List = ({ places, childClicked, isLoading, setCoordinates }) => {
  const [elRefs, setElRefs] = useState([]);
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('restaurants')
  const classes = useStyles();

  // console.log(places)

  useEffect(() => {
     const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
     setElRefs(refs)
  }, [places]);
  // console.log(elRefs)
  return (
    <div className={classes.container}>
          <Typography  gutterBottom={true} variant='h4'> Institutes & Agencies around you </Typography>
          {isLoading ? (
            <div className={classes.loading}>
              <CircularProgress size='5rem'/>
              </div>
          ) : (
            <>
          {/* <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Institutes</MenuItem>
              <MenuItem value="hotels">Agencies</MenuItem>
              <MenuItem value="attractions">Brands</MenuItem>
            </Select>
          </FormControl> */}

          {/* <FormControl className={classes.formControl}>
            <InputLabel id="type">Rating</InputLabel>
            <Select id="type" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl> */}

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place,i)=> {
              return (
                <Grid key={i} item xs={12}>
                <PlaceDetails
                place={place}
                index={i}
                selected={Number(childClicked) === i}
                refProp={elRefs[i]}
                setCoordinates={setCoordinates}
                />
              </Grid>
              )
            })}

          </Grid>
            </>
          )}

    </div>
  );
};

export default List;