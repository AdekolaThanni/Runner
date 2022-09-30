import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { popupActions } from "../../stores/appStore/popupReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FormError from "../UI/FormError";
import Spinner from "../UI/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReviewSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(2, "Too short"),
  comment: Yup.string().required("Required").min(2, "Too short"),
  rating: Yup.number().required("Required").min(1).max(5),
});

function Star({ ratingValue, starValue }) {
  const [value, setValue] = useState(ratingValue);
  const starClass = "w-[5.5rem] h-[5.5rem] text-brown ";

  useEffect(() => {
    setValue(ratingValue);
  }, [ratingValue]);

  return starValue <= value ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
      className={`${starClass}`}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M9.595 6.252L8 1L6.405 6.252H1l4.373 3.4L3.75 15L8 11.695L12.25 15l-1.623-5.348L15 6.252H9.595z"
        clip-rule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
      className={`${starClass}`}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M9.595 6.252L8 1L6.405 6.252H1l4.373 3.4L3.75 15L8 11.695L12.25 15l-1.623-5.348L15 6.252H9.595zm-7.247.47H6.72L8 2.507L6.72 6.722H2.348zm3.537 2.75l-1.307 4.305l1.307-4.305zm7.767-2.75H9.28h4.372zm-8.75.9h2.366L8 5.214l.732 2.41h2.367l-1.915 1.49l.731 2.409L8 10.032l-1.915 1.49l.731-2.41l-1.915-1.49z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

function ReviewForm({ productId, hideForm }) {
  const [sendingReview, setSendingReview] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewProduct = async (values) => {
    try {
      setSendingReview(true);
      const response = await fetch(`/api/products/review/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.message) throw new Error(data.message);
      setSendingReview(false);
      hideForm();
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Your review has been accepted",
        })
      );
      navigate(`/products/${productId}`);
    } catch (error) {
      setSendingReview(false);
      dispatch(
        popupActions.showPopup({
          type: "error",
          message: "Could not send your review, Please try again",
        })
      );
    }
  };

  return (
    <>
      <h1>Review Product</h1>
      <Formik
        initialValues={{
          name: "",
          comment: "",
          rating: 0,
        }}
        validationSchema={ReviewSchema}
        onSubmit={reviewProduct}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="mt-xl text-[1.7rem] flex flex-col gap-lg">
              <div className="relative group">
                <label
                  htmlFor="name"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.name && touched.name && "text-red-800"
                  } 
                ${
                  values.name
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="name"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.name && touched.name && "!border-red-800"
                  } ${values.name && "!border-green-900"}`}
                />
                {errors.name && touched.name && (
                  <FormError errorMessage={errors.name} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="comment"
                  className={`absolute left-xs top-xs ${
                    errors.comment && touched.comment && "text-red-800"
                  } 
                ${
                  values.comment
                    ? "top-[-20px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-20px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Comment
                </label>
                <Field
                  name="comment"
                  as="textarea"
                  type="comment"
                  className={`text-black h-[25rem] border border-grayFaint w-full p-xs rounded-md ${
                    errors.comment && touched.comment && "!border-red-800"
                  } ${values.comment && "!border-green-900"}`}
                />
                {errors.comment && touched.comment && (
                  <FormError errorMessage={errors.comment} />
                )}
              </div>
              <div
                className={`${
                  errors.rating &&
                  touched.rating &&
                  "border border-red-800 p-xs"
                } rounded-md relative group`}
                role="group"
                aria-labelledby="my-radio-group"
              >
                <p
                  className={`${
                    errors.rating &&
                    touched.rating &&
                    "text-red-800 !font-normal"
                  } font-bold`}
                >
                  Choose Your Rating
                </p>
                <div
                  className={`flex gap-lg ${
                    errors.rating && touched.rating && "red-svg"
                  }`}
                >
                  <label className="">
                    <Field name="rating" type="radio" value={1} />
                    <Star ratingValue={values.rating} starValue={1} />
                  </label>
                  <label className="">
                    <Field name="rating" type="radio" value={2} />
                    <Star ratingValue={values.rating} starValue={2} />
                  </label>
                  <label className="">
                    <Field name="rating" type="radio" value={3} />
                    <Star ratingValue={values.rating} starValue={3} />
                  </label>
                  <label className="">
                    <Field name="rating" type="radio" value={4} />
                    <Star ratingValue={values.rating} starValue={4} />
                  </label>
                  <label className="">
                    <Field name="rating" type="radio" value={5} />
                    <Star ratingValue={values.rating} starValue={5} />
                  </label>
                </div>
                {errors.rating && touched.rating && (
                  <FormError errorMessage={errors.rating} />
                )}
              </div>
              <button className={`primary-button mt-sm`} type="submit">
                {sendingReview ? (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                ) : (
                  "Send Review"
                )}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default ReviewForm;
