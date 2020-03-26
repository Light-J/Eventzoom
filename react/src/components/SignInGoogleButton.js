import React, { Component } from 'react';
import serverConfig from '../config/server';

class SignInGoogleButton extends Component {
	googleSignIn = () => {
		window.location.href = `${serverConfig.url}users/auth/google`;
	};

	render = () => <buton className="btn btn-light" role="button" style={{ textDecoration: 'none' }} onClick={this.googleSignIn}>
		<img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
		Sign in with Google
	</buton>
}

export default SignInGoogleButton;
