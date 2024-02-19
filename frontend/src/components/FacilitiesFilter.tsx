import React from "react";
import "./styles/starRatingFilter.css";
import { hotelFacilities, hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="starRatingFilter">
      <h4 className="starRatingHeading">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="starRatingFilterLabel">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
