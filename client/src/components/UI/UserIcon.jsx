import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Overlay from "../layout/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../stores/appStore/formReducer";
import { authActions } from "../../stores/appStore/authReducer";
import { popupActions } from "../../stores/appStore/popupReducer";
import Spinner from "./Spinner";

function UserModal({ closeModal }) {
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const variation = {
    hidden: {
      translateX: "30rem",
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      translateX: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      translateX: "30rem",
      transition: {
        duration: 0.2,
      },
    },
  };

  const logout = async () => {
    try {
      setLoggingOut(true);
      const response = await fetch("/api/users/logout");
      if (!response.ok) throw new Error();
      else {
        setLoggingOut(false);
        dispatch(authActions.setLoggedInState({ loggedIn: false }));
        dispatch(
          popupActions.showPopup({
            type: "success",
            message: "Logged out successfully",
          })
        );
      }
    } catch (error) {
      dispatch(
        popupActions.showPopup({
          type: "error",
          message: "Could not log you out, Please try again",
        })
      );
    }
  };

  return (
    <Overlay hideOverlay={closeModal}>
      <motion.div
        variants={variation}
        className="absolute top-[8.2rem] right-0 w-[45rem] bg-white"
      >
        <div className="flex flex-col gap-sm border-b border-b-grayFaint p-lg">
          <Link to="/account" className="link">
            Account
          </Link>
          <Link to="/wishlist" className="link">
            Wishlist
          </Link>
        </div>
        <div className="flex flex-col gap-sm p-lg">
          {!loggedIn ? (
            <>
              <button
                onClick={() => {
                  closeModal();
                  dispatch(formActions.showForm({ type: "login" }));
                }}
                className="primary-button w-full"
              >
                Login
              </button>
              <button
                onClick={() => {
                  closeModal();
                  dispatch(formActions.showForm({ type: "registration" }));
                }}
                className="secondary-button w-full"
              >
                Register
              </button>
            </>
          ) : (
            <button onClick={logout} className="primary-button">
              {!loggingOut ? (
                "Logout"
              ) : (
                <Spinner className="w-[2.5rem] h-[2.5rem]" />
              )}
            </button>
          )}
        </div>
      </motion.div>
    </Overlay>
  );
}

function UserIcon() {
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      <svg
        width="19"
        height="21"
        viewBox="0 0 19 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setVisibility(true)}
        className="cursor-pointer"
      >
        <path
          d="M9.50003 9.80554C10.4615 9.80554 11.4013 9.52044 12.2007 8.98629C13.0001 8.45215 13.6232 7.69294 13.9911 6.80469C14.359 5.91644 14.4553 4.93903 14.2677 3.99607C14.0802 3.05311 13.6172 2.18694 12.9374 1.5071C12.2575 0.827263 11.3913 0.364287 10.4484 0.17672C9.50542 -0.010847 8.52801 0.0854192 7.63976 0.453345C6.75151 0.821271 5.99231 1.44433 5.45816 2.24374C4.92401 3.04314 4.63892 3.98299 4.63892 4.94443C4.63892 6.23367 5.15107 7.47012 6.0627 8.38175C6.97434 9.29339 8.21078 9.80554 9.50003 9.80554ZM9.50003 1.4722C10.1868 1.4722 10.8581 1.67585 11.4291 2.05738C12.0001 2.43891 12.4451 2.9812 12.7079 3.61566C12.9707 4.25013 13.0395 4.94828 12.9055 5.62182C12.7716 6.29537 12.4409 6.91406 11.9553 7.39966C11.4697 7.88526 10.851 8.21595 10.1774 8.34993C9.50388 8.48391 8.80573 8.41515 8.17126 8.15234C7.5368 7.88954 6.99451 7.44449 6.61298 6.87349C6.23145 6.30248 6.0278 5.63117 6.0278 4.94443C6.0278 4.02354 6.39363 3.14036 7.0448 2.48919C7.69596 1.83803 8.57914 1.4722 9.50003 1.4722Z"
          stroke="white"
          fill="white"
        />
        <path
          d="M18.1597 14.9236C17.0461 13.7465 15.704 12.809 14.2157 12.1682C12.7273 11.5274 11.1239 11.197 9.50348 11.197C7.88306 11.197 6.27965 11.5274 4.7913 12.1682C3.30294 12.809 1.96091 13.7465 0.847231 14.9236C0.605781 15.1815 0.471683 15.5217 0.472231 15.875V19.5278C0.472231 19.8961 0.61856 20.2494 0.879027 20.5099C1.13949 20.7703 1.49276 20.9167 1.86112 20.9167H17.1389C17.5073 20.9167 17.8605 20.7703 18.121 20.5099C18.3815 20.2494 18.5278 19.8961 18.5278 19.5278V15.875C18.5302 15.5227 18.3987 15.1826 18.1597 14.9236ZM17.1389 19.5278H1.86112V15.8681C2.84531 14.8317 4.03007 14.0065 5.34331 13.4426C6.65655 12.8786 8.07081 12.5878 9.50001 12.5878C10.9292 12.5878 12.3435 12.8786 13.6567 13.4426C14.9699 14.0065 16.1547 14.8317 17.1389 15.8681V19.5278Z"
          stroke="white"
          fill="white"
        />
      </svg>
      <AnimatePresence>
        {visibility && <UserModal closeModal={() => setVisibility(false)} />}
      </AnimatePresence>
    </>
  );
}

export default UserIcon;
