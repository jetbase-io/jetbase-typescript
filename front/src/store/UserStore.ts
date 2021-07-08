import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from 'models/User';
import { RootState } from './rootStore';

export type UserState = {
  userLoading: boolean;
  user: User | null;
  hasConnection: boolean;
};

const initialState: UserState = {
  userLoading: true,
  user: null,
  hasConnection: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        userLoading: payload,
      };
    },
    setUser(state, { payload }: PayloadAction<User | null>) {
      return {
        ...state,
        user: payload,
      };
    },
    setHasConnection(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        hasConnection: payload,
      }
    }
  },
});

export const userSelectors = {
  user: (state: RootState) => state.user.user,
  userLoading: (state: RootState) => state.user.userLoading,
  hasConnection: (state: RootState) => state.user.hasConnection,
};
