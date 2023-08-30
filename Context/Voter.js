import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from 'next/navigation';
//import ipfsClient from 'ipfs-http-client';
//const ethers = require('ethers');


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

           try{
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
           } catch(e) {
              console.log(e)
           }

           const data = JSON.stringify({ name, address, position, image: fileUrl })
           const added = await client.add(data);

           const url = `https://link.infura-ipfs.io/ipfs/${added.path}`

           //console.log("fileurl", url)

           const voter = await contract.voterRight(address, name, url, fileUrl)
           voter.wait();

           router.push("/voterList")
        } catch (error) {
            setError("Error in creating voter")
        }
    }

    // const projectId = "ggggggg";
    // const projectSecret = "23...XXX";

    // const auth = `Basic ` + Buffer.from(projectId + `:` + projectSecret).toString(`base64`);
    // const clientel = ipfsClient.create({
    // host: `ipfs.infura.io`,
    // port: 5001,
    // protocol: `https`,
    // headers: {
    //     authorization: auth,
    // },
    // });
    // clientel.add({ content: file }).then((res) => {
    //     console.log(res);
    // });

    return (
        <VotingContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                client, 
                createVoters
            }}
        >
            {children}
        </VotingContext.Provider>
    )
}