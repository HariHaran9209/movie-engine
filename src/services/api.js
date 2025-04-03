const API_KEY = '53d08e0c0fmsh5ade0fd4d21055bp12c426jsn00d6db1cf580';
const BASE_URL = "imdb236.p.rapidapi.com";

export const getPopularMovies = async () => {
    try {
        console.log("Fetching popular movies...");

        const response = await fetch("https://imdb236.p.rapidapi.com/imdb/most-popular-movies", {
            method: "GET",
            headers: {
                'x-rapidapi-key': '4e790c21fcmsh9a71220284274c1p1dbbf5jsn94059719f04c',
		        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            }
        });

        console.log("Response received:", response);

        if (!response.ok) {
            throw new Error(`Failed to fetch popular movies: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);

        // Check what key holds the movie list
        if (Array.isArray(data)) {
            return data; // If the API directly returns an array
        } else if (Array.isArray(data.results)) {
            return data.results; // If movies are inside `results`
        } else {
            console.warn("Unexpected data structure:", data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};


// Search movies by query
export const searchMovies = async (query) => {
    const API_URL = `https://imdb236.p.rapidapi.com/imdb/search?originalTitleAutocomplete=${query}&rows=25&startYearTo=2024&startYearFrom=2000&averageRatingFrom=5&averageRatingTo=10&numVotesFrom=5000&sortField=id`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "53d08e0c0fmsh5ade0fd4d21055bp12c426jsn00d6db1cf580",
            "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(API_URL, options);
        const text = await response.text();
        console.log("Raw API Response:", text);

        const data = JSON.parse(text);
        console.log("Parsed API Data:", data);

        // Check if results exist
        if (!data.results || !Array.isArray(data.results)) {
            console.error("API returned invalid results:", data);
            return [];
        }

        console.log("Final Results to Display:", data.results);
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
