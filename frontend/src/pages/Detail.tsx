import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";

const Detail = () => {
  const { hotelId } = useParams();

  console.log(hotelId);
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),

    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  //   console.log(hotel);
  return (
    <div className="container">
      <div className="hotelDetail">
        <span>
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
      </div>
    </div>
  );
};

export default Detail;
