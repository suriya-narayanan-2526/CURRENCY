import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("USD")
  const [toCurrency,setToCurrency]=useState("INR")
  const [convertedAmount,setConvertedAmount]=useState(null)
  const [exchangerate,setExchangerate]=useState(null)
  useEffect(()=>{
    const getExchangerate = async () =>
    {
      try{
          let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
          const res=await axios.get(url);
          setExchangerate(res.data.rates[toCurrency])
       
      }
      catch (error)
      {
        console.log("Error fetching exchange rate",error)
      }
    }
    getExchangerate();
  },[fromCurrency,toCurrency])
  useEffect(()=>{
      if(exchangerate !== null)
      {
         setConvertedAmount((amount*exchangerate).toFixed(2))
         
      }
  },[amount ,exchangerate])
  const handleAmountChange = (e) =>{
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0: value)
  }
  const handleFromCurrencyChange = (e) =>
  {
     setFromCurrency(e.target.value)
  }
  const handleToCurrencyChange = (e) =>
    {
       setToCurrency(e.target.value)
    }
  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
           <div className="input-container">
            <label htmlFor="Amount">Amount</label>
            <input type="number"  id="amt" value={amount} onChange={handleAmountChange}/>
           </div>
           <div className="input-container">
            <label htmlFor="from-currency">From Currency:</label>
            <select id="from-currency" value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="USD">USD - United State Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">GBP - British pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South Africa Rand</option>
            </select>
            <label htmlFor="to-currency">To Currency:</label>
            <select id="from-currency" value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="USD">USD - United State Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">GBP - British pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South Africa Rand</option>
            </select>
           </div>
           <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
           </div>
        </div>
      </div>
    </>
  )
}

export default App
