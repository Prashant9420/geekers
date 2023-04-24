import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import qs from "qs";

const Compiler = () => {
  const [language, setLanguage] = useState("*");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copy, setCopy] = useState(false);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleInputChage = (event) => {
    setInput(event.target.value);
  };

  const handleCopyCode = () => {
    setCopy(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const handleRunClick = async () => {
    const data = qs.stringify({
      language: language,
      code: code,
      input: input,
    });
    try {
      const response = await fetch("https://api.codex.jaagrav.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      });
      const ans = await response.json();
      console.log(ans);
      if (ans.output === "") setOutput(ans.error);
      else setOutput(ans.output);
    } catch (error) {
      console.log(error);
      setOutput(error.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ mr: 2 }}
          >
            <MenuItem value="*">Select A language</MenuItem>
            <MenuItem value="py">Python</MenuItem>
            <MenuItem value="js">JavaScript</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
          </Select>
          <TextField
            label="Code"
            multiline
            fullWidth
            value={code}
            onChange={handleCodeChange}
            variant="outlined"
            rows={10}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Input (Optional)"
            multiline
            fullWidth
            value={input}
            onChange={handleInputChage}
            variant="outlined"
            rows={3}
          />
        </Box>
        <Button
          onClick={handleRunClick}
          variant="contained"
          sx={{ marginX: "10px" }}
        >
          Run
        </Button>
        <Button variant="contained" onClick={handleCopyCode}>
          {copy ? "Copied!" : "Copy Code"}
        </Button>
        <TextField
          label="Output"
          multiline
          fullWidth
          value={output}
          variant="outlined"
          rows={10}
          sx={{ mt: 2 }}
        />
      </Container>
    </Box>
  );
};

export default Compiler;
