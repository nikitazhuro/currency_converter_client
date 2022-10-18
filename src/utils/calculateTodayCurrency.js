export default function calculateTodayCurrency(data, currencyList) {
  const testObj = {};

  data.todayData.forEach((elem) => {
    const currencyName = elem.Cur_Abbreviation;
    const currencyValue = elem.Cur_OfficialRate;

    testObj[currencyName] = currencyValue / elem.Cur_Scale;
  });

  return currencyList.push(testObj);
}
