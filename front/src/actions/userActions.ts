import { RESULT_STATUSES } from 'constants/common';
import { userService } from 'services/UserService';
import { store } from 'store/rootStore';
import { userSlice } from 'store/UserStore';

const { dispatch } = store;
export const userActions = {
  async checkLogin() {
    const user = await userService.checkLogin();
    dispatch(userSlice.actions.setUser(user));
    dispatch(userSlice.actions.setUserLoading(false));
  },
  async login(username: string, password: string): Promise<string> {
    const res = await userService.login(username, password);
    if (res.status === RESULT_STATUSES.SUCESS) {
      dispatch(userSlice.actions.setUser(res.data));
      return '';
    } else {
      return res.error;
    }
  },
};
