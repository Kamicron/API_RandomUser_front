import axios from 'axios';

export const getRandomCharacter = async () => {
  try {
    const response = await axios.get('http://localhost:3001/apocalypse/random-pnj');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l\'API :", error);
    throw error;  // Propagez l'erreur pour qu'elle puisse être capturée par le bloc try/catch appelant
  }
};


export const getEthnicDistributionByNationality = async () => {
  try {
    const response = await axios.get('http://localhost:3001/global/information-table/suborigin-distribution-by-origin');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get('http://localhost:3001/global/information-table/stats');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};
