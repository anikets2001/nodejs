import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["Notes"],

  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Notes"],
    }),
    searchNotes: builder.query({
      query: (title) => `/notes/search?title=${encodeURIComponent(title)}`,
    }),
    addNewNote: builder.mutation({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Notes"],
    }),
    editNote: builder.mutation({
      query: ({ id, ...updatedNote }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: updatedNote,
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useSearchNotesQuery,
  useAddNewNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
