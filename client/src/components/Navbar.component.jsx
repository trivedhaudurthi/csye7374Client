import React from 'react';

import '../PageStyles/Home.styles.css'

class Navbar extends React.Component{
    constructor(props){
        super(props);
    }

    login() {
        return <input type="button" value="Login"/>
    }

    logout(){
        return <input type="button" value="Logout" />
    }

    getUserName(){
        const name =localStorage.getItem("username");
        return name?name:"";
    }

    render(){
        return (
        <div className="nav-container">
            <div className ="org-name">
                <h2>HumbleBoot</h2>
            </div>
            <div className ="search-bar-container">
                <input type ="text" />
                <input type="button" value ="search" />
            </div>
            <div className="user-details-container">
                {this.getUserName()}
                {this.login()}
            </div>
        </div>
        )
    }
}
export default Navbar;