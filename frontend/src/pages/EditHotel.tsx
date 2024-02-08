import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMYHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  return (
    <>
      <ManageHotelForm
        hotel={hotel}
       
      />
      ;
    </>
  );
};

export default EditHotel;
