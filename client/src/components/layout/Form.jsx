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
        <Overlay hideOverlay={hideForm}>
          <motion.div
            variants={variation}
            className="bg-white rounded-lg w-[60rem] min-h-[86vh] p-xl pb-lg text-darkGray flex flex-col"
          >
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
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Form;
