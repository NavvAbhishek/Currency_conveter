import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const options = {
        method: 'GET',
        url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return NextResponse.json(response.data);
      } catch (error) {
          console.error(error);
          return new NextResponse('Failed to fetch currency symbols', { status: 500 });
      }
}