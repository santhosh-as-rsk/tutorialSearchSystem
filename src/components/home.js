import React from 'react';
import { TopicsSearchBar } from './components';
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function Home(){

    return( 
        <React.Fragment>
            <div>
            <br></br>
            <TopicsSearchBar/>
            </div>
        </React.Fragment>
    );
}

export default Home;