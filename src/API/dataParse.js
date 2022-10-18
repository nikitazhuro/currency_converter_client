import $host from '.';

const getCurrencyData = async () => {
  const response = await $host.get('/api/getData');

  return response.data;
};

export default getCurrencyData;
