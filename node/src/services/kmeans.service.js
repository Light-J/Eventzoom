import arrayEqual from 'array-equal';


const convertToArray = (data, currentResults) => data.reduce((reducer, current, index) => {
	// eslint-disable-next-line no-param-reassign
	if (!reducer[currentResults[index]]) {
		// eslint-disable-next-line no-param-reassign
		reducer[currentResults[index]] = [];
	}
	reducer[currentResults[index]].push(current);
	return reducer;
}, []);

// based on pseudocode from
// https://www.researchgate.net/figure/Pseudo-code-of-the-Lloyds-K-Means-algorithm-K-Means-is-a-simple-algorithm-that-has_fig1_278710586
// loosely based on wikipedia's explanation at https://en.wikipedia.org/wiki/K-means_clustering
// accessed 12 March 2020
const calculate = (data, paramCentroids, distance, calculateCentroids, iterations = 500) => {
	let centroids = [...paramCentroids];
	let pastResults = [];
	let currentResults = [];
	let iterationCount = 0;
	do {
		iterationCount++;
		pastResults = currentResults;
		// calculates the closest centroid to each entry.
		// eslint-disable-next-line no-loop-func
		currentResults = data.map((entry) => {
			const dataPoints = centroids.map((centroid) => distance(entry, centroid));
			// get the smallest distance
			const minimumDistance = Math.min(...dataPoints);
			return dataPoints.findIndex((v) => v === minimumDistance);
		});
		// gets the current entries per centroid
		const converted = convertToArray(data, currentResults);
		// regenerates new centroids based on entries per centroid
		centroids = converted.map((entry) => calculateCentroids(entry));
	// repeats until it gets the same result twice in a row or it caps out the iteraction count
	} while (!arrayEqual(currentResults, pastResults) && iterationCount < iterations);
	// converts from an array with numbers to actual results
	return convertToArray(data, currentResults);
};

export default { calculate };
