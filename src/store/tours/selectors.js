export const selectTours = (state) => state.tours;

// export const selectToursWithDescription = createSelector([selectTours], (result) => {
// 	// console.log('work new selector');

// 	const itemsFiltered = result.items.filter((el) => el.description);

// 	return {
// 		total_items: itemsFiltered.length,
// 		items: itemsFiltered,
// 	};
// });
