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

function App() {
  const handlesubmit = () => {
    console.log("button clicked");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                mb: 2,
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
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
              }}
            >
              AI-Powered README Generator
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem" }}
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
    </Box>
  );
}

export default App;
