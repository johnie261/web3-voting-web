import React from 'react'
import Image from 'next/image'

import Style from '../Card/Card.module.css';
//import image from '../'
import VoterStyle from './Voter.module.css'

const VoterCard = ({voterArray}) => {
  return (
    <div className={Style.card}>
      {voterArray.map((e,i) => (
        <div className={Style.card_box} key={i+1}>
          <div className={Style.image}>
            <img src={e[4]} alt="profile pic" />
          </div>

          <div className={Style.card_info}>
            <h2>
              {e[1]} #{e[0].toNumber()}
            </h2>
            <p>Addr: {e[3].slice(0,30)}...</p>
            <p>Details</p>
            <p className={VoterStyle.vote_Status}>
              {e[6] == true ? "Already voted" : "Not voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VoterCard