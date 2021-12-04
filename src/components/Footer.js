import ReactPaginate from 'react-paginate';
import '../index.css'

const FILTERED = "https://api.themoviedb.org/3/discover/movie?api_key=cce5c51828e87448e801e6201147706e&language=en-US&sort_by=popularity.desc&page="
const SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=cce5c51828e87448e801e6201147706e&query="
const TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=cce5c51828e87448e801e6201147706e&language=en-US"

export default function Footer ({totalPages, setMovies,FEATURED, homePage, setHomePage,isFiltered, isSearching, search, topRated}){

    function handlePageClick(data) {
        let page  = data.selected + 1

        console.log(isFiltered.filtered)
        console.log(isSearching)
        if (isFiltered.filtered === true) {
            setHomePage((page-1))
            fetch(FILTERED + page + '&with_genres=' + isFiltered.filter)
            .then (response => response.json())
            .then(data=>setMovies(data.results)) 
        }        
        else if (isSearching) {
            setHomePage((page-1))
            fetch(SEARCH + search + '&page=' + page)
            .then (response => response.json())
            .then(data=>setMovies(data.results))
        }
        else if (topRated) {
            setHomePage((page-1))
            fetch(TOP_RATED + '&page=' + page)
            .then (response => response.json())
            .then(data=>setMovies(data.results))
        }
        else{
            setHomePage((page-1))
            fetch(FEATURED.slice(0, -1) + page)
            .then (response => response.json())
            .then(data=>setMovies(data.results)) }
    }

    return(
    <footer className="top-pagination flex justify-center items-center bg-secondary h-12">
        <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage = {homePage}
        />
        </footer>

    )}