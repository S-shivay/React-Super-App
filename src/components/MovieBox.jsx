
export default function MovieBox({ category, selectedMovies, setSelectedMovies }) {

    const handleSelection = (category) => {
        if (selectedMovies.includes(category)) {
            setSelectedMovies(selectedMovies.filter((item) => item !== category))
        } else {
            setSelectedMovies([...selectedMovies, category])
        }
    }
    console.log(selectedMovies)
    return <div style={{
        width: "150px",
        height: "150px",
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        border: `2px solid ${selectedMovies.includes(category) ? "red" : "black"}`,
    }}
        onClick={() => handleSelection(category)}
    >
        <h1>{category.movie}</h1>
    </div>
}