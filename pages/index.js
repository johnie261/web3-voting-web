import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import Countdown from 'react-countdown';

import { VotingContext } from '@/Context/Voter';
import Style from '../styles/index.module.css'
import Card from '@/components/Card/Card';
import image from '../public/assets/punk1.jpeg'


export default function index() {
  return (
    <div>Home</div>
  )
}
