import axios from 'axios';
import { useState, useRef } from 'react';
import './RegisterScreen.css';

function RegisterScreen(props){  


    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPass, setConfirmPass] = useState('');

    const inputPass = useRef();

    const formSubmit = (event) => {
        event.preventDefault();
        if (password === confirmPass){
           
            axios.post("http://localhost/BITXYZ/php/controller/all_controller.php?act=newUser&username="+username+"&password="+password)
        .then((response)=> {
            if(response.data.operation === true){
                alert('Success!');
                setUsername('');
                setPassword('');
                setConfirmPass('');
            } else if (response.data.operation === 'exist') {
                alert('Duplicate User!');
                setUsername('');
                setPassword('');
                setConfirmPass('');
            } else {
                alert('Error!');
                setUsername('');
                setPassword('');
                setConfirmPass('');
            }
        });
        } else {
            alert('Different Passwords');
            setPassword('');
            setConfirmPass('');
            inputPass.current.focus();
        }
    }


    return (
        <form className='registerCard' onSubmit={formSubmit}>
            <p>Username</p>
            <input onChange={(event)=>setUsername(event.target.value)} type="text" value={username}/>
            <p>Password</p>
            <input onChange={(event)=>setPassword(event.target.value)} type="password" value={password} ref={inputPass}/>
            <p>Confirm Password</p>
            <input onChange={(event)=>setConfirmPass(event.target.value)} type="password" value={confirmPass}/>
            <br />
            <button type='submit'>Register</button>
           
        </form>
    )
    
}


export default RegisterScreen;
