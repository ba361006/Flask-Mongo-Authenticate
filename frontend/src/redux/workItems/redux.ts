import {
  createSlice,
  PayloadAction,
  createAction,
  ActionCreatorWithoutPayload,
  Reducer,
} from "@reduxjs/toolkit";
import { ISessionState, IWorkItemsState, TWorkItemsSlice } from "./types";

export const initialState: IWorkItemsState = {
  sessionState: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    plan: "",
    refresh_token: "",
    access_token: "",
  },
};

const name: string = "todo";

// use createSlice for actions that manipulate store
const workItemsSlice: TWorkItemsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSessionState(
      state: IWorkItemsState,
      action: PayloadAction<ISessionState>
    ) {
      state.sessionState = action.payload;
    },
  },
});

// use createAction for actions that only exists to call sagas
export const todoAction: ActionCreatorWithoutPayload<string> = createAction(
  `${name}/todoAction`
);

// export actions created by slice
export const { setSessionState } = workItemsSlice.actions;

// export reducer created by slice
export const workItemsReducer: Reducer<IWorkItemsState> =
  workItemsSlice.reducer;
