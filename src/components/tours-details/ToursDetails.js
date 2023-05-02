import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ToursDetails = () => {
	const { tourId } = useParams();

	useEffect(() => {
		console.log('fetch data by id', tourId);
	}, [tourId]);

	return <div>Tour id : {tourId}</div>;
};

export default ToursDetails;
