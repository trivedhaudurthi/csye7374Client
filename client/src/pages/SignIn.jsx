import React from "react";
import LoginForm from "../components/LogIn.component";

import SignupForm from "../components/SignUp.component";

import '../PageStyles/signin.styles.css';

class SignInPage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="signin-page-container">
                <SignupForm></SignupForm>
                <LoginForm></LoginForm>
            </div>
        )
    }
}
export default SignInPage;