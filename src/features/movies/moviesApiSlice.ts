import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Movie {
  id: number
  title: string
  medium_cover_image: string
}

export interface MovieApiResponse {
  data: {
    movies: Movie[]
    total: number
    skip: number
    limit: number
  }
}

export const moviesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://yts.mx/api/",
  }),
  reducerPath: "moviesApi",
  tagTypes: ["Movies"],
  endpoints: build => ({
    getMovies: build.query<MovieApiResponse, number>({
      query: (limit = 10) => `v2/list_movies.json?limit=${limit}`,
      providesTags: (result, error, id) => [{ type: "Movies", id }],
    }),
    getMovieDetails: build.mutation<MovieApiResponse, number>({
      query: (movieId: undefined | number) =>
        `v2/movie_details.json?movie_id=${movieId}`,
    }),
  }),
})

export const { useGetMoviesQuery, useGetMovieDetailsMutation } = moviesApiSlice
