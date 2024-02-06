import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "../formsCss/addForms.css";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="container guestSections">
      <h2 className="guestHeading">Guest</h2>
      <div className="guestSection">
        <label className="text-gray-700 text-sm font-semibold">
          {" "}
          Adults
          <input
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          {" "}
          Children
          <input
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
