import React from 'react';
import PropTypes from 'prop-types';
import {
	Slider, Slide, WithStore,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SeriesResult from './SeriesResult';

class SeriesResults extends React.Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		results: PropTypes.array,
		carouselStore: PropTypes.object,
		setStoreState: PropTypes.func,
		height: PropTypes.number,
	};


	componentDidUpdate(prevProps) {
		if (prevProps.results !== this.props.results) {
			this.props.carouselStore.setStoreState({ currentSlide: 0 });
		}
	}

	render = () => <Slider className="container">
		{this.props.results.map((result, index) => {
			const {
				image, title, description, _id,
			} = result;
			return (
				<Slide index={index} key={_id}>
					{/* eslint-disable-next-line max-len */}
					<SeriesResult image={image} title={title} description={description} id={_id} height={this.props.height}/>
				</Slide>
			);
		})}
		<Slide index={-1}>
			<div className="col">
				<div className="card flex-md-row mb-4 box-shadow">
					<img className="d-none d-md-block" src="https://pluspng.com/img-png/kitten-png--243.png" alt="sad kitten" style={{
						width: '200px',
						height: '250px',
					}} />
					<div className="card-body d-flex flex-column align-items-start" style={{ height: `${this.props.height}px` }}>
						<h3 className="mb-0">
											No more results
						</h3>
						<p className="card-text mb-auto">Try changing your search to find more results</p>
					</div>
				</div>
			</div>
		</Slide>
	</Slider>;
}

export default WithStore(SeriesResults);
