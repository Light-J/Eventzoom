import React from 'react';

export default class Registration extends React.Component {
	state = {
		username: '',
		password: '',
		loginError: '',
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (<form className="container" onSubmit={this.handleSubmit}>
			<div className="card border-0 shadow my-5">
				<div className="form-group">
					<label htmlFor="InputUsername" className="col-sm-2 col-form-label"> Username</label>
					<div className="col-sm-10">
						<input id='InputUsername' className="form-control" type="username" name="username" placeholder="Username"
							value={this.state.username} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="InputEmail" className="col-sm-2 col-form-label"> Email</label>
					<div className="col-sm-10">
						<input id="InputEmail" className="form-control" type="email" name="email" placeholder="Email"
							value={this.state.email} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label For="InputPassword" className="col-sm-2 col-form-label">Password </label>
					<div className="col-sm-10">
						<input id="InputPassword" className="form-control" type="password" name="password" placeholder="Password"
							value={this.state.password} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="InputPasswordConfirmation" className="col-sm-2 col-form-label">Password</label>
					<div className="col-sm-10">
						<input id="InputPasswordConfirmation" className="form-control" type="passwordConfirmation" name="passwordConfirmation" placeholder="Password Confirmation"
							value={this.state.passwordConfirmation} onChange={this.handleChange} required />
					</div>
				</div>
				<div>
					<button className="btn btn-outline-primary btn-block" type="submit"> Register</button>
				</div>
			</div>
		</form>
		);
	}
}
