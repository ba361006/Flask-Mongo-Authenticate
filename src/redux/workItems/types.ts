import { Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import Database from '../../types/Database';

export interface IWorkItemsState {
  todo: Database.Todo;
  sessionState: ISessionState;
}

export interface ISessionState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    avatar: string | null;
  } | null;
  isAuthenticating: boolean;
  isAdmin: boolean;
}

export type TWorkItemsSlice = Slice<
  IWorkItemsState,
  SliceCaseReducers<IWorkItemsState>,
  string
>;
