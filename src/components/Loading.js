import React from 'react';

const Loading = ({isLoading}) => {
    if(isLoading) {
        return (
            <div className = 'loading'>
                <h1>
                    {/* Retrieving data from server... */}
                    &#8734;
                </h1> 
            </div>
        )
    } else return null;
}

export default Loading;