import React, { useEffect } from 'react';


const MarketOverview = () => {

  useEffect(() => {
    // Load TradingView scripts and widgets here
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script1.async = true;
    script1.text = JSON.stringify({
      symbols: [
        {
          description: 'S&P 500',
          proName: 'OANDA:SPX500USD',
        },
        {
          description: 'TA 35',
          proName: 'TASE:TA35',
        },
        {
          description: 'SMI',
          proName: 'SIX:SMI',
        },
        {
          description: 'FTSE MIB',
          proName: 'INDEX:FTSEMIB',
        },
        {
          description: 'NI 225',
          proName: 'OANDA:JP225USD',
        },
      ],
      colorTheme: 'dark',
      isTransparent: false,
      showSymbolLogo: true,
      locale: 'en',
    });
    console.log(script1);
    document.getElementById('ticker-widget-1').appendChild(script1);

    // Ticker Widget for Forex & Metals
    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script2.async = true;
    script2.text = JSON.stringify({
      symbols: [
        {
          description: 'USD/CHF',
          proName: 'FX_IDC:USDCHF',
        },
        {
          description: 'FEDERAL FUNDS RATE',
          proName: 'ECONOMICS:USINTR',
        },
        {
          description: 'USD/EUR',
          proName: 'FX_IDC:USDEUR',
        },
        {
          description: '1kg Gold/CHF',
          proName: 'FX_IDC:INGCHF',
        },
        {
          description: '1kg Silver/CHF',
          proName: 'FX_IDC:SBNCHF',
        },
      ],
      colorTheme: 'dark',
      isTransparent: false,
      showSymbolLogo: true,
      locale: 'en',
    });
    document.getElementById('ticker-widget-2').appendChild(script2);

    // Ticker Widget for Crypto
    const script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script3.async = true;
    script3.text = JSON.stringify({
      symbols: [
        {
          description: 'BTC/USD',
          proName: 'COINBASE:BTCUSD',
        },
        {
          description: 'ETH/USD',
          proName: 'COINBASE:ETHUSD',
        },
        {
          description: 'IOT/USD',
          proName: 'BINANCE:IOTAUSD',
        },
        {
          description: 'PNT/USD',
          proName: 'BINANCE:PNTUSDT',
        },
        {
          description: 'SSV/USD',
          proName: 'BINANCE:SSVUSD',
        },
      ],
      colorTheme: 'dark',
      isTransparent: false,
      showSymbolLogo: true,
      locale: 'en',
    });
    document.getElementById('ticker-widget-3').appendChild(script3);
  }, []);




  return (
    <>
      <body className=''>
        <h1 className='text-center text-white text-2xl'>Market Overview</h1>
        <div className="tradingview-widget-container">
        <h2 className='text-white'> Market Indexes </h2>
          <div className="tradingview-widget-container" id="ticker-widget-1">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com" rel="noopener" target="_blank">
                <span className="blue-text"></span>
              </a>
            </div>
          </div>
          {/* Add more Market Indexes widgets here */}
          <h2 className='text-white'>Forex & Metals</h2>
          <div className="tradingview-widget-container" id="ticker-widget-2">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com" rel="noopener" target="_blank">
                <span className="blue-text"></span>
              </a> 
            </div>
          </div>
          {/* Add more Forex & Metals widgets here */}
          <h2 className='text-white'>Crypto</h2>
          <div className="tradingview-widget-container" id="ticker-widget-3">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com" rel="noopener" target="_blank">
                <span className="blue-text"></span>
              </a> 
            </div>
          </div>
          {/* Add more Crypto widgets here */}
        </div>
      </body>
    </>
  );
};

export default MarketOverview;
