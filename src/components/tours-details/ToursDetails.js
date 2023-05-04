import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ToursDetails = () => {
	// const { tourId } = useParams();
	const { state } = useLocation();

	useEffect(() => {
		console.log('fetch data by id', state.id);
	}, [state.id]);

	return <div>Tour id : {state.id || 'not found'}</div>;
};

export default ToursDetails;
