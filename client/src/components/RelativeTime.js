import React from 'react'

function RelativeTime(props) {
    // TODO: Implement relative time
    return (
        <span>
            {new Date(props.time).toLocaleString()}
        </span>
    )
}

export default RelativeTime