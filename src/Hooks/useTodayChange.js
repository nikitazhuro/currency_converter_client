import { useMemo } from 'react';

const useTodayChange = (currencyList, currency) => {
  const todayChange = useMemo(() => {
    const today = (currencyList[0][currency.from] / currencyList[0][currency.to]).toFixed(4);
    const yesterday = (currencyList[1][currency.from] / currencyList[1][currency.to]).toFixed(4);

    return {
      changeValue: (today - yesterday).toFixed(4),
      changePersent: (((100 * today) / yesterday) - 100).toFixed(2),
    };
  }, [currencyList, currency.from, currency.to]);

  return todayChange;
};

export default useTodayChange;
