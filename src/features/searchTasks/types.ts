import { WithPaginationRequest, WithPaginationResponse } from '../../app/types';

interface SearchTask {
  id: string;
  title: string;
  status: 'in_progress' | 'completed' | 'error';
}

interface FoundUser {
  id: string;
  vk_id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  img_url: string;
}

interface CreateSearchTaskForm {
  title: string;
  age_from?: number;
  age_to?: number;
  birth_year?: number;
  birth_month?: number;
  birth_day?: number;
  city?: number;
  university?: number;
  university_faculty?: number;
  university_chair?: number;
  university_year: number;
  has_photo: boolean;
  status: number;
  keywords: string[];
}

type SearchTasksRequest = WithPaginationRequest;

interface SearchTasksResponse extends WithPaginationResponse {
  tasks: SearchTask[];
}

interface FoundUsersRequest extends WithPaginationRequest {
  taskId: string;
}

interface FoundUsersResponse extends WithPaginationResponse {
  found_users: FoundUser[];
}

export type {
  SearchTask,
  FoundUser,
  CreateSearchTaskForm,
  SearchTasksRequest,
  SearchTasksResponse,
  FoundUsersRequest,
  FoundUsersResponse
};
