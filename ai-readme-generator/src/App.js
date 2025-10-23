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
import { useEffect } from "react";

function App() {
  const handlesubmit = () => {
    console.log("button clicked");
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
        background: `
          radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.15),
            transparent 40%
          ),
          linear-gradient(135deg, #667eea 0%, #764ba2 100%)
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        position: "relative",
        overflow: "hidden",
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
                boxShadow: "0 8px 14px rgba(102, 126, 234, 0.4)",
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              AI-Powered README Generator
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem", fontWeight: 400, fontFamily: "'Roboto', sans-serif" }}
            >
              Transform your repository into professional documentation
              instantly
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="GitHub Repository URL"
              type="text"
              placeholder="https://github.com/username/repository"
              InputProps={{
                startAdornment: (
                  <GitHubIcon sx={{ color: "action.active", mr: 1 }} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<AutoAwesomeRoundedIcon />}
            onClick={handlesubmit}
            sx={{
              py: 1.5,
              fontSize: "1.05rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #663a8f 100%)",
                boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Generate README
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 3,
            }}
          >
            Powered by AI • Free to use • No login required
          </Typography>
        </Paper>
      </Container>

      {/* Developer Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "rgba(56, 47, 47, 0.9)",
          fontSize: "12px",
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          zIndex: 10,
        }}
      >
        Developed by{" "}
        <Box
          component="span"
          sx={{
            color: "#ff4757",
            display: "inline-block",
            animation: "heartbeat 1.5s ease-in-out infinite",
            "@keyframes heartbeat": {
              "0%, 100%": {
                transform: "scale(1)",
              },
              "10%, 30%": {
                transform: "scale(1.1)",
              },
              "20%, 40%": {
                transform: "scale(1)",
              },
            },
          }}
        >
          ❤️
        </Box>{" "}
        Disitha Ranasinghe
      </Box>
    </Box>
  );
}

export default App;
