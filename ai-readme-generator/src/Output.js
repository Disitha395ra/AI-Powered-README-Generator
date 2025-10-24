import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button, Box, Paper, Container } from "@mui/material";

export default function Output() {
  const location = useLocation();
  const navigate = useNavigate();
  const readme = location.state?.readme || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    alert("Copied to clipboard!");
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
    <Box sx={{ minHeight: "100vh", padding: 4, backgroundColor: "#f7f8fc" }}>
      <Container maxWidth="md">
        <Paper sx={{ padding: 4, borderRadius: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Button onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              ← Back
            </Button>
            <Button onClick={handleCopy} sx={{ mr: 2 }} variant="contained">
              Copy
            </Button>
            <Button onClick={handleDownload} variant="contained">
              Download
            </Button>
          </Box>

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
      </Container>
    </Box>
  );
}
