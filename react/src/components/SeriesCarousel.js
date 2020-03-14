import React, { Component } from 'react';
import { CarouselProvider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import PropTypes from 'prop-types';
import SeriesResults from './SeriesResults';
import classes from './SeriesResult.module.css';

class SeriesCarousel extends Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		results: PropTypes.array,
	};

	state = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	componentDidMount() {
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	};

	render() {
		// This sets the height of the slides in the carousel
		// It is a required value https://www.npmjs.com/package/pure-react-carousel
		// and I have no idea how to set it using CSS media queries
		let naturalSlideHeight = 400;
		if (this.state.width <= 991) {
			naturalSlideHeight = 400;
		} else if (this.state.width <= 1200) {
			naturalSlideHeight = 340;
		}

		return <CarouselProvider style={{ paddingBottom: '40px' }}
			visibleSlides={this.state.width < 768 ? 1 : 3}
			totalSlides={this.props.results.length + 1}
			step={1}
			naturalSlideWidth={400}
			naturalSlideHeight={naturalSlideHeight}
			infinite
			hasMasterSpinner={this.props.isLoading}>
			<SeriesResults
				height={naturalSlideHeight}
				results={this.props.results}
				isLoading={this.props.isLoading} />
			<ButtonBack className={classes.buttonBack}><i className={classes.left} /></ButtonBack>
			<ButtonNext className={classes.buttonNext}><i className={classes.right} /></ButtonNext>
		</CarouselProvider>;
	}
}

export default SeriesCarousel;
