import { useMemo } from 'react';

export function useCreateCurrencyByDate(currencyList, currency) {
  const dateArray = useMemo(() => {
    const dateArr = [];
    currencyList[2][currency.from].map((elem) => dateArr.push(elem.Date.split('T')[0]));

    return dateArr;
  }, [currencyList]);

  return dateArray;
}

export function useCreateLeftCurrencyValue(currencyList, currency) {
  const leftArray = useMemo(() => {
    const leftArr = [];
    currencyList[2][currency.from].map((elem) => leftArr.push(elem.Cur_OfficialRate));

    return leftArr;
  }, [currency.from]);

  return leftArray;
}

export function useCreateRightCurrencyValue(currencyList, currency) {
  const rightArray = useMemo(() => {
    const rightArr = [];
    currencyList[2][currency.to].map((elem) => rightArr.push(elem.Cur_OfficialRate));

    return rightArr;
  }, [currency.to]);

  return rightArray;
}

export function useCreateDiagram(currencyList, currency) {
  const dateArray = useCreateCurrencyByDate(currencyList, currency);
  let leftArray = useCreateLeftCurrencyValue(currencyList, currency);
  const rightArray = useCreateRightCurrencyValue(currencyList, currency);

  const diagramData = useMemo(() => {
    leftArray = leftArray.map((elem, index) => elem / rightArray[index]);
    return {
      labels: dateArray,
      datasets: [
        {
          data: leftArray,
        },
      ],
    };
  }, [dateArray, leftArray, rightArray]);

  return diagramData;
}
