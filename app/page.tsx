"use client";
import InputBox from "@/components/InputBox";
import { MdSwapVerticalCircle } from "react-icons/md";
import React, { useState, useEffect } from "react";
import axios from "axios";

// interface CurrencyRates {
//   [key: string]: number;
// }

// interface CurrencyData {
//   timestamp: number;
//   base: string;
//   success: boolean;
//   date: string;
//   rates: CurrencyRates;
// }

const Home = () => {
  //const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ [key: string]: number }>({});

  const currenyOptions = Object.keys(options);
  //const currenyValues = Object.values(options);

  const convert = () => {
    const convertedAmount = amount * options[to];
    const formatedConvertedAmount = parseFloat(convertedAmount.toFixed(2))
    setConvertedAmount(formatedConvertedAmount);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/getCurrencyData");
        //setFrom(res.data.base);
        setOptions(res.data.rates);
        //setTo(res.data.rates[selectedCurrency])
        //setCurrencyData(res.data);
        setError(false);
      } catch (err) {
        setError(true);
        //setCurrencyData(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        convert();
      }}
    >
      <div className="">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold">Currency Converter</h1>
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={currenyOptions}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(amount) => setAmount(amount)}
            selectedCurrency={from}
          />
          <button className="">
            <MdSwapVerticalCircle className="w-10 h-10" />
          </button>
          <InputBox
            label="To"
            selectedCurrency={to}
            currencyOptions={currenyOptions}
            onCurrencyChange={(currency) => setTo(currency)}
            amountDisabled
            amount={convertedAmount}
          />
          <button className="" type="submit">
            Convert
          </button>
        </div>
      </div>
    </form>
  );
};

export default Home;
