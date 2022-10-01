import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "./Overlay";
import { AnimatePresence, motion } from "framer-motion";
import { formActions } from "../../stores/appStore/formReducer";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import ReviewForm from "./ReviewForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import AddressForm from "./AddressForm";

function Form() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.formReducer);
  const location = useLocation();
  const navigate = useNavigate();

  const hideForm = () => {
    dispatch(formActions.hideForm());
  };

  const variation = {
    hidden: {
      translateY: "-30rem",
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      translateY: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      translateY: "-30rem",
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    if (location.pathname.startsWith("/resetPassword")) {
      navigate("/");
      dispatch(
        formActions.showForm({
          type: "resetPassword",
          payload: location.pathname.split("/resetPassword/")[1],
        })
      );
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {form.type && (
        <Overlay>
          <motion.div
            variants={variation}
            className="bg-white rounded-lg basis-[60rem] min-h-[86vh] p-xl xs:px-md pb-lg text-darkGray flex flex-col relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 36 36"
              className="absolute top-[2rem] right-[2rem] w-[2.5rem] h-[2.5rem]"
              onClick={hideForm}
            >
              <path
                fill="currentColor"
                d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
            {form.type === "registration" && (
              <RegistrationForm hideForm={hideForm} />
            )}
            {form.type === "login" && <LoginForm hideForm={hideForm} />}
            {form.type === "forgotPassword" && (
              <ForgotPasswordForm hideForm={hideForm} />
            )}
            {form.type === "review" && (
              <ReviewForm hideForm={hideForm} productId={form.payload} />
            )}
            {form.type === "resetPassword" && (
              <ResetPasswordForm token={form.payload} />
            )}
            {form.type === "address" && <AddressForm hideForm={hideForm} />}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Form;
