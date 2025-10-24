import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Button,
  Box,
  Paper,
  Container,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Output() {
  const location = useLocation();
  const navigate = useNavigate();
  const readme = location.state?.readme || "";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={600}>
          <Box sx={{ mb: 4 }}>
            <Paper
              elevation={4}
              sx={{
                padding: 2.5,
                borderRadius: 3,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Tooltip title="Back to Generator">
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={copied ? "Copied!" : "Copy to Clipboard"}>
                <Button
                  onClick={handleCopy}
                  variant="contained"
                  startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    background: copied
                      ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background: copied
                        ? "linear-gradient(135deg, #0e8070 0%, #2ed968 100%)"
                        : "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Tooltip>

              <Tooltip title="Download README.md">
                <Button
                  onClick={handleDownload}
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #e07eea 0%, #e0445a 100%)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Download
                </Button>
              </Tooltip>
            </Paper>
          </Box>
        </Fade>

        <Fade in timeout={800}>
          <Paper
            sx={{
              padding: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.98)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              "& h1, & h2, & h3": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              },
              "& code": {
                background: "rgba(102, 126, 234, 0.08)",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "0.9em",
                fontFamily: "monospace",
              },
              "& pre": {
                background: "#f8f9fa",
                padding: "16px",
                borderRadius: "8px",
                overflow: "auto",
                border: "1px solid #e9ecef",
              },
              "& a": {
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={github}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {readme}
            </ReactMarkdown>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}