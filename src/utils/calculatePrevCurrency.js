export default function calculatePrevCurrency(data, currencyList) {
  const testObj = {};

  data.prevData.forEach((elem) => {
    const currencyName = elem.Cur_Abbreviation;
    const currencyValue = elem.Cur_OfficialRate;

    testObj[currencyName] = currencyValue / elem.Cur_Scale;
  });

  return currencyList.push(testObj);
}
