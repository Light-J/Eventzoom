import React from 'react'

export default class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginError: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && username === this.state.username && user.password === this.state.password) {
            this.props.history.push('/');
        }
    };

    render(){
        return (<form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                <label for="InputUsername"> Username</label>
                <div className="col-sm-10">
						<input className="form-control" type="username" name="username" placeholder="Username"
							value={this.state.username} onChange={this.handleChange} required />
					</div>
                </div>

                <div className="form-group row">
                <label for="InputEmail"> Email</label>
                <div className="col-sm-10">
						<input className="form-control" type="email" name="email" placeholder="Email"
							value={this.state.username} onChange={this.handleChange} required />
					</div>
                </div>

                <div className="form-group row">
                <label for="InputPassword"> Password </label>
                <div className="col-sm-10">
						<input className="form-control" type="email" name="email" placeholder="Email"
							value={this.state.username} onChange={this.handleChange} required />
					</div>
                </div>

                <div className="form-group row">
                <label for="InputPasswordConfirmation"> Password</label>
                <div className="col-sm-10">
						<input className="form-control" type="email" name="email" placeholder="Email"
							value={this.state.username} onChange={this.handleChange} required />
					</div>
                </div>
            </form>
            )
    }
}
