import React from 'react';
import * as Formik from 'formik';
import {
  Form,
  Input,
} from 'antd';

import { getFormItemValidation } from 'utils/formItem';

type SimpleInputFieldProps<T = any> = {
  // Formik stuff.
  formikProps: {
    setFieldValue: (fieldName: string, val: any, shouldValidate?: boolean) => void;
    errors: Formik.FormikErrors<any>;
    touched: Formik.FormikTouched<any>;
    values: Record<string, any>;
  };
  // Handle value from the <input> before sending it to Formik.
  handleValueBeforeEmit?: (val: T) => T;
  fieldName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  step?: string;
};
/**
 * Simple text input wrapper to remove excessive copy/paste.
 * If smth more complex required, maybe it would be better not ot use it.
 * For some small tweaks feel free to add required optional props.
 */
export const SimpleInputField: React.FC<SimpleInputFieldProps> = (props) => {
  const {
    formikProps: {
      setFieldValue,
      errors,
      touched,
      values,
    },
    handleValueBeforeEmit,
    fieldName,
    label,
    placeholder,
    disabled,
    type,
    step,
  } = props;

  return <>
    {label && <label className="form-label">{label}</label>}
    <Formik.Field name={fieldName}>
      {({ field }) =>
        <Form.Item {...getFormItemValidation(errors, touched, field.name)}>
          <Input
            className="form-field"
            size="large"
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            step={step}
            value={values[fieldName]}
            onChange={(e) => {
              const {
                selectionStart,
                selectionEnd,
              } = e.target;
              const val = handleValueBeforeEmit
                ? handleValueBeforeEmit(e.target.value)
                : e.target.value;
              // Handle cursor shift to the end of a controlled component.
              if (val !== e.target.value) {
                setTimeout(() => {
                  e.target.selectionStart = selectionStart;
                  e.target.selectionEnd = selectionEnd;
                })
              }
              setFieldValue(field.name, val);
            }}
            data-test-id={`${field.name}-input`}
          />
        </Form.Item>}
    </Formik.Field>
  </>;
};
