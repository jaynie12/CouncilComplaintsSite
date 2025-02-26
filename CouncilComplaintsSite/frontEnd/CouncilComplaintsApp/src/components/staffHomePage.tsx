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
    <div >
    <button
      type="button"

      className="border border-gray-800 px-4 py-2 rounded uppercase"
      style={{ 
        width: "300px", 
        height: "100px", 
        display: "flex", 
        justifyContent: "center",

        alignItems: "center", 
        gap: "10px",
        margin: "5em",
        padding: "5em"
      }} 
      {...attributes}
    >
      {children} 
    </button>
</div>

  );
}


export default function staffHomePage() {
    const [raiseCaseClicked, setRaiseCaseClicked] = useState(false);
    const [dataAnalysisClicked, setDataAnalysisClicked] = useState(false);
    const [updateCaseClicked, setUpdateCaseClicked] = useState(false);

    return (  
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div   style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        marginTop: "20px",
        marginBottom: "20px"
      }}>
        <CustomButton onClick={() =>{ setRaiseCaseClicked(true); setDataAnalysisClicked(false); setUpdateCaseClicked(false);}}>
          Raise a case
        </CustomButton>
        <CustomButton onClick={() => { setDataAnalysisClicked(true); setUpdateCaseClicked(false);  setRaiseCaseClicked(false)}}>
          Analyze issues and cases
        </CustomButton>
        <CustomButton onClick={() =>{setUpdateCaseClicked(true); setRaiseCaseClicked(false); setDataAnalysisClicked(false);}}>
          Update and Assign cases
        </CustomButton>
        </div>
        <div style={{ marginTop: "20px", width: "80%", maxWidth: "800px", padding: "20px", textAlign: "center" }} className="content">
          {raiseCaseClicked === true && <CaseForm />}
          {dataAnalysisClicked === true && <CaseAnalysisForm />}
          {updateCaseClicked === true&& <Table />}
        </div>
      </div>
    );
  }