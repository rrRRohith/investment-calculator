import React, { useState } from 'react';

function App() {
  const [principal, setPrincipal] = useState(10000); // Initial investment
  const [duration, setDuration] = useState(5); // Duration in years
  const [interestRate, setInterestRate] = useState(5); // Interest rate in %
  const [rdAmount, setRdAmount] = useState(2000); // RD monthly contribution
  const [rdIncrement, setRdIncrement] = useState(0); // RD yearly increment (fixed or percentage)
  const [incrementType, setIncrementType] = useState("percentage"); // Type of increment: percentage or fixed
  const [totalInvested, setTotalInvested] = useState(0);
  const [interestReceived, setInterestReceived] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);

  // Number format for displaying numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  // Handle calculations
  const calculateInvestment = () => {
    let totalInvestment = principal;
    let totalInterest = 0;
    let rdTotal = 0;
    let currentRdAmount = rdAmount;  // Make a mutable copy of rdAmount

    for (let year = 1; year <= duration; year++) {
      // Calculate RD contributions and apply yearly increment
      for (let month = 1; month <= 12; month++) {
        rdTotal += currentRdAmount;
      }

      // Apply yearly increment to RD
      if (incrementType === "percentage") {
        currentRdAmount += currentRdAmount * (rdIncrement / 100); // Increment by percentage
      } else {
        currentRdAmount += rdIncrement; // Increment by fixed amount
      }

      // Add principal for the total invested
      totalInvestment += rdTotal;
    }

    // Calculate interest received and maturity amount
    const simpleInterest = (principal + rdTotal) * (interestRate / 100) * duration;
    totalInterest = simpleInterest;

    // Maturity Amount: Principal + Interest
    const maturityAmountCalculated = totalInvestment + totalInterest;

    // Set the results to the state
    setTotalInvested(totalInvestment);
    setInterestReceived(totalInterest);
    setMaturityAmount(maturityAmountCalculated); // Use setState instead of direct assignment
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Investment Calculator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Principal Amount:</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (Years):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">RD Monthly Contribution:</label>
            <input
              type="number"
              value={rdAmount}
              onChange={(e) => setRdAmount(parseFloat(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Yearly Increment:</label>
            <input
              type="number"
              value={rdIncrement}
              onChange={(e) => setRdIncrement(parseFloat(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Increment Type:</label>
            <select
              value={incrementType}
              onChange={(e) => setIncrementType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          <button
            onClick={calculateInvestment}
            className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Calculate
          </button>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Results:</h3>
            <p className="text-gray-700">Total Invested Amount: ₹{formatNumber(totalInvested.toFixed(2))}</p>
            <p className="text-gray-700">Interest Received: ₹{formatNumber(interestReceived.toFixed(2))}</p>
            <p className="text-gray-700">Maturity Amount: ₹{formatNumber(maturityAmount.toFixed(2))}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
