import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'



export default function BasicSelect( { field, setOrganisationCategories, } ) {
  const [age, setAge] = React.useState('');

  React.useEffect(() => {
    axios({
      method:'POST',
      url:'http://infilate.com/backend/public/api/offer-category/category-type',
      data:{
        category_type:age
      }
    }).then((res) => {
      setOrganisationCategories(res.data.Data)
    })
    .catch(e => console.log(e))
  },[age])

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  field.onChange(age)

 

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> Organisation type </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Organisation type"
        //   onChange={field.onChange}
          onChange={handleChange}
        >
          <MenuItem value='Digital Brand'> Digital Brand </MenuItem>
          <MenuItem value='Digital Marketing Institutes'> Digital Marketing Institutes </MenuItem>
          <MenuItem value='Digital Agencies'> Digital Agencies </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}