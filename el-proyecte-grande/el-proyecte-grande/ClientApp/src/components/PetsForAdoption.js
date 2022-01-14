import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/posts";

const PetsForAdoption = () => {

    const [pets, setPets] = useState({});
    useEffect(() =>{
        setPets(actions.fetchAll);
    })

    const Pets = ["dog", "cat", "soon will be happy"]

    return ( 
    <>
       {
        Pets.map((pet) => (
            <div>
                <h2> {pet} </h2>
            </div>))
       } 
        
    </>);
}
 

export default PetsForAdoption;