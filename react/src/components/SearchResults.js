import React, { Component } from 'react';
import SearchResult from './SearchResult';

class SearchResults extends Component {
	render = () => <div>
		<SearchResult image="https://i.imgur.com/Ka4mk2q.jpg" title="Should we feed cats?" author="James"/>
		<SearchResult image="https://i.imgur.com/Jyr2QUc.jpg" title="Are cats evil?" author="Not-a-cat"/>
		<SearchResult image="https://i.imgur.com/xw4GsA6.jpg" title="What is a cat, really?" author="Catty McCattyson" />
		<SearchResult image="https://i.imgur.com/G5pfP.jpg" title="Cats in space?" author="Captain Cat"/>

	</div>;
}

export default SearchResults;
