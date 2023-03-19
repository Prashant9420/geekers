import style from "./Compiler.module.css";
import Header from "../../components/Header/Header";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Compiler = () => {
  return (
    <div>
      <Header />
      <div className={style.compiler}>
        <div className={style.left}>
          <select className={style.selectLanguage}>
            <option value="">Select a Language</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
          <Button variant="contained">Index-1</Button>
          <div className={style.codeInput}>
            <input type="text" />
            <ContentCopyIcon />
          </div>
        </div>
        <div className={style.right}>
          <div className={style.button}>
            <Button variant="contained">Custom Input</Button>
            <Button variant="contained">Custom Output</Button>
          </div>
          <div className={style.codeOutput}>
            <input type="text" className={style.code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
