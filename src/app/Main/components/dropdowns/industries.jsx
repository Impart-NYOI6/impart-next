import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function IndustrySelect() {
  const [industry, setIndustry] = React.useState('');

  const handleChange = (event) => {
    setIndustry(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Industries</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={industry}
          label="Industry"
          onChange={handleChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Education'}>Education</MenuItem>
          <MenuItem value={'Construction'}>Construction</MenuItem>
          <MenuItem value={'Design'}>Design</MenuItem>
          <MenuItem value={'Corporate Services'}>Corporate Services</MenuItem>
          <MenuItem value={'Retail'}>Retail</MenuItem>
          <MenuItem value={'Energy & Mining'}>Energy & Mining</MenuItem>
          <MenuItem value={'Manufacturing'}>Manufacturing</MenuItem>
          <MenuItem value={'Finance'}>Finance</MenuItem>
          <MenuItem value={'Recreation & Travel'}>Recreation & Travel</MenuItem>
          <MenuItem value={'Arts'}>Arts</MenuItem>
          <MenuItem value={'Health Care'}>Health Care</MenuItem>
          <MenuItem value={'Hardware & Networking'}>Hardware & Networking</MenuItem>
          <MenuItem value={'Real Estate'}>Real Estate</MenuItem>
          <MenuItem value={'Legal'}>Legal</MenuItem>
          <MenuItem value={'Consumer Goods'}>Consumer Goods</MenuItem>
          <MenuItem value={'Agriculture'}>Agriculture</MenuItem>
          <MenuItem value={'Media & Communications'}>Media & Communications</MenuItem>
          <MenuItem value={'Nonprofit'}>Nonprofit</MenuItem>
          <MenuItem value={'Software & IT Services'}>Software & IT Services</MenuItem>
          <MenuItem value={'Transportation & Logistics'}>Transportation & Logistics</MenuItem>
          <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
          <MenuItem value={'Wellness & Fitness'}>Wellness & Fitness</MenuItem>
          <MenuItem value={'Public Safety'}>Public Safety</MenuItem>
          <MenuItem value={'Public Administration'}>Public Administration</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}