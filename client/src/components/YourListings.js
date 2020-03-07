import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function YourListings() {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        sidesToScroll: 1,
        centerMode: true,
    }

    return (
        <div>
            <div id="popular-title">
                Your Listings
            </div>
            <div id="slider-container">
                <Slider {...settings}>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/900/400/400.jpg" alt="1" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/800/400/400.jpg" alt="2" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/567/400/400.jpg" alt="3" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/335/400/400.jpg" alt="4" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/948/400/400.jpg" alt="5" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/744/400/400.jpg" alt="6" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/373/400/400.jpg" alt="7" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/858/400/400.jpg" alt="8" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/574/400/400.jpg" alt="9" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/633/400/400.jpg" alt="10" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default YourListings;