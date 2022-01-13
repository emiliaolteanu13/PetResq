import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/posts";

const PetsForAdoption = () => {

    const [pets, setPets] = useState({});
    useEffect(() =>{
        setPets(actions.fetchAll);
        console.log(actions.fetchAll)
    })

    return ( 
        <div className="pets">works</div>
     );
}
 

const mapStateToProps = state => ({
    petsList: state.PetsForAdoption.list
})

const mapActionToProps = {
    fetchAllPosts: actions.fetchAll,
    //deleteDCandidate: actions.Delete
}

export default PetsForAdoption;