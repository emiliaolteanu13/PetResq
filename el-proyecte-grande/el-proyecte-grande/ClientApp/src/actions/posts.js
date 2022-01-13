import api from "./api";
import { useEffect } from "react";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}


export const fetchAll = () => {
    
    api.posts().fetchAll()
        .then(response => {
            console.log(response);
            
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    api.posts().create(data)
        .then(res=>{
            dispatch({
                type:ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err));
}

export const update = (id, data, onSuccess) => dispatch => {
    api.posts().update(id, data)
        .then(res=>{
            dispatch({
                type:ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch => {
    api.posts().delete(id)
        .then(res=>{
            dispatch({
                type:ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err));
}