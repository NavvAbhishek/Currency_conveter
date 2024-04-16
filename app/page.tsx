import InputBox from "@/components/InputBox";
import { MdSwapVerticalCircle } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <div className="">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold">Currency Converter</h1>
          <InputBox />
          <button className="">
            <MdSwapVerticalCircle 
            className="w-10 h-10"
            />
          </button>
          <InputBox reverse />
        </div>
      </div>
    </div>
  );
};

export default Home;
