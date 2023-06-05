import { WithPaginationRequest, WithPaginationResponse } from '../../app/types';

interface SearchTaskParams {
  age_from?: number;
  age_to?: number;
  birth_year?: number;
  birth_month?: number;
  birth_day?: number;
  city?: number;
  university?: number;
  university_faculty?: number;
  university_chair?: number;
  university_year?: number;
  has_photo?: boolean;
  status?: number;
  keywords: string[];
}

interface SearchTask {
  id: string;
  title: string;
  status: 'in_progress' | 'completed' | 'error';
  params: SearchTaskParams;
}

interface FoundUser {
  id: string;
  vk_id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  img_url: string;
}

interface CreateSearchTaskForm extends SearchTaskParams {
  title: string;
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

interface SearchTasksState {
  taskParams: SearchTaskParams | null;
}

export type {
  SearchTaskParams,
  SearchTask,
  FoundUser,
  CreateSearchTaskForm,
  SearchTasksRequest,
  SearchTasksResponse,
  FoundUsersRequest,
  FoundUsersResponse,
  SearchTasksState
};
