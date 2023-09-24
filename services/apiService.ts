import axios from 'axios';

export const getRandomCharacter = async () => {
  try {
    const response = await axios.get('http://localhost:3001/apocalypse/random-pnj');
    // console.log('response.data', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};

export const getEthnicDistributionByNationality = async () => {
  try {
    const response = await axios.get('http://localhost:3001/global/ethnic-distribution-by-nationality');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};
