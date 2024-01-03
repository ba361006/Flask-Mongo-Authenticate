import {
  createSlice,
  PayloadAction,
  createAction,
  ActionCreatorWithoutPayload,
  Reducer
} from '@reduxjs/toolkit';
import Database from '../../types/Database';
import { ISessionState, IWorkItemsState, TWorkItemsSlice } from './types';

export const initialState: IWorkItemsState = {
  todo: {
    id: 'test',
    description: 'string',
    order: 0,
    completed: false,
  },
  sessionState: {
    isAuthenticating: false,
    isAdmin: false,
    user: null
  }
};

const name: string = 'todo';

// use createSlice for actions that manipulate store
const workItemsSlice: TWorkItemsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTodo(
      state: IWorkItemsState,
      action: PayloadAction<Database.Todo>
    ) {
      state.todo = action.payload;
    },
    setSessionState(
      state: IWorkItemsState,
      action: PayloadAction<ISessionState>
    ) {
      state.sessionState = action.payload;
    }
  }
});

// use createAction for actions that only exists to call sagas
export const todoAction: ActionCreatorWithoutPayload<string> =
  createAction(`${name}/todoAction`);

// export actions created by slice
export const { setTodo, setSessionState } = workItemsSlice.actions;

// export reducer created by slice
export const workItemsReducer: Reducer<IWorkItemsState> =
  workItemsSlice.reducer;
