import { useState } from "react";

// eslint-disable-next-line react/prop-types
const RentRangeSelector = ({ onRangeChange }) => {
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const handleMinRentChange = (e) => {
    setMinRent(e.target.value);
  };

  const handleMaxRentChange = (e) => {
    setMaxRent(e.target.value);
  };

  const handleApplyRange = () => {
    onRangeChange(minRent, maxRent);
  };

  return (
    <div>
      <label htmlFor="minRent">Min Rent:</label>
      <input
        type="number"
        id="minRent"
        value={minRent}
        onChange={handleMinRentChange}
      />

      <label htmlFor="maxRent">Max Rent:</label>
      <input
        type="number"
        id="maxRent"
        value={maxRent}
        onChange={handleMaxRentChange}
      />

      <button onClick={handleApplyRange}>Apply Range</button>
    </div>
  );
};

export default RentRangeSelector;
