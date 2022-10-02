import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Divider from "../components/UI/Divider";
import Spinner from "../components/UI/Spinner";
import { formActions } from "../stores/appStore/formReducer";
import { popupActions } from "../stores/appStore/popupReducer";

function Profile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      if (
        firstName === user.firstName &&
        lastName === user.lastName &&
        email === user.email
      )
        return;

      setUpdatingProfile(true);
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });
      const data = await response.json();
      if (data.message) {
        throw new Error(data.message);
      }
      setUpdatingProfile(false);
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Profile updated successfully",
        })
      );
    } catch (error) {
      setUpdatingProfile(false);
      dispatch(
        popupActions.showPopup({
          type: "error",
          message: "Profile could not be updated",
        })
      );
    }
  };

  return (
    <div className="flex-grow py-xl">
      <h2>Update Profile</h2>
      <form
        className="mt-lg flex flex-col gap-lg"
        onSubmit={(event) => {
          event.preventDefault();
          updateProfile();
        }}
      >
        <div className="flex gap-[.5rem] items-start flex-col">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            className="text-center w-full py-xs border font-bold border-grayFaint"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            minLength={2}
            required={true}
          />
        </div>
        <div className="flex gap-[.5rem] items-start flex-col">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            className="text-center w-full py-xs border font-bold border-grayFaint"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            minLength={2}
            required={true}
          />
        </div>
        <div className="flex gap-[.5rem] items-start flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="text-center w-full py-xs border font-bold border-grayFaint"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required={true}
          />
        </div>
        <button className="primary-button mt-md" type="submit">
          {updatingProfile ? (
            <Spinner className="w-[2.5rem] h-[2.5rem]" />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
}

function Secuirity() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const dispatch = useDispatch();

  const updatePassword = async () => {
    try {
      setUpdatingPassword(true);
      const response = await fetch("/api/users/updatePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });
      const data = await response.json();

      if (data.message) throw new Error(data.message);
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Password updated successfully",
        })
      );
      setUpdatingPassword(false);
    } catch (error) {
      setUpdatingPassword(false);

      dispatch(
        popupActions.showPopup({ type: "error", message: error.message })
      );
    }
  };

  return (
    <div className="border-l border-l-grayFaint flex-grow px-xl ml-xl py-xl lg:px-sm lg:ml-sm sm:border-none sm:ml-0 sm:py-md sm:px-0">
      <h2>Update Password</h2>
      <form
        className="mt-lg flex flex-col gap-lg"
        onSubmit={(event) => {
          event.preventDefault();
          updatePassword();
        }}
      >
        <div className="flex gap-[.5rem] items-start flex-col">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            placeholder="&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;"
            name="currentPassword"
            className="text-center w-full py-xs border font-bold border-grayFaint placeholder:text-black placeholder:font-bold placeholder:text-lg"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            minLength={8}
            required={true}
          />
        </div>
        <div className="flex gap-[.5rem] items-start flex-col">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            placeholder="&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;"
            name="newPassword"
            className="text-center w-full py-xs border font-bold border-grayFaint placeholder:text-black placeholder:font-bold placeholder:text-lg"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength={8}
            required={true}
          />
        </div>
        <div className="flex gap-[.5rem] items-start flex-col">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            placeholder="&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;"
            name="confirmNewPassword"
            className="text-center w-full py-xs border font-bold border-grayFaint placeholder:text-black placeholder:font-bold placeholder:text-lg"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            minLength={8}
            required={true}
          />
        </div>
        <button className="primary-button mt-md" type="submit">
          {updatingPassword ? (
            <Spinner className="w-[2.5rem] h-[2.5rem]" />
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}

function Account() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
      dispatch(formActions.showForm({ type: "login" }));
    }
  }, [loggedIn]);

  return (
    <>
      <h1>My account</h1>
      <Divider className="mt-xl" />
      <React.Suspense
        fallback={<Spinner className="w-[7rem] h-[7rem] mx-auto mt-xl" />}
      >
        <Await
          resolve={user}
          errorElement={
            <h2 className="text-brown mt-lg">Could not get your data</h2>
          }
          children={(user) => (
            <>
              <Helmet>
                <title>
                  Runner | {user.firstName} {user.lastName}
                </title>
              </Helmet>
              <div className="flex sm:flex-col">
                <Profile user={user} />
                <Secuirity />
              </div>
              <Divider className="sm:hidden" />
            </>
          )}
        />
      </React.Suspense>
    </>
  );
}

export default Account;
