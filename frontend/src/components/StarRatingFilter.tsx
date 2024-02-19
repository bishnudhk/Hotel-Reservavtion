import React from "react";
import "./styles/starRatingFilter.css";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="starRatingFilter">
      <h4 className="starRatingHeading">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label className="starRatingFilterLabel">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
