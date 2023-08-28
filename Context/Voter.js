import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from 'next/navigation';

import { votingAddress, votingAbi } from './Constant';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) => new ethers.Contract(votingAddress, votingAbi, signerOrProvider);

export const VotingContext = createContext();

export const VotingProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('')
    const [candidateLength, setCandidateLength] = useState('')
    const pushCandidate = [];
    const candidateIndex = [];
    const [candidateArray, setCandidateArray] = useState(pushCandidate)
    const [error, setError] = useState('')

    const router = useRouter();
    const highestVote = [];

    const pushVoter = [];
    const [voterArray, setVoterArray] = useState(pushVoter)
    const [voterLength, setVoterLength] = useState('')
    const [voterAddress, setVoterAddress] = useState([])

    const checkIfWalletIsConnected = async() => {
        if(!window.ethereum) return setError("Please install Metamask")

        const accounts = await window.ethereum.request({method: "eth_accounts"})

        if(accounts.length) {
            setCurrentAccount(accounts[0])
        } else {
            setError("Please install Metamask")
        }
         
    }

    const connectWallet = async() => {
        if(!window.ethereum) return setError("Please install Metamask")

        const accounts = await window.ethereum.request({method: "eth_requestAccounts"})

        setCurrentAccount(accounts[0]) 
    }

    return (
        <VotingContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet
            }}
        >
            {children}
        </VotingContext.Provider>
    )
}