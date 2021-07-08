import React, { useState } from 'react';
import {
  Formik,
  Form,
} from 'formik';
import * as yup from 'yup';
import {
  message,
  Button,
} from 'antd';

import './LoginPage.scss';
import { Page } from 'components/Page';
import { SimpleInputField } from 'components/SimpleInputField';
import { userActions } from 'actions/userActions';

export type LoginPageProps = {};
export const LoginPage: React.FC<LoginPageProps> = () => {
  const [loading, setLoading] = useState(false);

  return <Page className="page-centered">
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
      })
      }
      onSubmit={async ({ username, password }) => {
        setLoading(true);
        const error = await userActions.login(username, password);
        if (error) {
          message.error(error);
          setLoading(false);
        }
      }}
    >{fp =>
      <Form>
        <div className='login-block'>
          <SimpleInputField
            formikProps={fp}
            fieldName='username'
            placeholder="Username"
          />
          <SimpleInputField
            formikProps={fp}
            fieldName='password'
            placeholder="Password"
            type='password'
          />
          <div className="login-btn-group">
            <Button
              loading={loading}
              htmlType='submit'
            >Go!</Button>
          </div>
        </div>
      </Form>}
    </Formik>
  </Page>;
};
