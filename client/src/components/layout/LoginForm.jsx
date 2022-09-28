import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { popupActions } from "../../stores/appStore/popupReducer";
import { formActions } from "../../stores/appStore/formReducer";
import FormError from "../UI/FormError";
import { useState } from "react";
import Spinner from "../UI/Spinner";
import { authActions } from "../../stores/appStore/authReducer";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("required"),
  password: Yup.string().required("Required"),
});

function LoginForm({ hideForm }) {
  const [loggingUserIn, setLoggingUserIn] = useState(false);
  const dispatch = useDispatch();
  const loginUser = async (values) => {
    setLoggingUserIn(true);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.message) {
      setLoggingUserIn(false);

      return dispatch(
        popupActions.showPopup({
          type: "error",
          message:
            data.message.toLowerCase() === "email or password is incorrect"
              ? data.message
              : "Could not log you in, Please try again",
        })
      );
    }

    setLoggingUserIn(false);
    dispatch(authActions.setLoggedInState({ loggedIn: true }));

    hideForm();
    setTimeout(() => {
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Logged in successfully",
        })
      );
    }, 200);
  };
  return (
    <>
      <h1>Login to account</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={loginUser}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="mt-xl text-[1.7rem] flex flex-col gap-lg">
              <div className="relative group">
                <label
                  htmlFor="email"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.email && touched.email && "text-red-800"
                  } 
                ${
                  values.email
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.email && touched.email && "!border-red-800"
                  } ${values.email && "!border-green-900"}`}
                />
                {errors.email && touched.email && (
                  <FormError errorMessage={errors.email} />
                )}
              </div>
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
              <button className={`primary-button mt-sm`} type="submit">
                {loggingUserIn ? (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                ) : (
                  "Login To Account"
                )}
              </button>
            </Form>
            <div className="mt-auto flex justify-between items-center">
              <span>
                Dont have an account?{" "}
                <button
                  className="link"
                  onClick={() => {
                    dispatch(
                      formActions.showForm({
                        type: "registration",
                      })
                    );
                  }}
                >
                  Register here
                </button>
              </span>
              <button className="link">Forgot Password</button>
            </div>
          </>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
