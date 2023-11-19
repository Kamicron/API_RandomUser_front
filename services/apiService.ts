import axios from 'axios';

const backPort = 3001
const backBaseUrl = 'localhost'

export const getRandomCharacter = async (params = {}) => {
  try {
    // Construit l'URL avec les paramètres
    const url = new URL(`http://${backBaseUrl}:${backPort}/apocalypse/random-pnj`);
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
    const response = await axios.get(`http://${backBaseUrl}:${backPort}/global/information-table/suborigin-distribution-by-origin`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get(`http://${backBaseUrl}:${backPort}/global/information-table/stats`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};


export const updateLogin = async (userId, newLogin) => {
  try {
    const response = await axios.put(`http://${backBaseUrl}:${backPort}/users/update-login`, {
      userId, 
      newLogin,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du login :', error);
    throw error;
  }
};

export const updateEmail = async (userId, newEmail) => {
  try {
    const response = await axios.put(`http://${backBaseUrl}:${backPort}/users/update-email`, {
      userId, 
      newEmail,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'email :', error);
    throw error;
  }
};

export const updatePassword = async (userId, newPassword) => {
  try {
    const response = await axios.put(`http://${backBaseUrl}:${backPort}/users/update-password`, {
      userId, 
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    throw error;
  }
};
