import arrayEqual from 'array-equal';

const calculate = (data, paramClusters, distance, mutate, iterations = 500) => {
	let clusters = [...paramClusters];
	let pastResults = [];
	let currentResults = [];
	let iterationCount = 0;
	do {
		iterationCount++;
		pastResults = currentResults;
		// calculates the closest cluster to each node.
		// eslint-disable-next-line no-loop-func
		currentResults = data.map((entry) => {
			const dataPoints = clusters.map((currCluster) => distance(entry, currCluster));
			// get the smallest distance
			const minimumDistance = Math.min(...dataPoints);
			return dataPoints.findIndex((v) => v === minimumDistance);
		});
		// mutates the clusters
		clusters = clusters.map((cluster) => mutate(cluster));
	} while (!arrayEqual(currentResults, pastResults) && iterationCount < iterations);
	// converts from an array with numbers to actual results
	return data.reduce((reducer, current, index) => {
		// eslint-disable-next-line no-param-reassign
		if (!reducer[currentResults[index]]) {
			// eslint-disable-next-line no-param-reassign
			reducer[currentResults[index]] = [];
		}
		reducer[currentResults[index]].push(current);
		return reducer;
	}, []);
};

export default { calculate };
