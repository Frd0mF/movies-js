import ImageGallery from 'react-image-gallery'
import React from 'react'
const NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=cce5c51828e87448e801e6201147706e&language=en-US&page=1"
const IMAGE = "https://image.tmdb.org/t/p/original/"
export default function SlideShow ({setCurrentTitle, setCurrentDesc}) {
    
    let images = []
    let titles = []
    let descriptions = []

    const [slideImages, setSlideImages] = React.useState([])
    React.useEffect(() => {
        fetch(NOW_PLAYING)
        .then (response => response.json())
        .then((data)=>{
            setSlideImages(data.results)})
    }, [])

   
    slideImages.map((image)=>{
        images.push({original: IMAGE+image.backdrop_path})
        titles.push(image.original_title)
        descriptions.push(image.overview)
    })

    function zbi(e){
        setCurrentTitle(titles[e])
        setCurrentDesc(descriptions[e])
    }
    return (
        <ImageGallery 
        items={images}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
        autoPlay={true}
        slideInterval={4500}
        onSlide={zbi}
    />
    )
}