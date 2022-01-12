import React, { Component } from 'react';

export class NotFound extends Component{ 
    static displayName = NotFound.name;

    render () {
        return ( 
            <div>
                <h2>Page not found, either work is in progress either you made a bug...</h2>
            </div> 
        );
    }
}


 
