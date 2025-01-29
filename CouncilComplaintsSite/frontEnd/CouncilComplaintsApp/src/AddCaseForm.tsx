import React, { useState, useEffect } from 'react';

import axios from 'axios'

const AddCaseForm = () => {

    const [title, setTitle] = useState('');
  
  
    const handleSubmit = (event) => {
  
      event.preventDefault();
  
      axios.post('http://localhost:8000/api/cases/', { title })
  
        .then(res => {
  
          console.log(res);
  
          console.log(res.data);
  
        });
  
    };
  
  
    return (
  
      <form onSubmit={handleSubmit}>
  
        <input
  
          type="text"
  
          value={title}
  
          onChange={e => setTitle(e.target.value)}
  
        />
  
        <button type="submit">Submit Case</button>
  
      </form>
  
    );
  
  };
  
  
  export default AddCaseForm;