// src/components/UploadForm.js
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function UploadForm() {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!photo) return alert("Please choose an image to upload");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        await addDoc(collection(db, 'challenges'), {
          image: base64Image,
          caption: caption,
          user: auth.currentUser ? auth.currentUser.uid : "anonymous",
          createdAt: serverTimestamp()
        });
        alert("Photo uploaded!");
        setPhoto(null);
        setCaption("");
      } catch (error) {
        console.error("Error uploading:", error);
        alert("Failed to upload.");
      }
    };
    reader.readAsDataURL(photo);
  };

  return (
    <div className="upload-form">
      <h2>Join the Challenge</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Add a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload}>Submit Photo</button>
    </div>
  );
}

export default UploadForm;
