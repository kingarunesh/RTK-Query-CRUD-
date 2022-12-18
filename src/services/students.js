import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
    reducerPath: "studentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),

    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => "students",
        }),
    }),
});

export const { useGetStudentsQuery } = studentsApi;
