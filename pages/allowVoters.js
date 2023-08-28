import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from "next/navigation";
import { useDropzone } from 'react-dropzone';
import Image from "next/image"

import { VotingContext } from '@/Context/Voter';
import Style from '../styles/allowVoters.module.css'
import images from '../public/assets/punk1.jpeg'
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { StyleRegistry } from 'styled-jsx';

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  })

  const router = useRouter()
  const { uploadToIPFS } = useContext(VotingContext)

  //usecallback preveent unnecessary re-renders and improve efficiency

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = await uploadToIPFS(acceptedFiles[0]);
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  
  return (
    <div className={Style.createVoter}>
        <div>
        {fileUrl && (
        <div className={Style.voterInfo}>
            <img src={fileUrl} alt="Voter image"/>
            <div className={Style.voterInfo_paragraph}>
                <p>
                    Name: <span>&nbsp;{formInput.name}</span>
                </p>
                <p>
                    Address: <span>&nbsp; {formInput.address.slice(0, 20)}</span>
                </p>
                <p>
                    Position: <span>&nbsp; {formInput.position}</span>
                </p>
            </div>
        </div>
        )}

        {!fileUrl && (
            <div className={Style.sideInfo}>
                <div className={Style.sideInfo_box}>
                    <h4>Create a candidate for voting</h4>
                    <p>Blockchain voting organization</p>
                    <p className={Style.sideInfo_para}>
                        Contract Candidate List
                    </p>
                </div>

                <div className={Style.card}>
                    {/* {voterArray.map((e, i) => (
                        <div key={i+1} className={Style.card_box}>
                            <div className={Style.image}>
                                <img src="" alt="Profile"/>
                            </div>

                            <div className={Style.card_info}>
                                <p>Name</p>
                                <p>Address</p>
                                <p>Details</p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        )}
        </div>

        <div className={Style.voter}>
            <div className={Style.voter_container}>
                <h1>Create new voter</h1>
                <div className={Style.voter_container_box}>
                    <div className={Style.voter_container_box_div}>
                        <div {...getRootProps()}>
                            <input {...getInputProps}/>

                            <div className={Style.voter_container_box_div_info}>
                                <p>Upload File: JPG, PNG, GIF, WEBM max 10MB</p>

                                <div className={Style.voter_container_box_div_image}>
                                    <Image 
                                       src={images}
                                       height={150}
                                       width={150}
                                       objectFit="contain"
                                       alt="File upload"
                                    />
                                </div>

                                <p>Drag & Drop a File</p>
                                <p>or Browse Media on your device</p>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>

            <div className={Style.input_container}> 
                <Input 
                    inputType="text"
                    title="Name"
                    placeholder="Voter Name"
                    handleClick={(e) => setFormInput({...formInput, name: e.target.value})}
                />

                <Input 
                    inputType="text"
                    title="Address"
                    placeholder="Voter address"
                    handleClick={(e) => setFormInput({...formInput, address: e.target.value})}
                />

                <Input 
                    inputType="text"
                    title="Position"
                    placeholder="Voter Position"
                    handleClick={(e) => setFormInput({...formInput, position: e.target.value})}
                />

                <div className={Style.Button}>
                    <Button btnName="Authorized Voter" handleClick={() => {}}/>
                </div>
            </div>
        </div>

        <div className={Style.createdVoter}>
            <div className={Style.createdVoter_info}>
                <Image src={images} alt="user Profile"/>
                <p>Notice For User</p>
                <p>Coordinator <span>0x939939..</span></p>
                <p>Only Coordinator can add a new voter for election </p>
            </div>
        </div>
    </div>
  )
}

export default allowedVoters