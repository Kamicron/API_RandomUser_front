import axios from 'axios';

export const getRandomCharacter = async (params = {}) => {
  try {
    // Construit l'URL avec les paramètres
    const url = new URL('http://localhost:3001/apocalypse/random-pnj');

    // Ajoute chaque paire clé/valeur en tant que paramètres de recherche à l'URL
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // Effectue la requête avec l'URL comprenant les paramètres
    const response = await axios.get(url.href);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    throw error; // Propagez l'erreur pour qu'elle puisse être capturée par le bloc try/catch appelant
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
