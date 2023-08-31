import React from 'react'
import Image from "next/image"
import Style from "./Card.module.css"
//import images from '../../public/assets'
//import image from '../public/assets/punk1.jpeg'

const Card = ({ candidateArray, giveVote }) => {

  return (
    <div className={Style.card}>
      {candidateArray.map((e, i) => (
        <div className={Style.card_box}>
          <div className={Style.image}>
            <img src={e[3]} alt="profile"/>
          </div>

          <div className={Style.card_info}>
            <h2>{e[1]} #{e[2].toNumber()}</h2>
            <p>{e[0]}</p>
            <p>Address: {e[6].slice(0,30)}...</p>
            <p className={Style.total}>Total Votes</p>
          </div>

          <div className={Style.card_vote}>
            <p>{e[4].toNumber()}</p>
          </div>

          <div className={Style.card_button}>
            <button onClick={() =>giveVote({id: e[2].toNumber(), address: e[6]})}>
              Vote
            </button>
          </div> 
        </div>
      ))}
    </div>
  )
}

export default Card