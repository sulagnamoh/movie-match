import React from "react";
import { useState } from 'react';
import './checkbox.css';

const genres = [
    {"_id": 1,
        "name": "Comedy"
},
{"_id": 2,
"name": "Horror"},
]


export function Checkbox() {
    const [isChecked, setIsChecked] = useState({
        comedy: false,
        drame: false,
        action: false,
        hulu: false,
        disney: false,
        netflix: false,
    });

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setIsChecked({
            ...isChecked,
            [name]: checked,
        });
    };

    return (
        <div className="nav-links">
            <div style={{marginLeft: '20px', marginRight: '5px'}}>
            Genres:
            </div>
            <div className="checkbox-container">
<label style={{ marginRight: '10px'}}>
        <input
          type="checkbox"
          name="comedy"
          checked={isChecked.comedy}
          onChange={handleCheckboxChange}
        />
         Comedy
      </label>
      
      <label style={{ marginRight: '10px'}}>
        <input
          type="checkbox"
          name="horror"
          checked={isChecked.horror}
          onChange={handleCheckboxChange}
        />
         Horror
      </label>
   
      <label style={{ marginRight: '25px'}}>
        <input
          type="checkbox"
          name="action"
          checked={isChecked.action}
          onChange={handleCheckboxChange}
        />
         Action
      </label>

      Streaming On:

      <label style={{ marginLeft: '5px', marginRight: '10px'}}>
        <input
          type="checkbox"
          name="netflix"
          checked={isChecked.netflix}
          onChange={handleCheckboxChange}
        />
         Netflix
      </label>

      <label style={{ marginRight: '10px'}}>
        <input
          type="checkbox"
          name="hulu"
          checked={isChecked.hulu}
          onChange={handleCheckboxChange}
        />
         Hulu
      </label>
     
      <label style={{ marginRight: '10px'}}>
        <input
          type="checkbox"
          name="disney"
          checked={isChecked.disney}
          onChange={handleCheckboxChange}
        />
         Disney+
      </label>
      </div>


      </div>

    
    )
}

export default Checkbox;