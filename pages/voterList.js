import React, { useContext, useEffect } from 'react'
import Style from '../styles/voterList.module.css'
import { VotingContext } from '@/Context/Voter'
import VoterCard from '@/components/VoterCard/VoterCard'

const VoterList = () => {

  const { getAllVoterData, voterArray, getNewCandidate } = useContext(VotingContext)

  useEffect(() => {
    getAllVoterData()
    getNewCandidate()
  }, [])

  return (
    <div className={Style.VoterList}>
      <VoterCard voterArray={voterArray}/>
    </div>
  )
}

export default VoterList