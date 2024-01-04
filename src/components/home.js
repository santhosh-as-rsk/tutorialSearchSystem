import React from 'react';
import { Header, TopicsSearchBar } from './components';
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function Home(){

    return( 
        <React.Fragment>
            <div className="justify-content-md-center">
            <Header/>
            <br></br>
            <TopicsSearchBar/>
            </div>
        </React.Fragment>
    );
}

export default Home;