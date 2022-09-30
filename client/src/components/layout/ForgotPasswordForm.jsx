import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { popupActions } from "../../stores/appStore/popupReducer";
import FormError from "../UI/FormError";
import Spinner from "../UI/Spinner";

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("required"),
});

function ForgotPasswordForm({ hideForm }) {
  const [sendingMail, setSendingMail] = useState(false);
  const dispatch = useDispatch();

  const sendMail = async (values) => {
    setSendingMail(true);
    const response = await fetch("/api/users/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    setSendingMail(false);

    if (data.message.toLowerCase() !== "token sent to email") {
      return dispatch(
        popupActions.showPopup({
          type: "error",
          message: data.message,
        })
      );
    }

    hideForm();
    setTimeout(() => {
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Link has been sent to email",
        })
      );
    }, 200);
  };

  return (
    <>
      <h1>Retrieve Account</h1>
      <p className="mt-xl text-darkGray font-bold">
        You need to provide the email to your account so we can send you a link
        to change your password.{" "}
        <span className="text-grayFaint">(Link expires in 10 minutes)</span>{" "}
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Schema}
        onSubmit={sendMail}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="mt-lg text-[1.7rem] flex flex-col gap-lg">
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
              <button className={`primary-button mt-sm`} type="submit">
                {sendingMail ? (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                ) : (
                  "Send Email"
                )}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default ForgotPasswordForm;
