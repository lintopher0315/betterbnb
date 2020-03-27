import React, {useState} from 'react'
import Slider from 'react-input-slider'
import "./SliderComp.css"

/*  NOTE: Slider class is originally from the following link  */
/*  https://reactjsexample.com/react-input-slider-component/  */
/*  Full styling props can be found there                     */

function SliderComp(props) {
    const [state, setState] = useState({ x: props.x, y: props.y });

    return (
        <div>
     
            <Slider  className="customSlider" axis="x" x={state.x} y={state.y} onChange={setState} 
            
            styles={{
                track: {
                  backgroundColor: 'grey',
                  width: 400
                },
                active: {
                  backgroundColor: '#3fb7eb'
                },
                thumb: {
                  width: 25,
                  height: 25
                }
              }}
              />
            <label id="slidervalue">{state.x}</label>

            
        </div>

    )

} export default SliderComp;