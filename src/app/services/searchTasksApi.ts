import {
  CreateSearchTaskForm,
  FoundUsersRequest,
  FoundUsersResponse,
  SearchTask,
  SearchTasksRequest,
  SearchTasksResponse
} from 'features/searchTasks/types';
import api from './api';

const searchTaskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSearchTask: builder.mutation<null, CreateSearchTaskForm>({
      query: (body) => ({
        url: '/search-tasks',
        method: 'POST',
        body
      })
    }),
    getSearchTasks: builder.query<SearchTasksResponse, SearchTasksRequest>({
      query: (params) => ({
        url: '/search-tasks',
        params
      })
    }),
    getSearchTask: builder.query<SearchTask, string>({
      query: (id) => ({
        url: `/search-tasks/${id}`
      })
    }),
    getFoundUsers: builder.query<FoundUsersResponse, FoundUsersRequest>({
      query: ({ taskId, ...params }) => ({
        url: `/search-tasks/${taskId}/found-users`,
        params
      })
    })
  })
});

export const {
  useCreateSearchTaskMutation,
  useGetSearchTasksQuery,
  useGetSearchTaskQuery,
  useGetFoundUsersQuery
} = searchTaskApi;
export default searchTaskApi;
