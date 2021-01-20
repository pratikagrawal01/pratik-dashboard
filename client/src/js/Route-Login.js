import React from 'react';
import GoogleLogin from 'react-google-login';
import {useHistory} from 'react-router-dom';
import '../css/styles.css';

function RouteLogin(){
  const history = useHistory();
  const responseGoogle=(res)=>{
      fetch('/api/validateLogin', {
            method:'POST',
            dataType:'jsonp',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({token:res.tokenObj.id_token})
        }).then((result)=>{
            result.json().then((resp)=>{
                if(resp==='Authentication Failure'){
                    history.push("/login");
                }else{
                    history.push(`/index`);
                }
            })
        })
  }

  return(
    <div className='google-login'>   
        <div className="login-msg"> 
            <h2>You will need to login with your Costco Gmail Account.</h2>                          
        </div>    
        <div className='sign-in' >
          <GoogleLogin
              clientId="809312429334-6pqlrjvg3gnrmtlguge3akdk9155gt6e.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
          /> 
        </div>     
        <div className="login-warning">
            <ul>
                <li>
                    Make sure you login with you Costco account. 
                </li>
                <li>
                    Make sure you have your cookies enabled. 
                </li>
            </ul>
        </div>  
    </div>
  )
}

export default RouteLogin;