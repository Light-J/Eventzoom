import React, { Component } from 'react';
import SearchResults from './SearchResults';
import SeriesInfo from './SeriesInfo';

class Series extends Component {
	render = () => <div className="container mt-3">
		<SeriesInfo title="Example Series" author="Josef" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam est nisl, at sollicitudin sapien elementum sed. Aenean tempor nisl enim. Mauris porttitor bibendum nunc in laoreet. Vivamus congue egestas pretium. In eleifend arcu nibh. Donec varius ultricies nisi id lacinia. Etiam a vehicula nisl. Nam dui metus, luctus et odio sit amet, feugiat vehicula sem. Duis a orci nec lacus ultrices interdum eget a augue. Sed sagittis eget elit a consectetur." image="https://www.rainforesttrust.org/wp-content/uploads/page-header_rainforest_by-shutterstock-Dennis-van-de-Water.jpg" />
		<div className="row mt-3">
			<div className="col-md-12">
				<h5 className="text-center">Events in this series</h5>
				<SearchResults />
			</div>
		</div>
	</div>
}

export default Series;
