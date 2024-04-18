import React from "react";

interface InputBoxProps {
  label: string;
  amount: number;
  amountDisabled?: boolean;
  currencyDisabled?: boolean;
  onAmountChange?: (newAmount: number) => void;
  selectedCurrency: string;
  onCurrencyChange?: (newCurrency: string) => void;
  currencyOptions: string[];
  from? : string;
  to? : string;
  rate?: number
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  amount,
  amountDisabled = false,
  currencyDisabled = false,
  onAmountChange,
  selectedCurrency = "USD",
  onCurrencyChange,
  currencyOptions = [],
  from,
  to,
  rate
}) => {
  return (
    <div className="my-5">
      <label htmlFor="" className="px-5">
        {label}
      </label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        disabled={currencyDisabled}
        className="..."
      >
        {currencyOptions.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
      <div className="">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          disabled={amountDisabled}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className="w-30 h-10 border rounded-lg bg-yellow-400 text-black font-bold pl-5"
        />
      </div>
      <div>
        <p className="text-gray-400">1 {from} = {rate} {to}</p>
      </div>
    </div>
  );
};

export default InputBox;
