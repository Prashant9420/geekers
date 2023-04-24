import { useState, useRef } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import qs from "qs";
import { toast } from "react-toastify";
import Editor from "@monaco-editor/react";
import Header from "../../components/Header/Header";

const Compiler = () => {
  const [language, setLanguage] = useState("*");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copy, setCopy] = useState(false);
  const editorRef = useRef(null);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (value, event) => {
    setCode(value);
  };

  const handleInputChage = (event) => {
    setInput(event.target.value);
  };

  const handleCopyCode = () => {
    setCopy(true);
    toast("Code Copied!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
    });

    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const handleRunClick = async () => {
    if (language === "*") {
      toast("Please select a language!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
      return;
    }
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
      if (ans.output === "") setOutput(ans.error);
      else setOutput(ans.output);
    } catch (error) {
      console.log(error);
      setOutput(error.message);
    }
  };

  return (
    <>
      <Header />
      <Box>
        <Container>
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ mr: 2, my: 3 }}
          >
            <MenuItem value="*">Select A language</MenuItem>
            <MenuItem value="py">Python</MenuItem>
            <MenuItem value="js">JavaScript</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
          </Select>
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
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ width: "60%", mb: 1 }}>
            <Editor
              height="86.1vh"
              width="100%"
              defaultLanguage={language}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                selectOnLineNumbers: true,
                fontSize: 19,
                overviewRulerBorder: false,
              }}
            />
          </Box>
          <Box
            sx={{
              width: "40%",
              mb: 3,
            }}
          >
            <TextField
              label="Console"
              multiline
              fullWidth
              value={input}
              onChange={handleInputChage}
              variant="outlined"
              rows={3}
            />
            <TextField
              label="Output"
              multiline
              fullWidth
              value={output}
              variant="outlined"
              rows={25}
              sx={{ mt: 2 }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Compiler;
