import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoform from "../forms/GuestInfoForm/GuestInfoform";
import "./styles/detail.css";

const Detail = () => {
  const { hotelId } = useParams();

  // console.log(hotelId);
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

        <h1 className="hotelDetailHeading">{hotel.name}</h1>
      </div>
      <div className="hotelDetailImgs">
        {hotel.imageUrls.map((image) => (
          <div className="hotelDetailimg">
            <img src={image} alt={hotel.name} className="" />
          </div>
        ))}
      </div>
      <div className="hoetlDetailFacilities">
        {hotel.facilities.map((facility) => (
          <div className="hotelDetailfacility">{facility}</div>
        ))}
      </div>
      <div className="hotelDetailDesc">
        <div className="hotelDesc">{hotel.description}</div>
        <div className="hotelDetalGuestInfo">
          <GuestInfoform
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
