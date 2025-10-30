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
  Fade,
  Zoom,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!repoUrl.trim()) return;
    setLoading(true);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const res = await fetch(
        "https://api.readmegenai.cloud/readmegenapi/v1/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repoUrl }),
        }
      );
      const data = await res.json();

      clearInterval(progressInterval);
      setProgress(100);

      if (data.readme) {
        setTimeout(() => {
          navigate("/output", { state: { readme: data.readme } });
        }, 500);
      } else {
        alert("Failed to generate README");
        setLoading(false);
        setProgress(0);
      }
    } catch (error) {
      clearInterval(progressInterval);
      alert("Error generating README. Please try again.");
      setLoading(false);
      setProgress(0);
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
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `radial-gradient(
          800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(255, 255, 255, 0.12),
          transparent 40%
        ),
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-50%",
          width: "200%",
          height: "200%",
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          animation: "drift 20s linear infinite",
        },
        "@keyframes drift": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
      }}
    >
      <Container maxWidth="sm">
        <Zoom in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              padding: { xs: 4, sm: 6 },
              borderRadius: 5,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 80px rgba(102, 126, 234, 0.3)",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: loading ? "none" : "translateY(-4px)",
                boxShadow: loading
                  ? "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 80px rgba(102, 126, 234, 0.3)"
                  : "0 12px 48px rgba(0, 0, 0, 0.15), 0 0 100px rgba(102, 126, 234, 0.4)",
              },
            }}
          >
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Zoom in timeout={1000}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    mb: 3,
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                    animation: loading
                      ? "spin 2s linear infinite"
                      : "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                    },
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                >
                  <AutoAwesomeRoundedIcon
                    sx={{ fontSize: 48, color: "white" }}
                  />
                </Box>
              </Zoom>
              <Fade in timeout={1200}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  AI README Generator
                </Typography>
              </Fade>
              <Fade in timeout={1400}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: "1.1rem" }}
                >
                  {loading
                    ? "Generating your professional documentation..."
                    : "Transform your repository into professional documentation"}
                </Typography>
              </Fade>
            </Box>

            {!loading ? (
              <>
                <Fade in timeout={1600}>
                  <TextField
                    fullWidth
                    label="GitHub Repository URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    InputProps={{
                      startAdornment: (
                        <GitHubIcon
                          sx={{
                            mr: 1.5,
                            color: "text.secondary",
                            fontSize: 28,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        fontSize: "1.05rem",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 6px 16px rgba(102, 126, 234, 0.25)",
                        },
                      },
                    }}
                  />
                </Fade>

                <Fade in timeout={1800}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<AutoAwesomeRoundedIcon />}
                    disabled={!repoUrl.trim()}
                    onClick={handleSubmit}
                    sx={{
                      py: 1.8,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      textTransform: "none",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background:
                          "linear-gradient(135deg, #a0a0a0 0%, #808080 100%)",
                      },
                    }}
                  >
                    Generate README
                  </Button>
                </Fade>
              </>
            ) : (
              <Fade in>
                <Box sx={{ textAlign: "center", py: 2 }}>
                  {/* Linear Progress Bar */}
                  <Box sx={{ width: "100%", mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          background:
                            "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                        },
                      }}
                    />
                  </Box>

                  {/* Loading Messages */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.95rem", fontWeight: 500 }}
                  >
                    {progress < 30 && "🔍 Analyzing repository..."}
                    {progress >= 30 &&
                      progress < 60 &&
                      "📝 Processing files..."}
                    {progress >= 60 &&
                      progress < 90 &&
                      "✨ Generating README..."}
                    {progress >= 90 && "✅ Finalizing document..."}
                  </Typography>
                </Box>
              </Fade>
            )}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                No login required, No subscription, Fastest service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Developed by ❤️ Disitha Ranasinghe
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
}

export default App;
