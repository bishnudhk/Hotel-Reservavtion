import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import "../formsCss/addForms.css";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" container imageSection">
      <h2 className="imageHeading">Images</h2>
      <div className="images">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...(register("imageFiles"),
          {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of iamges cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
