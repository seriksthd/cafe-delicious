import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const galleryApi = createApi({
  reducerPath: 'galleryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Gallery'],
  endpoints: (builder) => ({
    getGalleryImages: builder.query({
      query: () => '/gallery',
      providesTags: ['Gallery'],
    }),
    uploadGalleryImage: builder.mutation({
      query: (image) => ({
        url: '/gallery',
        method: 'POST',
        body: image,
      }),
      invalidatesTags: ['Gallery'],
    }),
    deleteGalleryImage: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),
  }),
});

export const {
  useGetGalleryImagesQuery,
  useUploadGalleryImageMutation,
  useDeleteGalleryImageMutation,
} = galleryApi;