import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import Conditional from './Conditional';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SeriesResult from './SeriesResult';
import classes from './SeriesResult.module.css';

class SeriesResults extends Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		results: PropTypes.array,
	};

	state = {
		width: 0, height: 0,
	};

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	};

	render() {
		let naturalSlideHeight = 200;
		if (this.state.width <= 375) {
			naturalSlideHeight = 300;
		} else if (this.state.width <= 1200) {
			naturalSlideHeight = 240;
		}

		return <div>
			<Conditional if={this.props.isLoading}>
				<div>
					<h1>Series are loading</h1>
				</div>
			</Conditional>
			<CarouselProvider
				visibleSlides={this.state.width < 767 ? 1 : 2}
				totalSlides={this.props.results.length + 1}
				step={1}
				naturalSlideWidth={400}
				naturalSlideHeight={naturalSlideHeight}
				infinite
				hasMasterSpinner={this.props.isLoading} >
				<div className="container">
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
									{/* <div className="d-none d-md-block" style={{ */}
									{/*	width: '250px', */}
									{/*	height: '250px', */}
									{/*	background: 'url(https://pluspng.com/img-png/kitten-png--243.png) 50% 50% no-repeat', */}
									{/* }}/> */}
									<img className="d-none d-md-block" src="https://pluspng.com/img-png/kitten-png--243.png" alt="sad kitten" style={{
										width: '200px',
										height: '250px',
									}} />
									<div className="card-body d-flex flex-column align-items-start">
										<h3 className="mb-0">
											<a className="text-dark" href="#">No more results to show</a>
										</h3>
										<p className="card-text mb-auto">Try changing your search query to find more results</p>
									</div>
								</div>
							</div>
						</Slide>
					</Slider>
				</div>
				<ButtonBack className={classes.buttonBack}><i className={classes.left} /></ButtonBack>
				<ButtonNext className={classes.buttonNext}><i className={classes.right} /></ButtonNext>
			</CarouselProvider>
		</div>;
	}
}

export default SeriesResults;
