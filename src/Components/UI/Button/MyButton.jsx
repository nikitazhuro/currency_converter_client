import React from 'react';

import classes from './MyButton.module.css';

function MyButton(props) {
  const { children } = props;

  return (
    <button type="button" {...props} className={classes.MyButton}>
      {children}
    </button>
  );
}
export default MyButton;
