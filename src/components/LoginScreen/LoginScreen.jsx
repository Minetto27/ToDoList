import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginScreen.css';

function LoginScreen(props){  
    
    const { onPage, onLogged, stateLogin} = props;

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [statusLogin, setStatusLogin] = useState('no');

    const valuePage = () => onPage('register');


    const formSubmit = (event) => {
        event.preventDefault();
        if(username !== ''){

            axios.post("http://localhost/BITXYZ/php/controller/all_controller.php?act=loginUser&username="+username+"&password="+password)
            .then((response)=> {
                if (response.data.operation === 'logged') {
                    alert('Logged Success!');
                    setUsername('');
                    setPassword('');
                    setStatusLogin('yes');
                    onLogged(response.data.id_user);
                    onPage('home');
                } else {
                    alert('Username and password do not exist !');
                    setUsername('');
                    setPassword('');
                }
            });           
        }
       
    }

    useEffect(()=>{
        if (stateLogin === 0) {
            setStatusLogin('no');
        }
    }, [stateLogin])


    return (
        <>
        <form className='loginCard' onSubmit={formSubmit} style={{ display: statusLogin === 'no' ? '' : 'none'}}>
            <p>Username</p>
            <input onChange={(event)=>setUsername(event.target.value)} type="text" value={username}/>
            <p>Password</p>
            <input onChange={(event)=>setPassword(event.target.value)} type="password" value={password}/>
            <p className='registerNow' onClick={valuePage}>Register new account!</p>
            <button type='submit'>Login</button>
           
        </form>
        <div style={{ display: statusLogin === 'no' ? 'none' : ''}}>
            <h1>Logged</h1>
        </div>
    </>
    )
    
}


export default LoginScreen;
