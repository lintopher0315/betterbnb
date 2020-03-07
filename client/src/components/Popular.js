import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Popular() {

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
                Popular Locations
            </div>
            <div id="slider-container">
                <Slider {...settings}>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/867/400/400.jpg" alt="1" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/537/400/400.jpg" alt="2" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/487/400/400.jpg" alt="3" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/237/400/400.jpg" alt="4" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/967/400/400.jpg" alt="5" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/807/400/400.jpg" alt="6" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/717/400/400.jpg" alt="7" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/607/400/400.jpg" alt="8" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/507/400/400.jpg" alt="9" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/407/400/400.jpg" alt="10" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Popular;