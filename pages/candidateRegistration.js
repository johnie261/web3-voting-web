import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image"

import { VotingContext } from '@/Context/Voter';
import Style from '../styles/allowVoters.module.css'
import images from '../public/assets/punk1.jpeg'
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  })

  const router = useRouter()
  const { client, createVoters, setCandidate, voterArray, getNewCandidate, candidateArray } = useContext(VotingContext)

  //clean code

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // Upload file to IPFS
    const result = await client.add(file);

    setImage({
      cid: result.cid,
      path: result.path,
    });

    form.reset();
  };

  //console.log("path", image ? image.path : "No images");

  useEffect(() => {
    if (image) {
      setFileUrl(`https://link.infura-ipfs.io/ipfs/${image.path}`);
    }
  }, [image]);

  useEffect(()=> {
    getNewCandidate()
  }, [])

  console.log(candidateArray)
  

 //console.log("fileurl", fileUrl)

  //clean code

  //usecallback preveent unnecessary re-renders and improve efficiency

//   const onDrop = useCallback(async (acceptedFiles) => {
//     //const url = await uploadToIPFS(acceptedFiles[0]);
//     const res = await client.add(acceptedFiles[0])

//     console.log(res)
//     const contentHash = res.cid.toString();
//     const path = res.path
//     setPath(path)
//     setIpfsHash(contentHash);
//     //setFileUrl(acceptedFiles[0]);

//     console.log("Path:", path);
//   });

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "image/*",
//     maxSize: 5000000,
//   });

//   const getImageUrl = (hash) => {
//     return `https://link.infura-ipfs.io/ipfs/${ipfsHash}${path}`;
//   };

//   console.log("mm", ipfsHash)
//   console.log("image", image)
//   console.log(`https://link.infura-ipfs.io/ipfs/${ipfsHash}`)
//   console.log(`https://ipfs.io/ipfs/${ipfsHash}`)

  return (
    <div className={Style.createVoter}>
        <div>
        {image && (
        <div className={Style.voterInfo}>
            <img src={`https://link.infura-ipfs.io/ipfs/${image.path}`} alt="Voter image"/>
            <div className={Style.voterInfo_paragraph}>
                <p>
                    Name: <span>&nbsp;{candidateForm.name}</span>
                </p>
                <p>
                    Address: <span>&nbsp; {candidateForm.address.slice(0, 20)}</span>
                </p>
                <p>
                    Age: <span>&nbsp; {candidateForm.age}</span>
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
                    {candidateArray.map((e, i) => (
                        <div key={i+1} className={Style.card_box}>
                            <div className={Style.image}>
                                <img src={e[3]} alt="Profile"/>
                            </div>

                            <div className={Style.card_info}>
                                <p>Name: {e[1]} #{e[2].toNumber()}</p>
                                <p>Age: {e[0]}</p>
                                <p>Address: {e[6].slice(0,10)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </div>

        <div className={Style.voter}>
            {/* <div className={Style.voter_container}>
                <h1>Create new voter</h1>
                <div className={Style.voter_container_box}>
                    <div className={Style.voter_container_box_div}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}/>

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
            </div> */}

            {/* <VoterInfo /> */}

            <div className={Style.voter}>
                <div className={Style.voter_container}>
                <h1>Create new Candidate</h1>
                <div className={Style.voter_container_box}>
                    <div className={Style.voter_container_box_div}>
                    <form onSubmit={onSubmitHandler}>
                        <input type="file" name="file" />
                        <button type="submit">Upload file</button>
                    </form>
                    {image && (
                        <div className={Style.voter_container_box_div_info}>
                            <p>Upload File: JPG, PNG, GIF, WEBM max 10MB</p>

                            <div className={Style.voter_container_box_div_image}>
                                <img
                                    alt={`Uploaded image`}
                                    src={`https://link.infura-ipfs.io/ipfs/${image.path}`}
                                    style={{ maxWidth: "400px", margin: "15px" }}
                                />
                            </div>

                            <p>Upload file from your your device</p>
                        </div>
                    )}
                </div>
            </div>
      </div>
    </div>

            <div className={Style.input_container}> 
                <Input 
                    inputType="text"
                    title="Name"
                    placeholder="Voter Name"
                    handleClick={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
                />

                <Input 
                    inputType="text"
                    title="Address"
                    placeholder="Voter address"
                    handleClick={(e) => setCandidateForm({...candidateForm, address: e.target.value})}
                />

                <Input 
                    inputType="text"
                    title="Age"
                    placeholder="Candidate Age"
                    handleClick={(e) => setCandidateForm({...candidateForm, age: e.target.value})}
                />

                <div className={Style.Button}>
                    <Button btnName="Authorized Candidate" handleClick={() => setCandidate(candidateForm, fileUrl, router)}/>
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