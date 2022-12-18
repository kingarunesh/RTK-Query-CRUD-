import { configureStore } from "@reduxjs/toolkit";
import { studentsApi } from "./services/students";

export const store = configureStore({
    reducer: {
        [studentsApi.reducerPath]: studentsApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentsApi.middleware),
});
