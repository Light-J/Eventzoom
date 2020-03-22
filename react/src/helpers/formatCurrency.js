import regionConfig from '../config/region';

export default (number) => new Intl.NumberFormat(regionConfig.region, { style: 'currency', currency: regionConfig.currency }).format(number / 100);
