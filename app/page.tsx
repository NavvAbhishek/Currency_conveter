"use client";
import InputBox from "@/components/InputBox";
import { MdSwapVerticalCircle } from "react-icons/md";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("LKR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [symbols, setSymbols] = useState("");
  const [rate, setRate] = useState()
  const currenyOptions = Object.keys(symbols);

  const convert = async () => {
    try {
      const res = await axios.get(
        `/api/getCurrencyData?from=${from}&to=${to}&amount=${amount}`
      );
      const conversionRate = res.data.info.rate;
      setRate(conversionRate)
      const convertedAmount = conversionRate * amount;
      const formatedConvertedAmount = parseFloat(convertedAmount.toFixed(2));
      setConvertedAmount(formatedConvertedAmount);
      setError(false);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSymbols = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/getSymbols");
        setSymbols(res.data.symbols);
      } catch (err) {
        console.error(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSymbols();
  }, []);

  console.log(currenyOptions);

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
            from={from}
            to={to}
            rate={rate}
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
