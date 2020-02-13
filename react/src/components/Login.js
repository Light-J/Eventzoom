import React from 'react';

export default class Login extends React.Component {
	state = {
		username: '',
		password: '',
		loginError: '',
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (<form className="container">
			<div className="card border-0 shadow my-5">
				<div className="form-group">
					<label HtmlFor="staticUsername" className="col-sm-2 col-form-label">Username</label>
					<div className="col-sm-10">
						<input className="form-control" type="username" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} required />
					</div>
				</div>
				<div className="form-group">
					<label HtmlFor="InputPassword" className="col-sm-2 col-form-label">Password</label>
					<div className="col-sm-10">
						<input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
					</div>
				</div>
				<div>
					<button className="btn btn-outline-primary btn-block"> Login </button>
				</div>
			</div>
		</form>
		);
	}
}
