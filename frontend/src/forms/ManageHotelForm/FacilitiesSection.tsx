import React from "react";
import { hotelFacilities } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "../formsCss/addForms.css";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="container facilitiesSections">
      <h2 className="facilitiesHeading">Facilities</h2>
      <div className="facilities">
        {hotelFacilities.map((facility, index) => (
          <label key={index} className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility required";
                  }
                },
              })}
            />

            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
