import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import "../formsCss/guestInfoForm.css";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoformData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
const GuestInfoform = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoformData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  // if we changes checkIn and checkOut it will updated

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="guestInfoForm">
      <h3 className="guestPricePerNight">$ {pricePerNight}</h3>
      <form>
        <div>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
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
        <div>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="check-out Date"
            className="DatePickericon"
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <label className="SearchBarLabel">
            Adults:
            <input
              type="number"
              placeholder="Where are you going"
              className="SearchBarInput"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
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
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button className="btn ">Book Now</button>
        ) : (
          <button className="btn">sign in to Book</button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoform;
