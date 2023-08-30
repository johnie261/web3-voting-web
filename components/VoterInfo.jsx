import React, { useState, useContext } from 'react';
import Style from '../styles/allowVoters.module.css';
import { VotingContext } from '@/Context/Voter';

const VoterInfo = () => {
  const { client } = useContext(VotingContext);
  const [image, setImage] = useState(null);

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

  return (
    <div className={Style.voter}>
      <div className={Style.voter_container}>
        <h1>Create new voter</h1>
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
  );
};

export default VoterInfo