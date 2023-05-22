import { City, University } from 'types/vk';
import api from './api';

const vkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], string>({
      query: (q) => ({
        url: '/vk/cities',
        params: { q }
      })
    }),
    getUniversities: builder.query<University[], { city: number; q: string }>({
      query: (params) => ({
        url: '/vk/universities',
        params
      })
    }),
    getFaculties: builder.query<University[], number>({
      query: (university) => ({
        url: '/vk/faculties',
        params: {
          university
        }
      })
    }),
    getChairs: builder.query<University[], number>({
      query: (faculty) => ({
        url: '/vk/chairs',
        params: {
          faculty
        }
      })
    })
  })
});

export const {
  useGetCitiesQuery,
  useGetUniversitiesQuery,
  useGetFacultiesQuery,
  useGetChairsQuery
} = vkApi;
export default vkApi;
