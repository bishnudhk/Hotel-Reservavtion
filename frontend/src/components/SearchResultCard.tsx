import React from "react";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="searchResultCard">
      <div className="searchResultCardImg">
        <img src={hotel.imageUrls[0]} alt="" className="searchCardImg" />
      </div>
      <div className="searchResultDetails">details columns</div>
    </div>
  );
};

export default SearchResultCard;
