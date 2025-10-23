import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, TextField } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
function App() {
  return (
    <div>
      <div>
        <h1>AI-Powered README Generator</h1>
        <p>Welcome to the AI-Powered README Generator application!</p>
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Github Repository URL"
          type="text"
        />
      </div>
      <div>
        <Button variant="contained" startIcon={<AutoAwesomeRoundedIcon />}>
          Generate README
        </Button>
      </div>
    </div>
  );
}

export default App;
