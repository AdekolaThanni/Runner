import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { popupActions } from "../../stores/appStore/popupReducer";
import FormError from "../UI/FormError";
import Spinner from "../UI/Spinner";
import { useNavigate } from "react-router-dom";
import useBag from "../../hooks/useBag";

const Schema = Yup.object().shape({
  firstName: Yup.string().required("Required").min("2", "Too Short"),
  lastName: Yup.string().required("Required").min("2", "Too Short"),
  address: Yup.string()
    .required("Required")
    .matches(/[A-Za-z0-9'\.\-\s\,]/, "Invalid address"),
  postalCode: Yup.number().required("Required"),
  city: Yup.string().required("Required").min(2, "Too Short"),
  country: Yup.string().required("Required").min(2, "Too Short"),
  telephone: Yup.string()
    .required("Required")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Invalid Phone number"
    ),
});

function AddressForm({ hideForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bag } = useBag();
  const [proceeding, setProceeding] = useState(false);
  const checkout = async () => {
    try {
      setProceeding(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: bag.map((prod) => ({
            id: prod.product._id,
            quantity: prod.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      window.location.href = data.data.url;
      setProceeding(false);
    } catch ({ message }) {
      setProceeding(false);
      dispatch(popupActions.showPopup({ type: "error", message }));
    }
  };

  return (
    <>
      <h1>Checkout</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          postalCode: "",
          city: "",
          country: "",
          telephone: "",
        }}
        validationSchema={Schema}
        onSubmit={checkout}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="mt-lg text-[1.7rem] flex flex-col gap-lg">
              <div className="flex items-center gap-sm">
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
                    type="text"
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
                    type="text"
                    className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                      errors.lastName && touched.lastName && "!border-red-800"
                    } ${values.lastName && "!border-green-900"}`}
                  />
                  {errors.lastName && touched.lastName && (
                    <FormError errorMessage={errors.lastName} />
                  )}
                </div>
              </div>
              <div className="relative group">
                <label
                  htmlFor="telephone"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.telephone && touched.telephone && "text-red-800"
                  } 
                ${
                  values.telephone
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Telephone
                </label>
                <Field
                  name="telephone"
                  type="text"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.telephone && touched.telephone && "!border-red-800"
                  } ${values.telephone && "!border-green-900"}`}
                />
                {errors.telephone && touched.telephone && (
                  <FormError errorMessage={errors.telephone} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="postalCode"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.postalCode && touched.postalCode && "text-red-800"
                  } 
                ${
                  values.postalCode
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Postal Code
                </label>
                <Field
                  name="postalCode"
                  type="text"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.postalCode && touched.postalCode && "!border-red-800"
                  } ${values.postalCode && "!border-green-900"}`}
                />
                {errors.postalCode && touched.postalCode && (
                  <FormError errorMessage={errors.postalCode} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="address"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.address && touched.address && "text-red-800"
                  } 
                ${
                  values.address
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Address
                </label>
                <Field
                  name="address"
                  type="address"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.address && touched.address && "!border-red-800"
                  } ${values.address && "!border-green-900"}`}
                />
                {errors.address && touched.address && (
                  <FormError errorMessage={errors.address} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="city"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.city && touched.city && "text-red-800"
                  } 
                ${
                  values.city
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  City
                </label>
                <Field
                  name="city"
                  type="city"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.city && touched.city && "!border-red-800"
                  } ${values.city && "!border-green-900"}`}
                />
                {errors.city && touched.city && (
                  <FormError errorMessage={errors.city} />
                )}
              </div>
              <div className="relative group">
                <label
                  htmlFor="country"
                  className={`absolute left-xs top-1/2 -translate-y-1/2 ${
                    errors.country && touched.country && "text-red-800"
                  } 
                ${
                  values.country
                    ? "top-[-12px] -left-0 text-[1.4rem] text-green-900"
                    : "group-focus-within:top-[-12px] group-focus-within:-left-0 group-focus-within:text-[1.4rem]"
                }
                 duration-200`}
                >
                  Country
                </label>
                <Field
                  name="country"
                  type="country"
                  className={`text-black border border-grayFaint w-full p-xs rounded-md ${
                    errors.country && touched.country && "!border-red-800"
                  } ${values.country && "!border-green-900"}`}
                />
                {errors.country && touched.country && (
                  <FormError errorMessage={errors.country} />
                )}
              </div>
              <button className={`primary-button mt-sm`} type="submit">
                {proceeding ? (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                ) : (
                  "Proceed to payment"
                )}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default AddressForm;
