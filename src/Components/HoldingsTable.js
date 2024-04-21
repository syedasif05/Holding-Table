import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);
  const [groupedHoldings, setGroupedHoldings] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios.get('https://canopy-frontend-task.now.sh/api/holdings')
      .then(response => {
        const holdingsData = response.data.payload;
        setHoldings(holdingsData);
        const groupedData = groupHoldingsByAssetClass(holdingsData);
        setGroupedHoldings(groupedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const groupHoldingsByAssetClass = (data) => {
    const groupedData = {};
    data.forEach(holding => {
      if (groupedData[holding.asset_class]) {
        groupedData[holding.asset_class].push(holding);
      } else {
        groupedData[holding.asset_class] = [holding];
      }
    });
    return groupedData;
  };

  const toggleExpand = (assetClass) => {
    setExpanded({ ...expanded, [assetClass]: !expanded[assetClass] });
  };

  return (
    <TableContainer component={Paper} elevation={3} style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '20px' }}>
      <Table>
        <TableBody>
          {Object.keys(groupedHoldings).map(assetClass => (
            <React.Fragment key={assetClass}>
              <TableRow>
                <TableCell colSpan={7}>
                  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px' }}>
                    <IconButton style={{ color: '#2196f3' }} onClick={() => toggleExpand(assetClass)}>
                      {expanded[assetClass] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    <span style={{ fontWeight: 'bold', flex: 1 }}>{assetClass}</span>
                  </div>
                </TableCell>
              </TableRow>
              <Collapse in={expanded[assetClass]} timeout="auto" unmountOnExit>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Ticker</TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Asset Class</TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Average Price</TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Market Price</TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Latest Change Percentage</TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: '#002f6c' }}>Market Value (Base CCY)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedHoldings[assetClass].map((holding, index) => (
                    <TableRow key={index}>
                      <TableCell>{holding.name}</TableCell>
                      <TableCell>{holding.ticker}</TableCell>
                      <TableCell>{holding.asset_class}</TableCell>
                      <TableCell>{holding.avg_price}</TableCell>
                      <TableCell>{holding.market_price}</TableCell>
                      <TableCell>{holding.latest_chg_pct}</TableCell>
                      <TableCell>{holding.market_value_ccy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Collapse>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HoldingsTable;
