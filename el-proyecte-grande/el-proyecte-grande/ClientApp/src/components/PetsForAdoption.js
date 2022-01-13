import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/posts";

const PetsForAdoption = () => {

    const [pets, setPets] = useState({});
    useEffect(() =>{
        setPets(actions.fetchAll);
    })

    return ( 
        <div className="pets">works</div>
     );
}
 

export default PetsForAdoption;