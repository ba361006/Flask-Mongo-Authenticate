import { Slice, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IWorkItemsState {
  sessionState: ISessionState;
}

export interface ISessionState {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  plan: string;
  refresh_token: string;
  access_token: string;
}

export type TWorkItemsSlice = Slice<
  IWorkItemsState,
  SliceCaseReducers<IWorkItemsState>,
  string
>;
