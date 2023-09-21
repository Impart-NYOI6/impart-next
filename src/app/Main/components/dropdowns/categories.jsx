import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategorySelect() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={'General'}>General</MenuItem>
          <MenuItem value={'Career Development'}>Career Development</MenuItem>
          <MenuItem value={'Skill Enhancement'}>Skill Enhancement</MenuItem>
          <MenuItem value={'Problem Solving'}>Problem Solving</MenuItem>
          <MenuItem value={'Networking'}>Networking</MenuItem>
          <MenuItem value={'Goal Setting'}>Goal Setting</MenuItem>
          <MenuItem value={'Work-Life Balance'}>Work-Life Balance</MenuItem>
          <MenuItem value={'Job Search and Interviewing'}>Job Search and Interviewing</MenuItem>
          <MenuItem value={'Company/Industry Insight'}>Company/Industry Insight</MenuItem>
          <MenuItem value={'Self-Improvement and Personal Growth'}>Self-Improvement and Personal Growth</MenuItem>
          <MenuItem value={'Ethical and Moral Questions'}>Ethical and Moral Questions</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}