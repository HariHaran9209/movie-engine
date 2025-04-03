import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
        <img
                src={movie.primaryImage ? movie.primaryImage : "https://imgs.search.brave.com/ZAvYGMeX2-LHisWf-2iOZMHl3c_3iw61E2VxFvgAprI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"}
                alt={movie.primaryTitle}
                className="movie-poster"
            />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.originalTitle}</h3>
            <p><strong>Release Date: </strong>{movie.releaseDate}</p>
            <p><strong>Rating:</strong> {movie.averageRating}</p>
            <p><strong>Votes:</strong> {movie.numVotes ? Number(movie.numVotes).toLocaleString() : "N/A"}</p>
        </div>
    </div>
}

export default MovieCard