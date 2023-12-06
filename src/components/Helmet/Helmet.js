import React from 'react'

function Helmet(props) {
    document.title = 'Shoe - '+ props.title
    return (
        <div className='w-[100px]'>
            {props.chidren}
        </div>
    )
}

export default Helmet
