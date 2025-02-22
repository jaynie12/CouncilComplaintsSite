import React from 'react';
import { useState, useEffect } from 'react';
import CaseForm from './caseForm';
import CaseAnalysisForm from './analysisByFilter';
import { Table } from './Table';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
//https://www.codeconcisely.com/posts/react-button-component/.0

export function CustomButton({ children, ...attributes }: Props) {
            
  return (
    <div>
    <button
      type="button"

      className="border border-gray-800 px-4 py-2 rounded uppercase"
      style={{ 
        width: "300px", 
        height: "100px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: "10px",
        margin: "5em",
        padding: "5em"
      }} 
      {...attributes}
    >
      {children} /* Raise a case, Analyze issues and cases, Update and Assign cases: Children are the names of the buttons using this format */
    </button>
</div>

  );
}


export default function staffHomePage {
    const [raiseCaseClicked, setRaiseCaseClicked] = useState(false);
    const [dataAnalysisClicked, setDataAnalysisClicked] = useState(false);
    const [updateCaseClicked, setUpdateCaseClicked] = useState(false);

    return (
      <div>
        <CustomButton onClick={() => setRaiseCaseClicked(true)}>
          Raise a case
        </CustomButton>
        <CustomButton onClick={() => setDataAnalysisClicked(true)}>
          Analyze issues and cases
        </CustomButton>
        <CustomButton onClick={() =>setUpdateCaseClicked(true)}>
          Update and Assign cases
        </CustomButton>
  
        <div className="content">
          {raiseCaseClicked === true && <CaseForm />}
          {dataAnalysisClicked === true && <CaseAnalysisForm />}
          {updateCaseClicked === true&& <Table />}
        </div>
      </div>
    );
  }