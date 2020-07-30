import React, { useState } from 'react'
import { Range, getTrackBackground } from "react-range";

function UseRange() {
    const STEP = 20;
    const MIN = 300;
    const MAX = 10000;

    const [values, setValues] = useState([300, 600])

    return (<div
        style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
        }}
    >
        <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={values => setValues(values)}
            renderTrack={({ props, children }) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%"
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                                values: values,
                                colors: ['#DBDBDB', '#FFB808', '#DBDBDB'],
                                min: MIN,
                                max: MAX
                            }),
                            alignSelf: "center"
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '13px',
                        width: '13px',
                        borderRadius: '21px',
                        backgroundColor: '#FFB808',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #FFF'
                    }}>
                </div>
            )}
        />
        {`Desde: $${values[0]} - $${values[1]}`}
    </div>)

}

export default UseRange