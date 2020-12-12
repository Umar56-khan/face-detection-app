import React from "react";
import "./ImageLinkFprm.css";

const ImageLinkForm = ( { onInputChange, onButtonSubmit } ) => {
    return ( 
        <div>
            <p className="f3">
                {"This app will detect faces in your pictures. Give it a try"}
            </p>
            <div className='App-center'>
            <div className="pa4 center form br3 shadow-5">
            <input className="f4 pa3 w-70  center " type="text" onChange={onInputChange} ></input>
            <button className=" f5 w-30 ph3 pv link pa3 dib white bg-light-purple grow" 
            onClick={onButtonSubmit} >
                Detect</button>
            </div>
            </div>
        </div>
    
    );
}

export default ImageLinkForm;