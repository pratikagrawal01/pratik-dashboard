import React , {useEffect} from 'react';
import Header from './Header';
import SiteLinks from './Site-Links';
import ApiLinks from './Api-Links';
import EnvLinks from './Env-Links';
import Footer from './Footer';
import IndexApiDisplay from './Index-Api-Display';

import Init from './Init';

function RouteMain(){
  useEffect(()=> {
    Init();
  });
  return(
    <div>
      <main>
        <Header />
        <SiteLinks />
        <ApiLinks />
        <EnvLinks />
        <IndexApiDisplay />
        <Footer />
        <div id="spinner"></div>
      </main>
    </div>    
  )
}

export default RouteMain;