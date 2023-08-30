import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from 'next/navigation';

import { votingAddress, votingAbi } from './Constant';

//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const projectId = "2Uf6WUUvPNFDkzGcBYm0Poxnz9W";
const projectSecretKey = "d8764441ca20104e54364b44cc4464c6";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;

const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
    authorization: auth,
    }
});

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

    const uploadToIPFS = async(file) => {
        try {
            const added = await client.add({ content: file });

            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return url;
        } catch (error) {
            setError("Error uploading file to IPFS")
        }
    }

    const createVoters = async(formInput, fileUrl, router) => {
        try {
           const { name, address, position } = formInput

           if(!name || !address || !position) return console.log("Input data is missing")

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
              votingAddress,
              votingAbi,
              signer
           )

            console.log("contract", contract)
           
           const data = JSON.stringify({ name, address, position, image: fileUrl })
           const added = await client.add(data);

           const url = `https://link.infura-ipfs.io/ipfs/${added.path}`


           const voter = await contract.voterRight(address, name, url, fileUrl)
           const receipt = await voter.wait();
          
           console.log("voter", receipt)

           router.push("/voterList")
        } catch (error) {
            setError("Something went wrong in creating voter")
        }
    }

    const getAllVoterData = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner()
            const contract = new ethers.Contract( votingAddress, votingAbi, signer )

            const voterListData = await contract.getVoterList();
            setVoterAddress(voterListData);
        
            voterListData.map(async(elem) => {
                const singleVoterData = await contract.getVoterdata(elem)
                pushCandidate.push(singleVoterData); 
            })

            const voterList = await contract.getVoterLength();
            setVoterLength(voterList.toNumber())
        } catch (error) {
            setError("Error in getting voter data")
        }
    }

    // useEffect(()=> {
    //     getAllVoterData()
    // }, []) 

    const giveVote = async(id) => {
        try {
            
        } catch (error) {
            
        }
    }


    return (
        <VotingContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                client, 
                createVoters,
                getAllVoterData,
                giveVote
            }}
        >
            {children}
        </VotingContext.Provider>
    )
}