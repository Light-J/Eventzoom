import React from 'react';
import PropTypes from 'prop-types';
import {
	Slider, Slide, ButtonBack, ButtonNext, WithStore,
} from 'pure-react-carousel';
import Conditional from './Conditional';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SeriesResult from './SeriesResult';
import classes from './SeriesResult.module.css';

class SeriesResults extends React.Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		results: PropTypes.array,
		carouselStore: PropTypes.object,
		setStoreState: PropTypes.func,
	};

	state = {
		width: 0,
		height: 0,
		currentSlide: 0,
	};

	componentDidUpdate(prevProps) {
		if (prevProps.results !== this.props.results) {
			this.props.carouselStore.setStoreState({ currentSlide: 0 });
		}
	}

	render() {
		return <div>
			<Conditional if={this.props.isLoading}>
				<div>
					<h1>Series are loading</h1>
				</div>
			</Conditional>
			<div className="container mb-2">
				<Slider>
					{this.props.results.map((result, index) => {
						const {
							image, title, description, _id,
						} = result;
						return (
							// eslint-disable-next-line react/jsx-key,max-len
							<Slide index={index}><SeriesResult key={_id} image={image} title={title} description={description} id={_id}/></Slide>
						);
					})}
					<Slide index={-1}>
						<div className="col">
							<div className="card flex-md-row mb-4 box-shadow">
								<img className="d-none d-md-block" src="https://pluspng.com/img-png/kitten-png--243.png" alt="sad kitten" style={{
									width: '200px',
									height: '250px',
								}} />
								<div className="card-body d-flex flex-column align-items-start">
									<h3 className="mb-0">
											No more results
									</h3>
									<p className="card-text mb-auto">Try changing your search to find more results</p>
								</div>
							</div>
						</div>
					</Slide>
				</Slider>
			</div>
			<ButtonBack className={classes.buttonBack}><i className={classes.left} /></ButtonBack>
			<ButtonNext className={classes.buttonNext}><i className={classes.right} /></ButtonNext>
		</div>;
	}
}

export default WithStore(SeriesResults);
