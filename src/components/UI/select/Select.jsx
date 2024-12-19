import React from 'react';
// import classes from './MySelect.module.css'

const Select = ({options, defaultValue, value, setValue}) => {
  return (
    <select
    //   className={classes.mySelect}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map(option =>
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      )}
    </select>
  );
};

export default Select;