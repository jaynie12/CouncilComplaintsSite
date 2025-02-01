import axios  from 'axios';
// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities

import "./caseForm.css";
import React, { useState } from "react";

function CaseForm() {
    const [case_short_description, setShortDescription] = useState("");
    const [case_type, setCaseType] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
          case_short_description,
          case_type,
          image
        );
        // Add your form submission logic here
    };

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };
    const handleReset = () => {
        // Reset all state variables here
        setShortDescription("");
        setCaseType({
            english: true,
            maths: false,
            physics: false,
        });
        setImage("");
    };

    return (
        <div className="App">
            <h1>Form in React</h1>
            <fieldset>
                <form action="#" method="get">
                    <label for="case_short_description">
                        Case Description*
                    </label>
                    <input
                        type="text"
                        name="case_short_description"
                        id="case_short_description"
                        value={case_short_description}
                        onChange={(e) =>
                          setShortDescription(e.target.value)
                        }
                        placeholder="Enter details about the issue"
                        required
                    />
                    <label htmlFor="file">Upload Image*</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                        placeholder="Upload an image showing your issue"
                        required
                    />
                    <button
                        type="reset"
                        value="reset"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
            </fieldset>
        </div>
    );
}

export default CaseForm;
