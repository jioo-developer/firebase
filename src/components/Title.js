import React from 'react'
import { Link } from 'react-router-dom';
function Title(props) {
    return (
        <>
            <Link to="/"><img src="./img/close-24px.svg" className="close" alt=""/></Link>
        </>
    )
}

export default Title
