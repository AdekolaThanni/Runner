import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { popupActions } from "../../stores/appStore/popupReducer";
import FormError from "../UI/FormError";
import Spinner from "../UI/Spinner";
import { formActions } from "../../stores/appStore/formReducer";

const Schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Your password must be at least 8 characters long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function ResetPasswordForm({ token }) {
  const [resettingPassword, setResettingPassword] = useState(false);
  const dispatch = useDispatch();
  console.log(token);

  const resetPassword = async (values) => {
    setResettingPassword(true);
    const response = await fetch(`/api/users/resetPassword/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    setResettingPassword(false);

    if (data.message) {
      return dispatch(
        popupActions.showPopup({
          type: "error",
          message: data.message,
        })
      );
    }

    setTimeout(() => {
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Password changed successfully, Login now",
        })
      );
    }, 200);
    dispatch(formActions.showForm({ type: "login" }));
  };
  return (
    <>
      <h1>Reset Password</h1>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Schema}
        onSubmit={resetPassword}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="mt-xl text-[1.7rem] flex flex-col gap-lg">
              <div className="relative group">
                <label
                  htmlFor="password"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.password && touched.password && "text-red-800"
                  } 
                ${
                  values.password
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.password && touched.password && "!border-red-800"
                  } ${values.password && "!border-green-900"}`}
                />
                {errors.password && touched.password && (
                  <FormError errorMessage={errors.password} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    "text-red-800"
                  } 
                ${
                  values.confirmPassword
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    "!border-red-800"
                  } ${values.confirmPassword && "!border-green-900"}`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <FormError errorMessage={errors.confirmPassword} />
                )}
              </div>
              <button className={`primary-button mt-sm`} type="submit">
                {resettingPassword ? (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default ResetPasswordForm;
