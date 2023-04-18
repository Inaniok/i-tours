import { toursArray } from 'constants';

export const fetchTours = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				total_items: toursArray.length,
				items: [...toursArray],
			});
		}, 1000);
	});
};
