
import React, {useState} from 'react';
import './LoginForm.css';


function LoginForm() {
    const [name , setName] = useState('');
    const [password , setPassword] = useState('');
 
    // function to update state of name with 
    // value enter by user in form
    const handleChange =(e)=>{
      setName(e.target.value);
    }
      // function to update state of password with 
      // value enter by user in form
    const handlePasswordChange =(e)=>{
      setPassword(e.target.value);
    }
    // below function will be called when user 
    // click on submit button .
    const handleSubmit=(e)=>{
      if(password!=confPassword)  //NEED TO GET PASSWORD FROM THE API 
      {
        // if 'password' and 'confirm password'
        // does not match.
        alert("password Not Match");
      }
      else{
        // display alert box with user 
        // 'name' and 'email' details .
        alert('A form was submitted with Name :"' + name +
        '" ,Age :"'+age +'" and Email :"' + email + '"');
      }
      e.preventDefault();
 
    }
  return (
    <div className="App">
    <header className="App-header">
    <form onSubmit={(e) => {handleSubmit(e)}}>
     {/*when user submit the form , handleSubmit() 
        function will be called .*/}
    <h2> Council complaints form </h2>
    <h3> Login form </h3>
    <img src="/gfg.png" />
        <label >
          Name:
        </label><br/>
        <input type="text" value={name} required onChange={(e) => {handleSubmit(e)}} /><br/>
          { /*when user write in name input box , handleChange()
              function will be called. */}
        <label>
          Password:
        </label><br/>
        <input type="password" value={password} required onChange={(e)  => {handlePasswordChange(e)}} /><br/>
              {/* when user write in password input box ,
                  handlePasswordChange() function will be called.*/}
    <input type="submit" value="Submit"/>

      </form>
    </header>
    </div>
  );
}

export default LoginForm;