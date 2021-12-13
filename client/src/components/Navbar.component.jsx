import axios from 'axios';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import '../PageStyles/Home.styles.css';
import * as constants from '../utils/constants';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            role:"",
            failureResopnse: null,
            onLogin:false,
            onHome:false,
            onInfo:false,
        }
    }

    async componentDidMount(){
        const url = `${constants.baseUrl}/validate`;
        const username = localStorage.getItem("username");
        const data =   localStorage.getItem("auth");
        // console.log(username);
        if(!username||!data){
            return;
        }
        const headers = {
            headers: {
                Authorization: 'Bearer ' + data
            }
        }
        try {
            const response = await axios.post(url,{},headers);
            localStorage.setItem("role",response.data.message);
            this.setState({...this.state,username:username,role:response.data.message});
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResopnse:error,username:"",role:""});
        }
    }

    onLogin = (event)=>{
        event.preventDefault();
        this.setState({...this.state,onLogin:true});
    }

    login() {
        return <input type="button" value="Login" onClick={this.onLogin}/>
    }

    onLogout = (event)=>{
        event.preventDefault();
        localStorage.setItem("username","");
        localStorage.setItem("auth","");
        localStorage.setItem("role","");
        this.setState({...this.state,username:""});
    }

    logout(){
        return <input type="button" value="Logout" onClick={this.onLogout} />
    }

    getUserName(){
        return <Link to={"/info"} className='nav-link'>
            {this.state.username}
        </Link>
    }

    render(){
        return (
        <div className="nav-container">
            <Link to={"/"} className='nav-link'><h2>HumbleBoot</h2></Link>
            <div className ="search-bar-container">
                <input type ="text" />
                <input type="button" value ="search" />
            </div>
            <div className="user-details-container">
                {this.getUserName()}
                {(this.state.username&&this.state.role==='user')&&<Link to={"/cart"} className='nav-link'>Cart</Link>}
                {this.state.username&&<Link to={"/orders"} className='nav-link'>Orders</Link>}
                {this.state.username?this.logout():this.login()}
            </div>
            {this.state.onLogin&&<Navigate to = {"/signin"} replace={true} />}
            {this.state.onInfo&&<Navigate to = {"/info"} replace={true}/>}
        </div>
        )
    }
}
export default Navbar;