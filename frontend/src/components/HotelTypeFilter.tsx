import React from "react";
import "./styles/starRatingFilter.css";
import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypeFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="starRatingFilter">
      <h4 className="starRatingHeading">Hotel Type</h4>
      {hotelTypes.map((hotelType) => (
        <label className="starRatingFilterLabel">
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType.toString())}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypeFilter;
