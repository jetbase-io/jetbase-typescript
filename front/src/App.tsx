import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import "antd/dist/antd.css";

import { store } from 'store/rootStore';
import { userActions } from 'actions/userActions';
import { Router } from 'router/Router';
import './App.scss'

export const App: React.FC = () => {
  useEffect(() => {
    userActions.checkLogin();
  }, []);

  return <Provider store={store}>
    <Router />
  </Provider>;
};
