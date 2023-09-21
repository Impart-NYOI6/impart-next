import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function Tags(props) {
    const setCats = (event, value) => {
        const categories = props.categories(value);
    }
    const setInds = (event, value) => {
        const industries = props.industries(value);
    }

   

  
      

  return (
    <Stack spacing={3} sx={{ width: 250 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => option}
        onChange={setCats}
        // defaultValue={['Categories']}
        renderInput={(params) => (
          <TextField
            {...params}
            // variant="standard"
            label="Categories"
            placeholder="Categories"
          />
        )}
      />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={industries}
        getOptionLabel={(option) => option}
        onChange={setInds}
        // defaultValue={['Industries']}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            // variant="standard"
            label="Industries"
            placeholder="Industries"
          />
        )}
      />      
    </Stack>
  );
}

const categories = ['General',
'Career Development',
'Skill Enhancement',
'Problem Solving',
'Networking',
'Goal Setting',
'Work-Life Balance',
'Job Search and Interviewing',
'Company/Industry Insight',
'Self-Improvement and Personal Growth',
'Ethical and Moral Questions']

const industries = ['Education',
'Construction',
'Design',
'Corporate Services',
'Retail',
'Energy & Mining',
'Manufacturing',
'Finance',
'Arts',
'Health Care',
'Hardware & Networking',
'Real Estate',
'Legal',
'Consumer Goods',
'Agriculture',
'Media & Communications',
'Nonprofit',
'Software & IT Services',
'Transportation & Logistics',
'Entertainment',
'Wellness & Fitness',
'Public Safety',
'Public Administration'];
  


