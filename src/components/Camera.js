import React, { useRef } from 'react';
export default function Camera() {
  const videoRef = useRef();

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoRef.current.srcObject = stream)
      .catch(console.error);
  };

  return (
    <div className="card">
      <h2>Snap a Photo</h2>
      <video ref={videoRef} width="300" autoPlay />
      <button onClick={startCamera}>Start Camera</button>
    </div>
  );
}
