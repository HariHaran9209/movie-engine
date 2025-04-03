import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    // Initialize state directly from localStorage to avoid losing data on refresh
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    // Save favorites to localStorage when it changes
    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    // Add movie to favorites (Prevent duplicates)
    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            if (!prev.some((fav) => fav.id === movie.id)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    // Remove movie from favorites
    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    // Check if a movie is in favorites
    const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
