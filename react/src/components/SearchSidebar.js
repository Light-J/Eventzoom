import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SearchSidebar.css';
import { DateRange } from 'react-date-range';
import LocationSearchInput from "../containers/LocationSearchInput";
import RadiusSlider from "../containers/RadiusSlider";
import 'react-rangeslider/lib/index.css'


class SearchSidebar extends Component {
	static propTypes = {
		updateInput: PropTypes.func.isRequired,
		updateDates: PropTypes.func.isRequired,
		search: PropTypes.func.isRequired,
		startDate: PropTypes.object.isRequired,
		endDate: PropTypes.object.isRequired,
		toggle: PropTypes.func.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
		  maxDistance: 50,
		  location: "", 
		  radiusSelector: false
		};
	}

	handleChange = (e) => {
		let { target } = e;
		if (target.id === "specificLocation" || target.name === "specificLocation"){
			if (target.value && target.value.location){
				this.setState({location: {...target.value.location, name: target.value.name}, radiusSelector: true}, ()=>{
					e.target.value = { 
						location: this.state.location,
						maxDistance: this.state.maxDistance
					}
					this.props.updateInput(e);
				})
			}
			else {
				this.setState({radiusSelector: false});
				this.props.resetLocationFilter();
			}
		}
		else if (target.id === "radius"){
			this.setState({maxDistance: e.target.value}, ()=>{
				if(this.state.location){
					e.target.value = { 
						location: this.state.location,
						maxDistance: this.state.maxDistance
					}
					this.props.updateInput(e);
				}
			})

		}
	}

	render = () => <div className="card">
		<div className="card-header">Advanced Search</div>
		<div className="card-body">
			<button className="btn btn-success btn-block mb-2" onClick={this.props.toggle}>
				Back to basic search
			</button>
			Talk title:
			<input type="text" className="form-control" placeholder="My new horse" id="title" onChange={(event) => this.props.updateInput(event)} />
			Speaker:
			<input type="text" className="form-control" placeholder="Horsey McHorseman" id="speaker" onChange={(event) => this.props.updateInput(event)} />
			<label htmlFor="specificLocation" className="col-form-label">Specific Location</label>
			<LocationSearchInput noMap={true} noFullAddress={true} handleChange={this.handleChange}/>
			{this.state.radiusSelector && <RadiusSlider handleChange={this.handleChange}/>}
			Date range:<br/>
			<DateRange
				ranges={
					[
						{
							startDate: this.props.startDate,
							endDate: this.props.endDate,
							key: 'selection',
						},
					]
				}
				onChange={this.props.updateDates}
			/>

			<button className="btn btn-success mt-2" onClick={this.props.search}>Search</button>
		</div>
	</div>
}

export default SearchSidebar;
