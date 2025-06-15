import React, { useRef, useState, useEffect } from "react";

const challenges = [
  "Sustainability",
  "Community Service",
  "Health & Fitness",
  "Creative Arts",
  "Tech Innovation",
];

export default function CameraCaptureWithChallenge({ onSubmit }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [hasCamera, setHasCamera] = useState(true);
  const [photoData, setPhotoData] = useState(null);
  const [step, setStep] = useState("camera"); // camera -> confirm -> selectChallenge
  const [selectedChallenge, setSelectedChallenge] = useState("");

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Camera access denied or not available", err);
        setHasCamera(false);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/png");
    setPhotoData(imageDataUrl);
    setStep("confirm");
  }

  function handleConfirm(confirm) {
    if (confirm) {
      setStep("selectChallenge");
    } else {
      // retake photo: go back to camera
      setPhotoData(null);
      setStep("camera");
    }
  }

  function handleSubmit() {
    if (!selectedChallenge) {
      alert("Please select a challenge.");
      return;
    }
    if (onSubmit) {
      onSubmit({ photoData, challenge: selectedChallenge });
    }
    // Reset everything after submission
    setPhotoData(null);
    setSelectedChallenge("");
    setStep("camera");
  }

  if (!hasCamera) {
    return <p>Camera not available or permission denied.</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      {step === "camera" && (
        <>
          <video ref={videoRef} style={{ width: "100%", borderRadius: 8 }} />
          <button
            onClick={capturePhoto}
            style={{
              marginTop: 10,
              padding: "10px 20px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 5,
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
            }}
          >
            Take Photo
          </button>
        </>
      )}

      {step === "confirm" && (
        <>
          <h3>Is this photo okay?</h3>
          <img
            src={photoData}
            alt="Preview"
            style={{ width: "100%", borderRadius: 8 }}
          />
          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => handleConfirm(true)}
              style={{
                marginRight: 10,
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Yes, Submit
            </button>
            <button
              onClick={() => handleConfirm(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Retake
            </button>
          </div>
        </>
      )}

      {step === "selectChallenge" && (
        <>
          <h3>Select a Challenge</h3>
          <select
            value={selectedChallenge}
            onChange={(e) => setSelectedChallenge(e.target.value)}
            style={{ padding: "8px", fontSize: 16, width: "100%", borderRadius: 5 }}
          >
            <option value="">-- Choose a challenge --</option>
            {challenges.map((ch, i) => (
              <option key={i} value={ch}>
                {ch}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            style={{
              marginTop: 15,
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Submit Photo
          </button>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
