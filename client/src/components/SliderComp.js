import React, {useState} from 'react'
import Slider from 'react-input-slider'
import "./SliderComp.css"

/*  NOTE: Slider class is originally from the following link  */
/*  https://reactjsexample.com/react-input-slider-component/  */
/*  Full styling props can be found there                     */


function SliderComp(props) {

    const [state, setState] = useState({ preference: props.pref, x: props.x, y: props.y});
    const mypref = props.pref

    // handleClick = () => {
    //   onChildClick(state)
      

    // }

    function handleClick(event) {
      const obj = {
        x: state.x,
        y: 0,
        pref: mypref
      }
      props.onChildClick(obj)
    }

    
    return (
        <div> 
            <Slider  className="customSlider" axis="x" x={state.x} onChange={setState} onMouseUp={handleClick}
            
            styles={{
                track: {
                  backgroundColor: 'grey',
                  width: 400
                },
                active: {
                  backgroundColor: '#3fb7eb'
                },
                thumb: {
                  width: 35,
                  height: 35
                }
              }}
              />
            <label id="slidervalue">{state.x}</label>

            
        </div>

    )

} export default SliderComp;
