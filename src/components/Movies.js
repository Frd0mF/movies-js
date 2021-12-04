import Movie from "./Movie";
import Navbar from './Header';
import Footer from './Footer'
import React from 'react'
import SlideShow from "./SlideShow";

const FEATURED = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cce5c51828e87448e801e6201147706e&page=1"

export default function Movies () {

const [movies,setMovies] =  React.useState([])
const [totalPages,setTotalPages] = React.useState('')
const [homePage, setHomePage] = React.useState(0)
const [isFiltered, setIsfiltered] = React.useState({filtered : false, filter : ''})
const [isSearching, setIsSearching] = React.useState(false)
const [search,setSearch] = React.useState('')
const [topRated, setTopRated] = React.useState(false)

  React.useEffect(()=>{
    fetch(FEATURED)
    .then (response => response.json())
    .then(data=>{
      setTotalPages(data.total_pages)
      setMovies(data.results)})  
  }
    ,[])

    const [currentTitle, setCurrentTitle] = React.useState('')
    const [currentDesc, setCurrentDesc] = React.useState('')

   

    return (
      <>
      <Navbar setTotalPages = {setTotalPages} setMovies={setMovies} FEATURED={FEATURED} setHomePage={setHomePage} isFiltered={isFiltered} setIsfiltered={setIsfiltered} setIsSearching={setIsSearching} search={search} setSearch={setSearch} setTopRated={setTopRated}/>
      <h1 className="text-white text-3xl xl:w-2/3 lg:w-4/5 m-auto pl-4 pt-20">In Theatres</h1>
      <div className="lg:w-full xl:w-2/3 m-auto relative">
      {!isSearching && <SlideShow setCurrentTitle={setCurrentTitle} setCurrentDesc={setCurrentDesc}/>}
      <div className="shadow-img absolute bottom-0 p-4 left-0">
      <h1 className="description text-white mb-2">{currentTitle}</h1>
      <p className="description desc-p text-xs sm:text-sm md:text-base lg:-text-lg text-white w-3/5 mb-6">{currentDesc}</p>
      </div>
      </div>
      <Footer totalPages={totalPages} setMovies={setMovies} FEATURED={FEATURED} homePage={homePage} setHomePage={setHomePage} isFiltered={isFiltered} isSearching={isSearching} search={search} topRated={topRated} />
        <div className="movies grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-6 lg:w-full xl:w-4/5 m-auto">
        {movies ? movies.map((movie)=>
          <Movie key={movie.id} data={movie}/>
        ):  <h1 className="text-3xl text-white min-h-screen mt-48">Not Found...</h1>}
      </div>
      <Footer totalPages={totalPages} setMovies={setMovies} FEATURED={FEATURED} homePage={homePage} setHomePage={setHomePage} isFiltered={isFiltered} isSearching={isSearching} search={search} topRated={topRated} />
      </>
    
     
    )
}