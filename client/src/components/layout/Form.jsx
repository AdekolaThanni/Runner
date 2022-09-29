import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "./Overlay";
import { AnimatePresence, motion } from "framer-motion";
import { formActions } from "../../stores/appStore/formReducer";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import ReviewForm from "./ReviewForm";

function Form() {
  const dispatch = useDispatch();
  const formType = useSelector((state) => state.formReducer.type);

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

  return (
    <AnimatePresence>
      {formType && (
        <Overlay hideOverlay={hideForm}>
          <motion.div
            variants={variation}
            className="bg-white rounded-lg w-[60rem] min-h-[86vh] p-xl pb-lg text-darkGray flex flex-col"
          >
            {formType === "registration" && (
              <RegistrationForm hideForm={hideForm} />
            )}
            {formType === "login" && <LoginForm hideForm={hideForm} />}
            {formType === "login" && <ReviewForm hideForm={hideForm} />}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Form;
