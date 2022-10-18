import React from 'react';

import classes from './MySelect.module.css';

function MySelect({ currencyList, ...props }) {
  return (
    <select {...props} className={classes.MySelect}>
      <option defaultValue="Select a currency" disabled>Select a currency</option>
      {Array.from(Object.keys(currencyList)).map((elem) => (
        <option value={elem} key={elem}>{elem}</option>
      ))}
    </select>
  );
}
export default MySelect;
