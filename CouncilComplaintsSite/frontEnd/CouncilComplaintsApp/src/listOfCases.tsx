import React, { useState, useEffect } from 'react';

import axios from 'axios';

const CasesList = () => {

  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/cases/')
      .then(res => {
        setCases(res.data);
      });
  }, []);

  return (
    <ul>
      {cases.map(case => (
        <li key={case.id}>
          {case.case_short_description}
          {/* Add buttons for edit and delete operations here */}
        </li>
      ))}
    </ul>

  );

};


export default CasesList;