/* eslint-disable no-param-reassign */
export default function calculateDiagramData(data, currencyList) {
  const testObj = {};

  data.prevData.forEach((elem, index) => {
    const currencyName = elem.Cur_Abbreviation;
    if (data.dynamicData[index][0].Cur_ID === elem.Cur_ID) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(data.dynamicData[index])) {
        data.dynamicData[index][key].Cur_OfficialRate
          /= data.dynamicData[index][key].Cur_OfficialRate / elem.Cur_Scale;
      }
      testObj[currencyName] = data.dynamicData[index];
    }
  });
  return currencyList.push(testObj);
}
