import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import SearchResultCard from "../components/SearchResultCard.tsx";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  // console.log(search);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  return (
    <div className="SearchPage">
      <div className="searchPageDivide">
        <div className="searchFilter">
          <h3 className="searchheading"> Filter by:</h3>
          {/* Todo filters */}
        </div>
        <div className="searchList">
          <div className="searchHeading">
            <span className="">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? `in ${search.destination}` : ""}
            </span>
            {/* Todo sort options  */}
          </div>
          {hotelData?.data.map((hotel) => (
            <SearchResultCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
