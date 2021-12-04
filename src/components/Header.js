import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css'                                  //icons

const SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=cce5c51828e87448e801e6201147706e&query="

const GENRES = "https://api.themoviedb.org/3/genre/movie/list?api_key=cce5c51828e87448e801e6201147706e&language=en-US"

const FILTERED = "https://api.themoviedb.org/3/discover/movie?api_key=cce5c51828e87448e801e6201147706e&language=en-US&sort_by=popularity.desc&with_genres="

const TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=cce5c51828e87448e801e6201147706e&language=en-US"

export default function Navbar({setTotalPages, setMovies, FEATURED, setHomePage, setIsfiltered, setIsSearching, search, setSearch, setTopRated}) {

    const [genres,setGenres] = React.useState([])

    React.useEffect(() => {
        fetch(GENRES)
            .then (response => response.json())
            .then((data)=>{
                setGenres(data.genres)
        })        
    }, [])

    React.useEffect(() => {
        if (search ===''){
            fetch(FEATURED)
            .then (response => response.json())
            .then((data)=>{
                setMovies(data.results)
                setTotalPages(data.total_pages)
                setIsfiltered ({filtered : false, filter : ''})
                setIsSearching(false)
            
        })}
        else {
            setTopRated(false)
            setIsSearching(true)
            fetch(SEARCH+search)
            .then (response => response.json())
            .then(data=>{
                if (data.results.length === 0){
                  setMovies('')
                  setTotalPages(data.total_pages)    
                } else {
                setTotalPages(data.total_pages)    
                setMovies(data.results)}})
                setIsfiltered ({filtered : false, filter : ''})
        }
        
    }, [search])

    function handleNavClick(e){
        let clicked = e.target.innerHTML
        let clickedGenre = e.target.dataset.id
        switch (clicked) {
            case 'Home':
                setTopRated(false)
                fetch(FEATURED)
                .then (response => response.json())
                .then((data)=>{
                    setHomePage(0)
                    setMovies(data.results)
                    setSearch('')
                    setIsfiltered ({filtered : false,
                        filter : ''})
                   })
                break;
            case 'Top IMDb':
                setTopRated(true)
                fetch(TOP_RATED)
                .then (response => response.json())
                .then((data)=>{
                    setHomePage(0)
                    setMovies(data.results)
                    setSearch('')
                    setTotalPages(data.total_pages)
                    setIsfiltered ({filtered : false,
                        filter : ''})
                   })
            break;
            default:
                setTopRated(false)
                setIsfiltered ({filtered : true,
                              filter : clickedGenre})
                fetch(FILTERED + clickedGenre)
                .then (response => response.json())
                .then((data)=>{
                    setMovies(data.results)
                    setTotalPages(data.total_pages)
                })  
                break;
        }
    }


    function searchChangeHandler(e) {
        setSearch(e.target.value)      
      }


    const [movieMenu,SetMovieMenu] = React.useState(false)
    function toggleMenu(){
        SetMovieMenu(!movieMenu)
    }

    
    return (
        <header className="flex justify-center lg:justify-between fixed top-0 w-full z-50 items-center bg-secondary h-14">
            <div className="flex items-center">
                <img className="lg:ml-0 xl:ml-48 w-20 rounded-xl" src="./logo.png" alt="logo" />
               <ul className="flex text-white">
                   <li className="header" onClick={handleNavClick}>Home</li>
                   <li className="header flex flex-col relative" onClick={toggleMenu}>Genre
                        {movieMenu &&
                        <ul className="text-white p-4 rounded-md bg-gray-800 drop-shadow-lg w-max absolute z-50 grid gap-2 lg:grid-cols-3 md:grid-cols-2 top-10 ml-0">
                            {genres.map((genre)=>{return(
                                <li className="z-50" onClick={handleNavClick} data-id={genre.id} key={genre.id}>{genre.name}</li>)}
                            )}
                        </ul>     }       
                   </li>
                   <li className="header" onClick={handleNavClick}>Top IMDb</li>
               </ul>
            </div>
            <div className="search sm:pr-8 xl:mr-44 ">
                <span className="p-input-icon-right">
                <i className="pi pi-search" />   
                <input type="text" className="bg-transparent mr-10 text-white focus:outline-none border-b border-white" value={search} onChange={searchChangeHandler } placeholder="Search..." />     
                </span>
            </div>    
        </header>
    )
}