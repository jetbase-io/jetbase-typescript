import * as Formik from 'formik';

function validateStatus<T>(
  errors: Formik.FormikErrors<T>,
  touched: Formik.FormikTouched<T>,
  fieldName: keyof T,
): 'error' | 'success' {
  return errors[fieldName] && touched[fieldName] ? 'error' : 'success';
}
function helpText<T>(
  errors: Formik.FormikErrors<T>,
  touched: Formik.FormikTouched<T>,
  fieldName: keyof T,
) {
  return errors[fieldName] && touched[fieldName] ? errors[fieldName] : '';
}

export function getFormItemValidation<T>(
  errors: Formik.FormikErrors<T>,
  touched: Formik.FormikTouched<T>,
  fieldName: keyof T,
) {
  return {
    validateStatus: validateStatus(errors, touched, fieldName),
    help: helpText(errors, touched, fieldName),
  };
}
