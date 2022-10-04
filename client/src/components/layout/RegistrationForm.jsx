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

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Required"),
  lastName: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("required"),
  password: Yup.string()
    .min(8, "Your password must be at least 8 characters long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function RegistrationForm({ hideForm }) {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const dispatch = useDispatch();
  const registerUser = async (values) => {
    setCreatingAccount(true);
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setCreatingAccount(false);
      return dispatch(
        popupActions.showPopup({
          type: "error",
          message:
            "Coud not get you registered, Please try again with a better internet connection or with a new email.",
        })
      );
    }

    const data = await response.json();

    if (data.message) {
      setCreatingAccount(false);

      return dispatch(
        popupActions.showPopup({
          type: "error",
          message: "Your details are invalid",
        })
      );
    }

    setCreatingAccount(false);
    hideForm();
    dispatch(authActions.setLoggedInState({ loggedIn: true }));
    setTimeout(() => {
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Account created successfully",
        })
      );
    }, 200);
  };
  return (
    <>
      <h1>Create an account</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={registerUser}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="mt-xl text-[1.7rem] flex flex-col gap-lg">
              <div className="relative group">
                <label
                  htmlFor="firstName"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.firstName && touched.firstName && "text-red-800"
                  } 
                ${
                  values.firstName
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  First Name
                </label>
                <Field
                  name="firstName"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.firstName && touched.firstName && "!border-red-800"
                  } ${values.firstName && "!border-green-900"}`}
                />
                {errors.firstName && touched.firstName && (
                  <FormError errorMessage={errors.firstName} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="lastName"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.lastName && touched.lastName && "text-red-800"
                  } 
                ${
                  values.lastName
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Last Name
                </label>
                <Field
                  name="lastName"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.lastName && touched.lastName && "!border-red-800"
                  } ${values.lastName && "!border-green-900"}`}
                />
                {errors.lastName && touched.lastName && (
                  <FormError errorMessage={errors.lastName} />
                )}
              </div>
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
                {creatingAccount ? (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                ) : (
                  "Create an account"
                )}
              </button>
            </Form>
            <div className="mt-auto">
              Already have an account?{" "}
              <button
                className="link"
                onClick={() => {
                  dispatch(
                    formActions.showForm({
                      type: "login",
                    })
                  );
                }}
              >
                Login here
              </button>{" "}
            </div>
          </>
        )}
      </Formik>
    </>
  );
}

export default RegistrationForm;
