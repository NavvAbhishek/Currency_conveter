import React from "react";

interface InputBoxProps {
  reverse?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ reverse }) => {
  const options = (
    <select className="...">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="INR">INR</option>
    </select>
  );

  const valueDisplay = (
    <div>
      <h2 className="text-2xl font-bold">100</h2>
    </div>
  );

  const conversionRate = (
    <div>
      <p className="text-gray-400">1 AUD = 0.66 USD</p>
    </div>
  );

  return (
    <div className="my-5">
      {reverse ? conversionRate : options}
      {valueDisplay}
      {reverse ? options : conversionRate}
    </div>
  );
};

export default InputBox;
