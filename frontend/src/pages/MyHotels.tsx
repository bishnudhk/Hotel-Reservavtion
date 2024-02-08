import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import "./styles/myHotelCss.css";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotel found</span>;
  }
  return (
    <div className="container">
      <span className="myHotelsMain">
        <h1 className="myHotelsHeading">Myhotels</h1>
        <Link to="/addHotel" className="linkAddHotel">
          Add Hotel
        </Link>
      </span>
      <div className="myHotelLists">
        {hotelData?.map((hotel) => (
          <div className="myHotellist" key={hotel._id}>
            <h2 className="hotelName">{hotel.name}</h2>
            <div className="hotelDescp">{hotel.description}</div>
            <div className="hotelListDetails">
              <div className="hotelDetail">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="hotelDetail">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="hotelDetail">
                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
              </div>
              <div className="hotelDetail">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} child
              </div>
              <div className="hotelDetail">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="viewDetails">
              <Link to={`/editHotel/${hotel._id}`}>View Details</Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
