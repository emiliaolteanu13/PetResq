import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/posts";

const PetsForAdoption = (props) => {

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllPosts()
    }, [])
    

    return ( 
        <div>
            <ul>
                {
                    props.petsList.map((record,index)=>{
                        return(
                            <li key={index}>
                                {record.Title}
                                {record.Description}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
     );
}
 

const mapStateToProps = state => ({
    petsList: state.PetsForAdoption.list
})

const mapActionToProps = {
    fetchAllPosts: actions.fetchAll,
    //deleteDCandidate: actions.Delete
}

const a = connect(mapStateToProps, mapActionToProps)(PetsForAdoption);
debugger;

export default connect(mapStateToProps, mapActionToProps)(PetsForAdoption);