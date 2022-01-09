import {Redirect} from 'react-router';
import React, { useState } from 'react';

function Header(props) {
    const[redirectVal,redirectValFn] = useState(null);
    let redirectToSignIn = (e) => {
        redirectValFn(<Redirect to="/login"/>);
    }
  return (
    <div className="container-fullwidth">
        {redirectVal}
        <div className="row border-bottom">

        </div>
        <div className="row border-bottom">

        </div>
        <div className="row border-bottom">

        </div>
        <div className="row border-bottom">

        </div>
        <div className="row border-bottom">
            <div className="col">
                <button type="button" onClick = {redirectToSignIn} style={{background:'none',border: 'none',color:'navy'}}>
                        Sign In
                </button>
            </div>
        </div>

    </div>

  );
}

export default Header
