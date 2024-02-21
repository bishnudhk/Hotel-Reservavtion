import React from "react";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./styles/searchResultCard.css";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  // console.log(hotel);
  return (
    <div className="searchResultCard">
      <div className="resultCardImg">
        <img src={hotel.imageUrls[0]} alt="" className="searchCardImg" />
      </div>
      <div>
        <div className="resultDetails">
          <span className="resultDetailStarRating">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} className="fill-yellow-400" />
            ))}
          </span>
          <span className="searchDeatilType">{hotel.type}</span>
        </div>
        <Link to={`/deatail/${hotel._id}`} className="searchResultHeading">
          {hotel.name}
        </Link>
      </div>
      <div>
        <div className="searchResultDescription">{hotel.description}</div>
      </div>
      <div className="searchResultFacilites">
        <div className="searchFacility">
          {hotel.facilities.slice(0, 3).map((facility) => (
            <span key={facility}>{facility}</span>
          ))}
          <span className="text-sm">
            {hotel.facilities.length > 3 &&
              `+${hotel.facilities.length - 3} more`}
          </span>
        </div>
        <div className="searchResultPricePerNight">
          <span>£{hotel.pricePerNight} per night</span>
          <Link to={`/detail/${hotel._id}`} className="btn viewMore">
            view More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
