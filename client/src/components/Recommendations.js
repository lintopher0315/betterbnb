import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Recommendations() {

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
                Recommendations
            </div>
            <div id="slider-container">
                <Slider {...settings}>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/153/400/400.jpg" alt="1" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/174/400/400.jpg" alt="2" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/164/400/400.jpg" alt="3" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/158/400/400.jpg" alt="4" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/248/400/400.jpg" alt="5" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/258/400/400.jpg" alt="6" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/297/400/400.jpg" alt="7" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/204/400/400.jpg" alt="8" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/382/400/400.jpg" alt="9" />
                    </div>
                    <div>
                        <img id="slider-image" src="https://i.picsum.photos/id/381/400/400.jpg" alt="10" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Recommendations;