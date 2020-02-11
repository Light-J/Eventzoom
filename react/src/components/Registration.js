import React from 'react';

export default class Registration extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			loginError: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

onSubmit = () => {
	// const user = JSON.parse(localStorage.getItem('user'));
	// if (user && username === this.state.username && user.password === this.state.password) {
	// 	this.props.history.push('/');
	// }
};

render() {
	return (<form className="container" onSubmit={this.handleSubmit}>
		<div className="form-group">
			<label HtmlFor="InputUsername"> Username</label>
			<div className="col-sm-10">
				<input id='InputUsername' className="form-control" type="username" name="username" placeholder="Username"
					value={this.state.username} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label HtmlFor="InputEmail"> Email</label>
			<div className="col-sm-10">
				<input id="InputEmail" className="form-control" type="email" name="email" placeholder="Email"
					value={this.state.email} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label For="InputPassword">Password </label>
			<div className="col-sm-10">
				<input id="InputPassword" className="form-control" type="password" name="password" placeholder="Password"
					value={this.state.password} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label HtmlFor="InputPasswordConfirmation">Password</label>
			<div className="col-sm-10">
				<input id="InputPasswordConfirmation" className="form-control" type="passwordConfirmation" name="passwordConfirmation" placeholder="Password Confirmation"
					value={this.state.passwordConfirmation} onChange={this.handleChange} required />
			</div>
		</div>
		<div>
			<button className="btn btn-outline-primary" type="submit"> Register</button>
		</div>
		<div>
			<p className="mt-5 mb-3 text-muted"> Event Zoom </p>
		</div>
	</form>
	);
}
}
