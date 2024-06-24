import { useState } from 'react'
import MovieBox from '../components/MovieBox'
import MovieChip from '../components/MovieChip'
import { useNavigate } from 'react-router-dom'

const MOVIES = [
    {
        id: 0,
        movie: "Action"
    },
    {
        id: 1,
        movie: "Drama"
    },
    {
        id: 2,
        movie: "Romance"
    },
    {
        id: 3,
        movie: "Thriller"
    },
    {
        id: 4,
        movie: "Western"
    },
    {
        id: 5,
        movie: "Horror"
    },
    {
        id: 6,
        movie: "Fantacy"
    },
    {
        id: 7,
        movie: "Music"
    },
    {
        id: 8,
        movie: "Fiction"
    },
]

export default function Selection() {
    const navigate = useNavigate()
    const [selectedMovies, setSelectedMovies] = useState([])
    const moveNext = () => {
        if(selectedMovies.length<3){
            alert("Please select atleast 3 movies")
        }
        else{
        localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies))
        setSelectedMovies([])
        navigate("/info")
        }
    }
    return (
        <>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
        }}>
            {
                MOVIES.map((category) =>
                    <div key={category.id}>
                        <MovieBox selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies} category={category} />
                    </div>
                )

            }
        </div>
        {selectedMovies.length<3 && <p style={{color: "red"}}>Please select atleast 3 movies</p>}
        <div>
            {selectedMovies.map((category) => <MovieChip key={category.id} category={category} setSelectedMovies={setSelectedMovies}/>)}
        </div>
        <button onClick={moveNext}>
            Next
        </button>
        </>
    )
}