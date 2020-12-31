import React , {useEffect} from 'react';
import RouteMain from './Route-main';
import RouteLogin from './Route-Login';

import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';

function App(){
  return(
   <Router>
    <Route path="/login" component ={RouteLogin} />
    <Route path="/index" component ={RouteMain} />  
    <Route path="/" component ={RouteMain} />  
    </Router>
  )
}

export default App;