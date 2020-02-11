import React from 'react';

export default class Login extends React.Component {
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

onSubmit = (e) => {
	// const user = JSON.parse(localStorage.getItem('user'));
	// if (user && user.username === this.state.username && user.password === this.state.password) {
	// 	this.props.history.push('/');
	// }

	e.preventDefault();
};

render() {
	return (<form className="container" onSubmit={this.handleSubmit}>
		<div className="form-group">
			<label HtmlFor="staticEmail" className="col-sm-2 col-form-label">Username</label>
			<div className="col-sm-10">
				<input className="form-control" type="username" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} required />
			</div>
		</div>
		<div className="form-group">
			<label HtmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
			<div className="col-sm-10">
				<input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
			</div>
		</div>
		<div>
			<button className="btn btn-outline-primary" onClick={(e) => this.onSubmit(e)}> Login </button>
		</div>
		<div>
			<p className="mt-5 mb-3 text-muted"> Event Zoom </p>
		</div>
	</form>
	);
}
}
