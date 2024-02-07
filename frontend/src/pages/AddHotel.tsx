import React from "react";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";
// import "../forms/formsCss/addForms.css";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving Hotel", type: "Error" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    // console.log(hotelFormData);
    mutate(hotelFormData);
  };

  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
