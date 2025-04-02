"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";

const BASE_URL = "http://20.244.56.144/evaluation-service/";

type NumberType = "p" | "f" | "e" | "r";
type ApiResponse = {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
};

export default function AverageCalculator() {
  const [selectedType, setSelectedType] = useState<NumberType>("p");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const fetchNumbers = async () => {
    setLoading(true);
    const prevWindow = response?.windowCurrState || [];

    const newNumbers = await generateNumbers(selectedType);

    const currWindow = [...prevWindow];

    for (const num of newNumbers) {
      if (!currWindow.includes(num)) {
        currWindow.push(num);
        if (currWindow.length > 10) {
          currWindow.shift();
        }
      }
    }

    const avg =
      currWindow.length > 0
        ? Number.parseFloat(
            (currWindow.reduce((a, b) => a + b, 0) / currWindow.length).toFixed(
              2
            )
          )
        : 0;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const apiResponse: ApiResponse = {
      windowPrevState: prevWindow,
      windowCurrState: currWindow,
      numbers: newNumbers,
      avg,
    };

    setResponse(apiResponse);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Average Calculator API
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Simulate API calls to fetch and calculate averages of different
            number types
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-auto">
              <label
                htmlFor="numberType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Number Type
              </label>
              <select
                id="numberType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as NumberType)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
              >
                <option value="p">Prime Numbers (p)</option>
                <option value="f">Fibonacci Numbers (f)</option>
                <option value="e">Even Numbers (e)</option>
                <option value="r">Random Numbers (r)</option>
              </select>
            </div>

            <button
              onClick={fetchNumbers}
              disabled={loading}
              className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300"
            >
              {loading ? (
                <>
                  <IoReload className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Fetching...
                </>
              ) : (
                <>
                  Fetch Numbers
                  <FaArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>
              This will simulate calling:{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                /api/numbers/{selectedType}
              </code>
            </p>
          </div>
        </div>

        {response && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="Previous Window State"
              data={response.windowPrevState}
              emptyMessage="No previous window state"
            />

            <ResultCard
              title="Fetched Numbers"
              data={response.numbers}
              emptyMessage="No numbers fetched"
            />

            <ResultCard
              title="Current Window State"
              data={response.windowCurrState}
              emptyMessage="Window is empty"
            />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Calculated Average
              </h2>
              <div className="flex items-center justify-center h-24">
                <span className="text-4xl font-bold text-emerald-600">
                  {response.avg}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  title,
  data,
  emptyMessage,
}: {
  title: string;
  data: number[];
  emptyMessage: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((num, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
            >
              {num}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      )}
    </div>
  );
}

async function generateNumbers(type: NumberType): Promise<number[]> {
  const count = Math.floor(Math.random() * 5) + 1;

  switch (type) {
    case "p":
      return await generatePrimeNumbers(count);
    case "f":
      return await generateFibonacciNumbers(count);
    case "e":
      return await generateEvenNumbers(count);
    case "r":
      return await generateRandomNumbers(count);
    default:
      return [];
  }
}

async function generatePrimeNumbers(count: number): Promise<number[]> {
  try {
    const response = await fetch(`${BASE_URL}/primes/`);
    const data = await response.json();
    const primes: number[] = data.numbers;
    return shuffleArray(primes).slice(0, count);
  } catch (error) {
    console.error("Error fetching primes:", error);
    return [];
  }
}

async function generateFibonacciNumbers(count: number): Promise<number[]> {
  try {
    const response = await fetch(`${BASE_URL}/fibo/`);
    const data = await response.json();
    const fibonacciNumbers: number[] = data.numbers;
    return shuffleArray(fibonacciNumbers).slice(0, count);
  } catch (error) {
    console.error("Error fetching Fibonacci numbers:", error);
    return [];
  }
}

async function generateEvenNumbers(count: number): Promise<number[]> {
  try {
    const response = await fetch(`${BASE_URL}/even/`);
    const data = await response.json();
    const fibonacciNumbers: number[] = data.numbers;
    return shuffleArray(fibonacciNumbers).slice(0, count);
  } catch (error) {
    console.error("Error fetching Fibonacci numbers:", error);
    return [];
  }
}

async function generateRandomNumbers(count: number): Promise<number[]> {
  try {
    const response = await fetch(`${BASE_URL}/rand/`);
    const data = await response.json();
    const fibonacciNumbers: number[] = data.numbers;
    return shuffleArray(fibonacciNumbers).slice(0, count);
  } catch (error) {
    console.error("Error fetching Fibonacci numbers:", error);
    return [];
  }
}

function shuffleArray(array: number[]): number[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
