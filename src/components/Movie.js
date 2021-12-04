export default function Movie (props) {

    const IMAGE = "https://image.tmdb.org/t/p/w500/"
    const {title,poster_path,overview,vote_average} = props.data

    return(
        <div className="movie group">
            <div className=" overflow-hidden relative">
            {poster_path ?  <img className = "w-full h-96 w-80 rounded-t-sm"src={IMAGE + poster_path} alt={title} /> :  <img className = "h-96 w-80 rounded-t-sm"src='./404.png' alt={title} />}
            <div className="movie-overview content-center text-white absolute inset-x-0 bottom-0 p-2 min-h-full max-h-full overflow-auto transform-gpu translate-y-full backdrop-filter backdrop-blur transition duration-300 ease-in-out group-hover:transform-gpu translate-y">
                <h2>Overview</h2>
                <p>{overview}</p>
            </div>
            </div>
            <div className="movie-info flex fd-col justify-between items-center rounded-b-sm p-2 pr-4 h-16 bg-secondary shadow-2xl">
                <h3 className="w-48 break-words text-white overflow-hidden">{title}</h3>
                <p className="text-rating">{vote_average===0? 'Unrated' : vote_average}</p>
            </div>
        </div>
    )
}