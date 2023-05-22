import { AppearanceType } from '@vkontakte/vk-bridge';
import Modals from '../constants';

interface Snackbar {
  title: string;
  duration?: number;
}

interface LayoutState {
  appearance: AppearanceType;
  activeModal: Modals | null;
  snackbar: Snackbar | null;
}

export type { Snackbar, LayoutState };
