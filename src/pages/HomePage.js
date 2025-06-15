import React, { useState, useRef, useEffect } from "react";
import AdBanner from "../components/AdBanner";

export default function HomePage() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const handleToggleCamera = async () => {
    if (isCameraOn) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsCameraOn(false);
      setPhoto(null);
      setShowConfirm(false);
      setSelectedChallenge("");
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      } catch (err) {
        alert("Could not start camera: " + err.message);
      }
    }
  };

  const handleTakePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");
    setPhoto(imageDataURL);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (!selectedChallenge) {
      alert("Please select a challenge before uploading.");
      return;
    }
    alert(`Photo confirmed! Uploading to challenge: ${selectedChallenge}`);

    setPhoto(null);
    setShowConfirm(false);
    setSelectedChallenge("");
  };

  const handleCancel = () => {
    setPhoto(null);
    setShowConfirm(false);
    setSelectedChallenge("");
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>SnapImpact Camera</h1>

      <button type="button" onClick={handleToggleCamera}>
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      {isCameraOn && !photo && (
        <>
          <div style={{ marginTop: 20 }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "320px", border: "1px solid black" }}
            />
          </div>
          <button type="button" onClick={handleTakePhoto} style={{ marginTop: 10 }}>
            Take Photo
          </button>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {showConfirm && photo && (
        <div style={{ marginTop: 20 }}>
          <h3>Confirm your photo</h3>
          <img
            src={photo}
            alt="Captured"
            style={{ width: "320px", border: "1px solid black" }}
          />
          <div style={{ marginTop: 10 }}>
            <label>
              Select challenge to upload:&nbsp;
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
              >
                <option value="">-- Select Challenge --</option>
                <option value="challenge1">Challenge 1</option>
                <option value="challenge2">Challenge 2</option>
                <option value="challenge3">Challenge 3</option>
              </select>
            </label>
          </div>
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={handleConfirm}
              style={{ marginRight: 10 }}
            >
              Confirm & Upload
            </button>
            <button type="button" onClick={handleCancel}>
              Retake
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <AdBanner />
      </div>
    </div>
  );
}
