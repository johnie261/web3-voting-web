import { VotingContext } from '@/Context/Voter'
import React, { useState, useContext } from 'react'


const test = () => {

    const [images, setImages] = useState([])
    const { client } = useContext(VotingContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const files = (form[0]).files;
    
        if (!files || files.length === 0) {
          return alert("No files selected");
        }
    
        const file = files[0];
        // upload files
        const result = await client.add(file);
    
        setImages([
          ...images,
          {
            cid: result.cid,
            path: result.path,
          },
        ]);
    
        form.reset();
      };

      console.log("path", images.length > 0 ? images[0].path : "No images");

    

  return (
    <div className="App">
      {client && (
        <>
          <h3>Upload file to IPFS</h3>
          <form onSubmit={onSubmitHandler}>
            <input type="file" name="file"/>
            <button type="submit">Upload file</button>
          </form>
          <div>
        {images.map((image, index) => (
          <img
          alt={`Uploaded #${index + 1}`}
          src={"https://link.infura-ipfs.io/ipfs/" + image.path}
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
        ))}
      </div>
        </>
      )}
    </div>
  )
}

export default test