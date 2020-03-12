import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SeriesResult extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	};

	thumbnailBGImage = () => ({
		backgroundImage: `url(${this.props.image})`,
	});


	render = () => <div className="col">
		<Link className="text-decoration-none text-reset" to={`/series/${this.props.id}`} >
			<div className="card flex-md-row box-shadow align-items-stretch">
				<div className="d-none d-md-block" style={{
					width: '2500px',
					height: '250px',
					background: `url(${this.props.image}) 50% 80% no-repeat`,
				}}/>
				<div className="card-body d-flex flex-column align-items-start">
					<h3 className="mb-0">
						<a className="text-dark" href="#">{this.props.title}</a>
					</h3>
					<p className="card-text mb-auto">{this.props.description}</p>
					<a href="#">Continue reading</a>
				</div>
			</div>
		</Link>
	</div>
}

export default SeriesResult;
