import { createAction } from '@ngrx/store';

export const setLoading = createAction('[UI Component] Set Loading');
export const unsetLoading = createAction('[UI Component] Unset Loading');