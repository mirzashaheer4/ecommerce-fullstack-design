import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('ecommerce_currency') || 'USD');
  const [deliveryCountry, setDeliveryCountry] = useState(localStorage.getItem('ecommerce_country') || 'USA');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });
  const [ratesLoaded, setRatesLoaded] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
  ];

  const countries = [
    { name: 'USA', flag: '🇺🇸', shippingCost: 5 },
    { name: 'Pakistan', flag: '🇵🇰', shippingCost: 2 },
    { name: 'UK', flag: '🇬🇧', shippingCost: 6 },
    { name: 'Canada', flag: '🇨🇦', shippingCost: 6 },
    { name: 'Australia', flag: '🇦🇺', shippingCost: 8 },
    { name: 'Germany', flag: '🇩🇪', shippingCost: 6 },
    { name: 'France', flag: '🇫🇷', shippingCost: 6 },
    { name: 'UAE', flag: '🇦🇪', shippingCost: 4 },
    { name: 'India', flag: '🇮🇳', shippingCost: 3 },
    { name: 'China', flag: '🇨🇳', shippingCost: 3 },
    { name: 'Japan', flag: '🇯🇵', shippingCost: 7 },
    { name: 'Saudi Arabia', flag: '🇸🇦', shippingCost: 5 },
    { name: 'Brazil', flag: '🇧🇷', shippingCost: 10 },
    { name: 'South Africa', flag: '🇿🇦', shippingCost: 12 },
    { name: 'Italy', flag: '🇮🇹', shippingCost: 6 }
  ];

  useEffect(() => {
    // Fetch live exchange rates relative to USD
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
        setRatesLoaded(true);
      } catch (error) {
        console.error('Failed to fetch exchange rates, using fallbacks', error);
        // Fallback rates just in case the API is down
        setExchangeRates({
          USD: 1, PKR: 278.50, EUR: 0.92, GBP: 0.79, INR: 83.35,
          JPY: 154.50, AUD: 1.52, CAD: 1.36, CNY: 7.23, AED: 3.67
        });
        setRatesLoaded(true);
      }
    };
    fetchRates();
  }, []);

  const handleSetCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('ecommerce_currency', newCurrency);
  };

  const handleSetCountry = (newCountry) => {
    setDeliveryCountry(newCountry);
    localStorage.setItem('ecommerce_country', newCountry);
  };

  const formatPrice = (usdAmount) => {
    const rate = exchangeRates[currency] || 1;
    const currObj = currencies.find(c => c.code === currency) || currencies[0];
    
    const convertedAmount = usdAmount * rate;
    
    // Formatting: JPY, PKR, INR generally don't show cents if it's large, but let's stick to standard locale formatting
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currObj.code,
      minimumFractionDigits: ['JPY', 'PKR'].includes(currObj.code) ? 0 : 2,
      maximumFractionDigits: ['JPY', 'PKR'].includes(currObj.code) ? 0 : 2
    }).format(convertedAmount);
  };

  const getShippingCost = () => {
    const countryObj = countries.find(c => c.name === deliveryCountry) || countries[0];
    return countryObj.shippingCost;
  };

  return (
    <SettingsContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      deliveryCountry,
      setDeliveryCountry: handleSetCountry,
      currencies,
      countries,
      formatPrice,
      getShippingCost,
      ratesLoaded,
      exchangeRates
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
