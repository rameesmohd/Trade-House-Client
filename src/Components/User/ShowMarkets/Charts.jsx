import React from 'react'
import { useEffect } from 'react';

const Charts = () => {
    useEffect(() => {
        const script5 = document.createElement('script');
        script5.type = 'text/javascript';
        script5.src = 'https://s3.tradingview.com/tv.js';
        script5.async = true;
        script5.onload = () => {
          new TradingView.MediumWidget({
            "symbols": [
              ["BTC/USD", "COINBASE:BTCUSD|ALL"],
              ["S&P 500", "OANDA:SPX500USD|ALL"],
              ["FEDERAL FUNDS RATE", "ECONOMICS:USINTR|ALL"],
              ["TA 35", "TASE:TA35|ALL"],
              ["SMI", "SIX:SMI|ALL"],
              ["FTSE MIB", "INDEX:FTSEMIB|ALL"],
              ["NI 225", "OANDA:JP225USD|ALL"],
              ["ETH/USD", "COINBASE:ETHUSD|ALL"],
              ["IOT/USD", "BINANCE:IOTAUSD|ALL"],
              ["Gold Silver Ratio/USD", "FX_IDC:AUGUSD|ALL"],
              ["1kg Gold/CHF", "FX_IDC:INGCHF|ALL"],
              ["1kg Silver/CHF", "FX_IDC:SBNCHF|ALL"]
            ],
            "chartOnly": false,
            "width": "100%",
            "height": "700px",
            "locale": "en",
            "colorTheme": "light",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "fontColor": "#787B86",
            "isTransparent": false,
            "autosize": true,
            "showFloatingTooltip": true,
            "showVolume": false,
            "scalePosition": "no",
            "scaleMode": "Normal",
            "fontFamily": "Trebuchet MS, sans-serif",
            "noTimeScale": false,
            "chartType": "area",
            "lineColor": "#2962FF",
            "bottomColor": "rgba(41, 98, 255, 0)",
            "topColor": "rgba(41, 98, 255, 0.3)",
            "container_id": "tradingview-chart"
          });
        };
        document.getElementById('tradingview-chart').appendChild(script5);
      }, []);

  return (
    <div>
         <div className="tradingview-widget-container" id="">
            <div id="tradingview-chart"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com/symbols/OANDA-SPX500USD/" rel="noopener" target="_blank">
                <span className="blue-text"></span>
              </a>
            </div>
          </div>
    </div>
  )
}

export default Charts
