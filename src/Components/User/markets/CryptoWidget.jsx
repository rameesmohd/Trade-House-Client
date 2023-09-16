import React from 'react'
import { useEffect } from 'react'

const CryptoWidget = () => {
    useEffect(()=>{
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
          description: 'USD/EUR',
          proName: 'FX_IDC:USDEUR',
        },
        {
          description: 'GBP/USD',
          proName: 'FX_IDC:GBPUSD',
        },
        {
          description: 'USD/INR',
          proName: 'FX_IDC:USDINR',
        },
      ],
      colorTheme: 'light',
      isTransparent: false,
      showSymbolLogo: true,
      locale: 'en',
    });
    document.getElementById('ticker-widget-8').appendChild(script3);
    },[])

  return (
    <div>
      <div className="tradingview-widget-container" id="ticker-widget-8">
              <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com" rel="noopener" target="_blank">
                <span className="blue-text"></span>
              </a> 
            </div>
          </div>
    </div>
  )
}

export default CryptoWidget
