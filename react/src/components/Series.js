import React, { Component } from 'react';
import SearchResults from './SearchResults';
import SeriesInfo from './SeriesInfo';

class Series extends Component {
	render = () => <div className="container mt-3">
		<SeriesInfo title="Example Series" author="Josef" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam est nisl, at sollicitudin sapien elementum sed. Aenean tempor nisl enim. Mauris porttitor bibendum nunc in laoreet. Vivamus congue egestas pretium. In eleifend arcu nibh. Donec varius ultricies nisi id lacinia. Etiam a vehicula nisl. Nam dui metus, luctus et odio sit amet, feugiat vehicula sem. Duis a orci nec lacus ultrices interdum eget a augue. Sed sagittis eget elit a consectetur." image="https://www.rainforesttrust.org/wp-content/uploads/page-header_rainforest_by-shutterstock-Dennis-van-de-Water.jpg" />
		<div className="row mt-3">
			<div className="col-md-12">
				<h5 className="text-center">Events in this series</h5>
				<SearchResults isLoading={false} results={[{
					_id: '5e4555c4c6fe903ac44ba8e9', title: 'Cat Test Event', description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", image: 'https://i.imgur.com/WsxRdVG.jpg', speaker: 'Cat Berathian', location: 'Cardiff', disabilityaccess: true, organiser: 'Catty Catty cat', capacity: 90, date: '2020-03-03T00:00:00.000Z',
				}, {
					_id: '5e4555c4c6fe903ac44ba8ea', title: 'Cat Test Event 2', description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", image: 'https://i.imgur.com/vgZrB5U.jpg', speaker: 'Cat-lanister', location: 'Cardiff', disabilityaccess: false, organiser: 'Catty Catty cat', capacity: 46, date: '2020-03-03T00:00:00.000Z',
				}, {
					_id: '5e4555c4c6fe903ac44ba8eb', title: 'Cat Test Event 3', description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", image: 'https://i.imgur.com/HwIbeq1.jpg', speaker: 'Cat-lin Stark', location: 'Cardiff', disabilityaccess: false, organiser: 'A dog', capacity: 10, date: '2020-03-03T00:00:00.000Z',
				}, {
					_id: '5e4555c4c6fe903ac44ba8ec', title: 'Cat Test Event 4', description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", image: 'https://i.imgur.com/PtmP1yu.jpg', speaker: 'Catty mcCatperson', location: 'Cardiff', disabilityaccess: true, organiser: 'Catty', capacity: 34, date: '2020-03-03T00:00:00.000Z',
				}]}/>
			</div>
		</div>
	</div>
}

export default Series;