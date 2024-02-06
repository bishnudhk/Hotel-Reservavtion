import React from "react";
// import { FormProvider, useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "../formsCss/addForms.css";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="container">
      <h1 className="formHeading">Add Hotel</h1>
      <div className="formsName">
        <label className="formName">
          Name
          <input
            type="text"
            className="formInput"
            {...register("name", { required: "this field is required" })}
          ></input>
          {errors.name && (
            <span className="formError">{errors.name.message}</span>
          )}
        </label>
      </div>
      <div className="cityName">
        <label className="formName">
          City
          <input
            type="text"
            className="formInput"
            {...register("city", { required: "this field is required" })}
          ></input>
          {errors.city && (
            <span className="formError">{errors.city.message}</span>
          )}
        </label>

        <label className="formName">
          Country
          <input
            type="text"
            className="formInput"
            {...register("country", { required: "this field is required" })}
          ></input>
          {errors.country && (
            <span className="formError">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="formName">
        Description
        <textarea
          rows={10}
          className="formInput"
          {...register("description", { required: "this field is required" })}
        ></textarea>
        {errors.description && (
          <span className="formError">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
