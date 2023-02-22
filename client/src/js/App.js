import React , {useEffect} from 'react';
import RouteMain from './Route-main';
import RouteLogin from './Route-Login';
import RouteAbout from './Route-About';
import RouteConfig from './Route-Config';

import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';

function App(){
  return(
    <Router>
      <Switch> 
        <Route path="/login">
          <RouteLogin />
        </Route>
        <Route path="/index">
          <RouteMain />
        </Route>
        <Route path="/about">
          <RouteAbout />
        </Route>
        <Route path="/config">
          <RouteConfig />
        </Route>
        <Route path="/">
          <RouteLogin />
        </Route>
      </Switch>
    </Router>    
  )
}

export default App;