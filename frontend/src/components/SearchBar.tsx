import React, { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/searchBar.css";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const navigate = useNavigate();

  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [hotelId, setHotelId] = useState<string>(search.hotelId);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form onSubmit={handleSubmit} className="SearchBarForm">
      <div className="searchBarIcon">
        <MdTravelExplore size={25} className="icon" />
        <input
          type="text"
          placeholder="Where are you going"
          className="SearchBarInput"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="searchBarIcon">
        <label className="SearchBarLabel">
          Adults:
          <input
            type="number"
            placeholder="Where are you going"
            className="SearchBarInput"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="">
          Children:
          <input
            type="number"
            placeholder="Where are you going"
            className="SearchBarInput"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="searchBarIcon">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="DatePickericon"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="searchBarIcon">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="DatePickericon"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="searchBarButton">
        <button className="searchButton">Search</button>
      </div>
      <div className="searchBarButton">
        <button className="clearButton">Clear</button>
      </div>
    </form>
  );
};

export default SearchBar;
