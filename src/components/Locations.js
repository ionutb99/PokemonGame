import React from 'react'


/**
 * 
 * @param {*} props 
 * @returns Html structure for the landing page, contains all the locations we can visit(20 out of 850)
 */
export default function Locations(props) {
  return (
    <h2 className="location" onClick={(e) => props.setLocationId(e.target.dataset.id)}  data-id={props.id}>{props.location}</h2>
  )
}

