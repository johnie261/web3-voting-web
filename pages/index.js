import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import Countdown from 'react-countdown';

import { VotingContext } from '@/Context/Voter';
import Style from '../styles/index.module.css'
import Card from '@/components/Card/Card';
import image from '../public/assets/punk1.jpeg'

const index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    currentAccount,
    voterLength
  } = useContext(VotingContext)

  useEffect(() => {
    checkIfWalletIsConnected()
    getNewCandidate()
  }, [])

  console.log(candidateArray)

  return (
    <div className={Style.home}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>No Candidate: <span>{candidateLength}</span></p>
            </div>
            <div className={Style.candidate_list}>
              <p>No of Voters: <span>{voterLength}</span></p>
            </div>
          </div>

          <div className={Style.winner_message}>
            <small>
              <Countdown date={Date.now() + 100000} />
            </small>
          </div>
        </div>
      )}

      <Card candidateArray={candidateArray} giveVote={giveVote}/>
    </div>
  )
}

export default index;