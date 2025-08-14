import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const adminApi = createApi({
  reducerPath: 'adminApi',
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
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyAdmin: builder.query({
      query: () => '/admin/verify',
      providesTags: ['Admin'],
    }),
    getDashboardStats: builder.query({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useVerifyAdminQuery,
  useGetDashboardStatsQuery,
} = adminApi;