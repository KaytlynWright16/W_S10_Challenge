import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3003/api/pizza'}),
    tagTypes: ['orders'],
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/history',
            providesTags: ['orders']
        }),
        postOrder: builder.mutation({
            query: order => ({
                url: '/order',
                method: 'POST',
                body: order 
            }),
            invalidateTags: ['Orders'],
        })
    })
})

export const {useGetOrderQuery, usePostOrderMutation} = pizzaApi;