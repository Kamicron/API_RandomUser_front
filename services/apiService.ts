import axios from 'axios';

export const getRandomFirstName = async () => {
  try {
    const response = await axios.get('http://localhost:3001/pnj/random-firstname');
    return response.data.firstname;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API :', error);
    return null;
  }
};
