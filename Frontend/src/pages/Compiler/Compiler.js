import { useState } from "react";
import axios from "axios";
import qs from "qs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import { Button, Typography } from "@mui/material";
import Snackbar from "../../utils/Snackbar";
import SnackbarForCompiling from "../../utils/SnackbarForShowingWait";
import CodeMirror from "@uiw/react-codemirror";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import Header from "../../components/Header/Header";
import { TextField, Container } from "@mui/material";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import Tooltip from "@mui/material/Tooltip";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { saveAs } from "file-saver";

const Compiler = () => {
  const [language, setLanguage] = useState("Java");
  const [copy, setCopy] = useState(false);

  const handleCopyCode = () => {
    setCopy(true);

    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };
  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `code.${languageArrayExtension[language]}`);
  };

  const languageArray = ["Java", "Python", "C++", "C", "Javascript"];
  const languageArrayExtension = {
    Java: "java",
    Python: "py",
    "C++": "cpp",
    C: "c",
    Javascript: "js",
  };
  const extensionsEditor = {
    Java: java(),
    Python: python(),
    "C++": cpp(),
    C: cpp(),
    Javascript: javascript(),
  };
  const [languageDefaultCode, setLanguageDefaultCode] = useState({
    Java: `public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, world!");
        }
    }`,
    Python: `print("Hello, world!")`,
    "C++": `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, world!";
    return 0;
    }`,
    C: `#include <stdio.h>
    int main() {
        printf("Hello, world!");
        return 0;
        }`,
    Javascript: `console.log("Hello, world!");`,
  });
  const [code, setCode] = useState(languageDefaultCode[language]);
  const [consoleInputs, setConsoleInputs] = useState({
    Java: " ",
    Python: " ",
    "C++": " ",
    C: " ",
    Javascript: " ",
  });
  const [outputBoxValue, setOutputBoxValue] = useState({
    Java: "",
    Python: "",
    "C++": "",
    C: "",
    Javascript: "",
  });
  const [compilingSnackbar, setCompilingSnackbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const executeCode = () => {
    setOutputBoxValue(" ");
    toast.info("Compiling...", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });

    var data = qs.stringify({
      code: code,
      language: languageArrayExtension[language],
      input: consoleInputs[language],
    });
    var config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const output = response?.data?.output;
        const error = response?.data?.error;
        setOutputBoxValue({
          ...outputBoxValue,
          [language]: output ? output : error,
        });
        setCompilingSnackbar(false);
      })
      .catch(function (error) {
        setCompilingSnackbar(false);
        if (error.response.status === 408) {
          setSeverity("error");
          setMessageSnackbar("Please provide valid console inputs");
          setIsOpen(true);
        } else {
          setSeverity("error");
          setMessageSnackbar("Something went wrong");
          setIsOpen(true);
        }
      });
  };

  return (
    <div>
      <Header />
      <Snackbar
        isOpen={isOpen}
        severity={severity}
        message={messageSnackbar}
        setIsOpen={setIsOpen}
      />
      <SnackbarForCompiling
        isOpen={compilingSnackbar}
        severity="info"
        message="Compiling..."
        setIsOpen={setCompilingSnackbar}
      />
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          margin: "1rem",
          justifyContent: "space-around",
          alignItems: "flex-end",
          height: "88vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "40vw",
            borderRadius: "10px",
            height: "43.6rem",
          }}
        >
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              margin: "10px 0 5px .2rem",
            }}
          >
            Select a language
          </InputLabel>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "50vw",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Choose language"
              onChange={(event) => {
                setLanguage(event.target.value);
                setCode(languageDefaultCode[event.target.value]);
              }}
              style={{ width: "15rem" }}
            >
              {languageArray.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>

            <div style={{ display: "flex", gap: "1rem", padding: "0 15px" }}>
              <Tooltip title="Run" placement="top">
                <SendIcon onClick={executeCode} style={{ cursor: "pointer" }} />
              </Tooltip>
              {copy ? (
                <Tooltip title="Copied" placement="top">
                  <LibraryAddCheckRoundedIcon />
                </Tooltip>
              ) : (
                <Tooltip title="Copy" placement="top">
                  <ContentCopyIcon
                    onClick={handleCopyCode}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              )}
              <Tooltip title="Download" placement="top">
                <DownloadRoundedIcon
                  onClick={handleDownloadCode}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
            </div>
          </div>
          <CodeMirror
            value={languageDefaultCode[language]}
            height="36.5rem"
            width="50vw"
            extensions={[extensionsEditor[language]]}
            onChange={(value) => {
              setCode(value);
              setLanguageDefaultCode({
                ...languageDefaultCode,
                [language]: value,
              });
            }}
            theme={draculaInit({
              settings: {
                caret: "#c6c6c6",
                fontFamily: "monospace",
              },
              styles: [
                {
                  tag: t.comment,
                  color: "#6272a4",
                },
              ],
            })}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "43.6rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: ".5rem",
              flexWrap: "wrap",
              width: "30rem",
              height: "39.2rem",
            }}
          >
            <div>
              <InputLabel>Console</InputLabel>
              <TextField
                multiline
                value={consoleInputs[language]}
                onChange={(e) => {
                  setConsoleInputs({
                    ...consoleInputs,
                    [language]: e.target.value,
                  });
                }}
                inputProps={{
                  style: {
                    fontSize: 20,
                    height: "8rem",
                    width: "28rem",
                  },
                }}
                variant="outlined"
                sx={{
                  backgroundColor: "#282A36",
                  color: "#f8f8f2",
                }}
              />
            </div>
            <div>
              <InputLabel>Output</InputLabel>
              <TextField
                multiline
                value={outputBoxValue[language]}
                variant="outlined"
                inputProps={{
                  style: {
                    fontSize: 20,
                    height: "21.8rem",
                    width: "28rem",
                    color: "#FFFFFF",
                  },
                }}
                sx={{
                  backgroundColor: "#282A36",
                  color: "#f8f8f2",
                }}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Compiler;
