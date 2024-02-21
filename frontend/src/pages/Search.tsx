import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import SearchResultCard from "../components/SearchResultCard.tsx";
import "./styles/search.css";
import Pagination from "../components/Pagination.tsx";
import StarRatingFilter from "../components/StarRatingFilter.tsx";
import HotelTypeFilter from "../components/HotelTypeFilter.tsx";
import FacilitiesFilter from "../components/FacilitiesFilter.tsx";
import PriceFilter from "../components/PriceFilter.tsx";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedprice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  // console.log(hotelData);

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("start rating changed", selectedStars);
    const starRating = event.target.value;

    // const starRating = parseInt(event.target.value, 10); // Parse value to number

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
    // console.log(selectedStars);
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    // const starRating = parseInt(event.target.value, 10); // Parse value to number

    setSelectedHotelTypes((prevHotelType) =>
      event.target.checked
        ? [...prevHotelType, hotelType]
        : prevHotelType.filter((hotels) => hotels !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    // const starRating = parseInt(event.target.value, 10); // Parse value to number

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, hotelType]
        : prevFacilities.filter((prevFacility) => prevFacility !== hotelType)
    );
  };

  return (
    <div className="SearchPage">
      <div className="searchPageDivide">
        <div className="searchFilter">
          <h3 className="searchheading"> Filter by:</h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />

          <HotelTypeFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />

          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedprice(value)}
          />
        </div>
        <div className="searchList">
          <div className="searchHeading">
            <span className="searchResult">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? `in ${search.destination}` : ""}
            </span>
            {/* Todo sort options  */}
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort BY</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                PricePerNight (high to low)
              </option>
            </select>
          </div>
          {hotelData?.data.map((hotel) => (
            <SearchResultCard hotel={hotel} key={hotel._id} />
          ))}
        </div>
      </div>
      <Pagination
        page={hotelData?.pagination.page || 1}
        pages={hotelData?.pagination.pages || 1}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default Search;
