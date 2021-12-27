import React, { useState } from 'react';
import './FilterForm';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
  filterdPosts: (filterBy: string) => void
}

export const FilterForm: React.FC<Props> = React.memo(
  ({ filterdPosts }) => {
    const [filterBy, setFilterBy] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setFilterBy(event.target.value);
      filterdPosts(filterBy);
    };

    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Filter posts"
          variant="outlined"
          value={filterBy}
          onChange={handleInputChange}
          className="post-filter-form"
        />
      </Box>
    )
  },
)
