import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import "../formsCss/addForms.css";

const TypeSection = () => {
  const { register, watch } = useFormContext();

  const typeWatch = watch("type");

  return (
    <div className=" container hotelTypesSection">
      <h2 className="hotelTypeHeading ">Type</h2>
      <div className="hotelType">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold "
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TypeSection;
