import kmeansService from '../../src/services/kmeans.service';

describe('calculate', () => {
	it('should calculate', async () => {
		const compare = (num1, num2) => Math.abs(num1 - num2);
		const calculateCentroids = (nums) => nums[0];
		expect(kmeansService.calculate([1, 2, 3, 4, 5, 6, 7], [1, 2], compare, calculateCentroids, 500))
			.toMatchSnapshot();
	});
});
