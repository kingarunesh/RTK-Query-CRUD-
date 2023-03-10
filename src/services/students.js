import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
    reducerPath: "studentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),

    tagTypes: ["Student"],

    endpoints: (builder) => ({
        // get all students list
        getStudents: builder.query({
            query: () => "students",
            transformResponse: (res) => res.reverse(),
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

        // update student
        updateStudent: builder.mutation({
            query: ({ id, ...student }) => ({
                url: `students/${id}`,
                method: "PUT",
                body: student,
            }),
            invalidatesTags: ["Student"],
        }),

        // delete student
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `students/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Student"],
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = studentsApi;
