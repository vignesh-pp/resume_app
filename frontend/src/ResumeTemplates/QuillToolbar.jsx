import React from "react";
import { Quill } from "react-quill";
import Sparkles from "lucide-react/dist/esm/icons/sparkles"; // Install lucide-react if not already
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";


// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];

// Quill Toolbar component
export const QuillToolbar = ({handleopenaienhance}) => {

  return (
  <div id="toolbar">
    {/* <span className="ql-formats"> */}
      {/* <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select> */}
    {/* </span> */}
    <span style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-strike" />
      <select className="ql-background" />
      <button className="ql-link" />
      <button className="ql-clean" />
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
    {/* <span className="ql-formats">
    </span>
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
    <select className="ql-align" />
    <select className="ql-color" />
    <button className="ql-code-block" />
    <span className="ql-formats">
    <button className="ql-blockquote" />
    <button className="ql-script" value="super" />
    <button className="ql-script" value="sub" />
    <button className="ql-direction" />
    </span>
    <span className="ql-formats">
    </span>
    <span className="ql-formats">
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
    </span> */}
    <span className="d-flex gap-2">
    { typeof(handleopenaienhance) === 'function' &&    
      <Button
          startIcon={<Sparkles size={16} color="#fff" />}
          onClick={handleopenaienhance}
          sx={{
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%) !important", // light purple to soft blue
            color: "#fff !important",
            width: "11rem !important",
            fontSize: "11px !important",
            borderRadius: "999px !important",
            px: "10px !important",
            py: "16px !important",
            fontWeight: "bold !important",
            textTransform: "none !important",
            boxShadow: "0 4px 14px rgba(167, 139, 250, 0.35) !important", // matching purple glow
            "&:hover": {
              background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%) !important", // slightly deeper on hover
              boxShadow: "0 6px 20px rgba(139, 92, 246, 0.45) !important",
            },
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            letterSpacing: "0.5px",
          }}
        >
          Get help with writing
      </Button>}

    </span>
    </span>
  </div>
)};

export default QuillToolbar;
