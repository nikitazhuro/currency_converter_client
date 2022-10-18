import React, { useState, useMemo } from 'react';

import classes from '../Styles/Exchanger.module.css';

import MySelect from './UI/Select/MySelect';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';
import Chart from './Diagram';

import useTodayChange from '../Hooks/useTodayChange';

const currencySimbol = {
  AMD: '֏',
  AUD: '$',
  BGN: 'ł',
  CAD: '$',
  CHF: '₣',
  CNY: '¥',
  CZK: 'č',
  DKK: 'č',
  EUR: '€',
  GBP: '£',
  IRR: '¤',
  ISK: 'č',
  JPY: '¥',
  KGS: 'č',
  KWD: 'ꝱ',
  KZT: '₸',
  MDL: 'ł',
  NOK: 'č',
  NZD: '$',
  PLN: 'ł',
  RUB: '₽',
  SEK: 'č',
  SGD: '$',
  TRY: '₺',
  UAH: '₴',
  USD: '$',
  XDR: '¤',
};

function Exchanger({ currencyList }) {
  const [currency, setCurrency] = useState({
    from: '',
    to: '',
  });
  const [activeInput, setActiveInput] = useState({
    leftInputActive: false,
    rightInputActive: false,
  });
  const [state, setState] = useState({
    leftValue: '',
    rightValue: '',
  });

  useMemo(() => {
    let currentValue;
    if (/[֏€£$₣₤₴¥₽¤₺₸č﷼ꝱł]/.test(state.leftValue[0])) {
      currentValue = ((state.leftValue.slice(1) * currencyList[0][currency.from])
        / currencyList[0][currency.to]).toFixed(4);
    } else {
      currentValue = ((state.leftValue * currencyList[0][currency.from])
        / currencyList[0][currency.to]).toFixed(4);
    }

    if (activeInput.leftInputActive && currency.from && currency.to) {
      return setState({ ...state, rightValue: currencySimbol[currency.to] + currentValue });
    }
    return null;
  }, [currency, state.leftValue]);

  useMemo(() => {
    let currentValue;
    if (/[֏€£$₣₤₴¥₽č¤₺₸﷼ꝱł]/.test(state.rightValue[0])) {
      currentValue = ((currencyList[0][currency.to] * state.rightValue.slice(1))
        / currencyList[0][currency.from]).toFixed(4);
    } else {
      currentValue = ((currencyList[0][currency.to] * state.rightValue)
        / currencyList[0][currency.from]).toFixed(4);
    }

    if (activeInput.rightInputActive && currency.from && currency.to) {
      return setState({ ...state, leftValue: currencySimbol[currency.from] + currentValue });
    }
    return null;
  }, [currency, state.rightValue]);

  const { changePersent, changeValue } = useTodayChange(currencyList, currency);

  const swapCurrencies = () => {
    const currencyFrom = currency.from;

    setCurrency({ ...currency, from: currency.to, to: currencyFrom });

    if (/[֏€£$₣₤₴¥₽č¤₺₸﷼ꝱł]/.test(state.leftValue[0]) && /[֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])) {
      setState({
        ...state,
        leftValue: /[֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])
          ? currencySimbol[currency.to] + state.leftValue.slice(1)
          : currencySimbol[currency.from] + state.leftValue.slice(1),
        rightValue: /[֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.leftValue[0])
          ? currencySimbol[currency.from] + state.rightValue.slice(1)
          : currencySimbol[currency.to] + state.rightValue.slice(1),
      });
    }
    if (/[֏€£$₣₤₴č¥₽¤₺₸﷼ꝱł]/.test(state.leftValue[0]) && /[^֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])) {
      setState({
        ...state,
        leftValue: /[֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])
          ? currencySimbol[currency.to] + state.leftValue.slice(1)
          : currencySimbol[currency.from] + state.leftValue.slice(1),
        rightValue: /[֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.leftValue[0])
          ? currencySimbol[currency.from] + state.rightValue
          : currencySimbol[currency.to] + state.rightValue.slice(1),
      });
    }
    if (/[^֏€£$₣₤₴¥₽č¤₺₸﷼ꝱł]/.test(state.leftValue[0]) && /[֏€£$₣₤₴č¥₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])) {
      setState({
        ...state,
        leftValue: /[֏€£$₣₤₴č¥₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])
          ? currencySimbol[currency.to] + state.leftValue
          : currencySimbol[currency.from] + state.leftValue.slice(1),
        rightValue: /[֏€£$₣₤č₴¥₽¤₺₸﷼ꝱł]/.test(state.leftValue[0])
          ? currencySimbol[currency.to] + state.rightValue.slice(1)
          : currencySimbol[currency.to] + state.rightValue.slice(1),
      });
    }
  };

  const changeLeftSelect = (e) => {
    setCurrency({ ...currency, from: e.target.value });

    if (/[֏€£$₣₤₴¥č₽¤₺₸﷼ꝱł]/.test(state.leftValue[0])) {
      setState({
        ...state,
        leftValue: currencySimbol[e.target.value] + state.leftValue.split('').splice(1).join(''),
      });
    } else {
      setState({
        ...state,
        leftValue: currencySimbol[e.target.value] + state.leftValue,
      });
    }
  };

  const changeRightSelect = (e) => {
    setCurrency({ ...currency, to: e.target.value });

    if (/[֏€£$₣₤₴č¥₽¤₺₸﷼ꝱł]/.test(state.rightValue[0])) {
      setState({
        ...state,
        rightValue: currencySimbol[e.target.value] + state.rightValue.split('').splice(1).join(''),
      });
    } else {
      setState({
        ...state,
        rightValue: currencySimbol[e.target.value] + state.rightValue,
      });
    }
  };

  return (
    <div className={classes.Exchanger}>
      <div>
        <h1>Exchange money</h1>
      </div>
      <div className={classes.MainBlock}>
        <div className={classes.LeftBlock}>
          <div className={classes.SelectBlock}>
            <span>From</span>
            <MySelect
              currencyList={currencyList[0]}
              value={currency.from ? currency.from : 'Select a currency'}
              onChange={(e) => changeLeftSelect(e)}
            />
          </div>
          <MyInput
            onClick={() => setActiveInput({
              ...activeInput,
              rightInputActive: false,
              leftInputActive: true,
            })}
            value={state.leftValue}
            onChange={(e) => setState({
              ...state,
              leftValue: /[^.֏€£$₣₤₴¥₽¤₺₸č﷼ꝱł0-9]+/iu.test(e.target.value)
                ? state.leftValue
                : e.target.value,
            })}
          />
        </div>
        <div className={classes.RightBlock}>
          <div className={classes.SelectBlock}>
            <span>To</span>
            <MySelect
              currencyList={currencyList[0]}
              value={currency.to ? currency.to : 'Select a currency'}
              onChange={(e) => changeRightSelect(e)}
            />
          </div>
          <MyInput
            onClick={() => setActiveInput({
              ...activeInput,
              rightInputActive: true,
              leftInputActive: false,
            })}
            value={state.rightValue}
            onChange={(e) => setState({
              ...state,
              rightValue: /[^.֏€£$₣₤₴¥₽¤₺₸č﷼ꝱł0-9]+/iu.test(e.target.value)
                ? state.leftValue
                : e.target.value,
            })}
          />
        </div>
      </div>
      <div className={classes.SwapAndState}>
        <div className={classes.btnSwap}>
          <MyButton onClick={swapCurrencies}>SWAP</MyButton>
        </div>
        <div className={classes.InfoBlock}>
          <div className={classes.InfoBlock_CurrentRate}>
            <span style={{ opacity: '0.5' }}>Current Rate</span>
            <span>
              {currency.from
                && currency.to
                && (currencyList[0][currency.from]
                  / currencyList[0][currency.to]).toFixed(4)}
            </span>
          </div>
          <div className={classes.InfoBlock_TodayChange}>
            <span style={{ opacity: '0.5' }}>Today&apos;s change</span>
            <span style={changeValue >= 0 ? { color: 'green' } : { color: 'red' }}>
              {currency.from && currency.to && changeValue >= 0 && <span>&#9650;</span>}
              {currency.from && currency.to && changeValue < 0 && <span>&#9660;</span>}
              {currency.from && currency.to && changeValue}
              {currency.from && currency.to && (
              <span>
                {' '}
                (
                {changePersent}
                %)
              </span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.Diagram}>
        {currency.from && currency.to && <Chart currencyList={currencyList} currency={currency} />}
      </div>
    </div>
  );
}

export default Exchanger;
