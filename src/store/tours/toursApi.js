import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/api';

export const toursApi = createApi({
	reducerPath: 'tours',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['TOURS'],
	endpoints: (builder) => ({
		getTours: builder.query({
			query: (query) => (query ? `/tours?name_like=${query}` : '/tours'),
			transformResponse: (res) => ({
				total_items: res.length,
				items: res,
			}),
			providesTags: ['TOURS'],
		}),
		addNewTour: builder.mutation({
			query: ({ tour }) => ({
				url: '/tours',
				method: 'POST',
				body: tour,
			}),
			invalidatesTags: ['TOURS'],
		}),
	}),
});

export const { useGetToursQuery, useAddNewTourMutation } = toursApi;
