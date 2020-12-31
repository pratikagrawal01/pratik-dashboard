import React from 'react';
import '../css/styles.css';

function EnvLinks(){
    return(
        <div className="env-links">
                <a className="nav-link active" href="#">DEV</a>
                <a className="nav-link" href="#">QA</a>
                <a className="nav-link" href="#">QA2</a>
                <a className="nav-link" href="#">QA3</a>
                <a className="nav-link" href="#">PERF</a>
                <a className="nav-link" href="#">PROD</a>
            </div>
    )
}

export default EnvLinks;