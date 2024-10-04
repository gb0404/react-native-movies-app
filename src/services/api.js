const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc4ODY1NjMxNWY5MTJhZTZiOTFlMTE1N2ZjY2MxYiIsIm5iZiI6MTcyNzkzODkyNC4wMzM3MTUsInN1YiI6IjY2Yjg2ZjMwZWY5NmFlNDQzYmYyYzQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mpad-MkLvueCLqK7kPwv9VSB3hqby9Xc3J2zjpyXXOM'; // Bearer token

const api = async (endpoint) => {
  const url = `https://api.themoviedb.org/3/${endpoint}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`, // Authorization header
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default api;
