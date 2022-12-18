import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
    reducerPath: "studentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),

    tagTypes: ["Student"],

    endpoints: (builder) => ({
        // get all students list
        getStudents: builder.query({
            query: () => "students",
            providesTags: ["Student"],
        }),

        // single student
        getStudentById: builder.query({
            query: (id) => `students/${id}`,
        }),

        // add new student
        addStudent: builder.mutation({
            query: (studentData) => ({
                url: "students",
                method: "POST",
                body: studentData,
            }),
            invalidatesTags: ["Student"],
        }),
    }),
});

export const { useGetStudentsQuery, useGetStudentByIdQuery, useAddStudentMutation } = studentsApi;
