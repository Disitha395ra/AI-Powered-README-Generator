import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Button,
  TextField,
  Container,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!repoUrl.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();

      if (data.readme) {
        // Navigate to Output page with state
        navigate("/output", { state: { readme: data.readme } });
      } else {
        alert("Failed to generate README");
      }
    } catch (error) {
      alert("Error generating README. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `radial-gradient(
          600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(255, 255, 255, 0.15),
          transparent 40%
        ),
        linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            padding: 5,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                mb: 2,
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              AI-Powered README Generator
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="GitHub Repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            InputProps={{ startAdornment: <GitHubIcon sx={{ mr: 1 }} /> }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<AutoAwesomeRoundedIcon />}
            disabled={loading || !repoUrl.trim()}
            onClick={handleSubmit}
          >
            {loading ? "Generating..." : "Generate README"}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
