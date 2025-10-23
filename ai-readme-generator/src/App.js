import React, { useState } from "react";
import "./index.css"; // we'll use Tailwind later if you want

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // For now, just simulate (later we’ll call backend)
    setTimeout(() => {
      alert(`README will be generated for: ${repoUrl}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        🧠 AI-Powered README Generator
      </h1>

      <input
        type="text"
        placeholder="Enter GitHub Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || repoUrl.trim() === ""}
        style={{
          marginTop: "20px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Generating..." : "Generate README"}
      </button>

      <p style={{ marginTop: "30px", color: "#555" }}>
        Paste your public GitHub repo link and click "Generate README"
      </p>
    </div>
  );
}

export default App;
