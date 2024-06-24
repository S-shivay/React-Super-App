export default function MovieChip({ category, setSelectedMovies }){
    const removeSelection = (category) => {
        setSelectedMovies((selectedMovies) => selectedMovies.filter((item) => item !== category))
    }
    return <button>
        {category.movie}&nbsp;&nbsp;&nbsp;<span onClick={() => removeSelection(category)}>X</span>
    </button>
}