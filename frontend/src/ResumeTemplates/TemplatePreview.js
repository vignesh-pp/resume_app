import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  InputBase,
  Container,
  Tooltip,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
  Avatar,
  Autocomplete,
  InputAdornment,
  Skeleton,
  Tab,
  Tabs
} from "@mui/material";
import Photo from "../Images/photo.png";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import { set, get } from "idb-keyval";
import { Delete, Add } from "@mui/icons-material";
import { modules, formats, QuillToolbar } from "./QuillToolbar";
import TemplateStepper from "./TemplateStepper";
import SelectedTemplate from "./SelectedTemplate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import TemplateStyles from "./TemplateStyles";
import CreatableSelect from "react-select/creatable";
import { Chip } from "@mui/material";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EducationComponent from "../Pages/EducationComponent";
import ExperienceComponent from "../Pages/ExperienceComponent";
import CertificateComponent from "../Pages/CertificateComponent";
import ProjectComponent from "../Pages/ProjectComponent";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import axiosInstance from "../Pages/axiosInstance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SkillsComponent from "../Pages/SkillsComponent";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import SubjectIcon from "@mui/icons-material/Subject";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ApprovalIcon from "@mui/icons-material/Approval";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocumentPdf1 from "./SampleTemplates/ResumeDocumentPdf1";
import ResumeDocumentDocx1 from "./SampleTemplates/ResumeDocumentDocx1";
import { toast } from "react-toastify";
import htmlDocx from "html-docx-js/dist/html-docx";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import PaletteIcon from "@mui/icons-material/Palette";
import ReactDOMServer from "react-dom/server";
import { Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { FiArrowLeft, FiEdit2, FiCheckCircle } from "react-icons/fi";
import { Description, PictureAsPdf } from "@mui/icons-material"; // MUI icons for Word and PDF
import SectionSelection from "../Pages/SelectedSection";
import SectionEditor from "../Pages/SectionEditor";
import LanguageIcon from "@mui/icons-material/Language";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import MessageIcon from "@mui/icons-material/Message";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import { store } from "../Pages/store";
import Navbar from "../Navbar/Navbar";
import AchievementsComponent from "../Pages/AchivementsComponet";
import StylingSection from "./StylingSection";
import SelectedPdfTemplate from "./SelectedPdfTemplate";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import DeleteConfirmationDialog from "../Pages/DeleteConfirmationDialog";
import { SearchIcon } from "lucide-react";
import RemoveIcon from "@mui/icons-material/Remove";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Sparkles from "lucide-react/dist/esm/icons/sparkles"; // Install lucide-react if not already
import { styled } from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Test from "./Test";

const filter = createFilterOptions();
function TemplatePreview(props) {
  const {
    selectedTemplate,
    setSelectedTemplate,
    setActiveTab,
    pathname,
    debouncedSave,
    setAllTemplates
  } = props;
  let steps = selectedTemplate?.steps || ["Home"];
  const dispatch = useDispatch();
  const SummaryeditorRef = useRef(null);
  const [sortState, setSortState] = useState("default");
  const { childroute,userId } = useParams();
  const userDetailsAutosave = useSelector((state) => state.template_details);
  const navigate = useNavigate();
  const useremail = store?.getState()?.user?.useremail;
  const [activeStep, setActiveStep] = useState(steps[0]);
  const isPreview = activeStep === "preview";
  const currentIndex = steps.indexOf(activeStep);
  const [content, setContent] = useState("");
  const [currentSection, setCurrentSection] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [tempEntry, setTempEntry] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(null); // Tracks the open form for 'education' or 'experience'
  const [resumeName, setResumeName] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lineHeight, setLineHeight] = useState("16pt");
  const [fontSize, setFontSize] = useState("14pt");
  const [selectedSection, setSelectedSection] = useState("all");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textDecoration, setTextDecoration] = useState("none");
  const [textAlign, setTextAlign] = useState("left");
  const [fontColor, setFontColor] = useState("#000000");
  const [textType, setTextType] = useState("body");
  const [customeditOrAdd, setcustomeditOrAdd] = useState('');
  const [emailError, setEmailError] = React.useState("");
  const open = Boolean(anchorEl);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [fileName, setFileName] = useState(
    selectedTemplate?.template_saved_name || `file-name-${formattedDate}`
  );
  const [editing, setEditing] = useState(false);
  const [openNavigateDialog, setOpenNavigateDialog] = useState(false);
  const [tempName, setTempName] = useState(fileName);
  const [selectedSections, setSelectedSections] = useState({});
  const [languages, setLanguages] = useState([""]);
  const [hobbies, setHobbies] = useState([""]);
  const [interests, setInterests] = useState([""]);
  const [awards, setAwards] = useState([""]);
  const [certifications, setCertifications] = useState([""]);
  const [skills, setSkills] = useState([""]);
  const location = useLocation();
  const Path = location.pathname;
  const mainRoute = Path.split("/")[1];
  const [customSections, setCustomSections] = useState({});
  const [sections, setSections] = useState({
    languages: [],
    hobbies: [],
    interests: [],
    awards: [],
    certifications: [],
    skills: [],
    customSections: {}, // Store custom sections dynamically
  });
    const [text, setText] = useState('');
    const [customHeading, setCustomHeading] = useState("");

  const [currentView, setCurrentView] = useState("list"); // "list" or section name
  const [sectionData, setSectionData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const [profession, setProfession] = useState(selectedTemplate?.personaldetails?.role);
  const [aiSummaryList, setAiSummaryList] = useState( [
    `Experienced ${'foew'} with 5+ years in modern frontend technologies.`,
    `Skilled ${'foew'} delivering high-performance UI for enterprise applications.`,
    `Proven expertise as a ${'foew'} in React, TypeScript, and accessibility.`,
  ]);
  const tabData = [
    {
      label: `Generate ${activeStep}`,
      placeholder: `Enter job title, key achievements, or skills to generate a ${activeStep}...`
    },
    {
      label: `Rephrase ${activeStep}`,
      placeholder: "Paste the sentence or bullet point you want rephrased..."
    },
  ]
  
  const [anchorElaienhance, setAnchorElaienhance] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [tabvalue, settabValue] = React.useState(0);
  const handleChangeTabinPopover = (event, newValue) => {
    settabValue(newValue);
  };
  const handleopenaienhance = (event) => {
    setAnchorElaienhance(event.currentTarget);
  };

  // handle closing: set the anchor to null
  const handleCloseaienhance = () => {
    setAnchorElaienhance(null);
  };

  const handleProfessionSelect = (event, newValue) => {
    if (typeof newValue === 'string') {
      setProfession(newValue);
    } else if (newValue && newValue.inputValue) {
      // Handle "Add xyz"
      setProfession(newValue.inputValue);
    } else {
      setProfession(newValue);
    }
  };

  const addToEditor = (text) => {
    const editor = SummaryeditorRef.current?.getEditor();
    if (!editor) return;
  
    const current = editor.root.innerHTML;
    const updated = current + `<p>${text}</p>`;
    editor.root.innerHTML = updated;
    handleChange("summary", updated);
  };;
  const removeFromEditor = (summary) => {
    const updatedTemplate = {
      ...selectedTemplate,
      summary: {
        ...selectedTemplate?.summary,
        value: selectedTemplate?.summary?.value?.replace(summary, ''),
      },
    };
    setSelectedTemplate(updatedTemplate);
  };
  const handleRegenerate = () => {
    setLoadingSummary(true);
  
    // Simulate API delay (e.g., 2 seconds)
    setTimeout(() => {
      // Replace this with your logic to fetch/generate new summaries
      const newSummaries = [
        "Dynamic and creative frontend developer with expertise in React. Dynamic and creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.",
        "Experienced in delivering scalable user interfaces and performance optimization. creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.creative frontend developer with expertise in React.",
        "Focused on building responsive and accessible web applications.",
      ];
      setAiSummaryList(newSummaries);
      setLoadingSummary(false);
    }, 2000);
  };
  
  const handleFileChange = (e) => {
    setErrors({...errors,'photo':""})
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setSelectedTemplate(prev => {
          const updated = {
            ...prev,
            personaldetails: {
              ...prev.personaldetails,
              photo: base64,
            },
          };
          debouncedSave(updated); // Save with updated data
          return updated;
        });
      };
      reader.readAsDataURL(file); // Correct place to call this
    }
  };  

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  const handleDeleteClick = () => {
    setSectionName(activeStep);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
     handleDeleteCustomSection(
      activeStep,
      currentIndex
    )
    setOpenDeleteDialog(false);
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  useEffect(() => {
    if (mainRoute === "create" || mainRoute === "myresumes" || mainRoute === "usertemplates") {
      if(!selectedTemplate.steps.includes('custom') && childroute === 'custom'){
        selectedTemplate.steps.push('custom')
      }
      if (
        selectedTemplate.steps.includes(childroute) ||
        childroute === "preview"
      ) {
        setActiveStep(childroute);
      }
    }
  }, []);
  const handleSelectSection = (sectionName) => {
    setCurrentView(sectionName);
    setcustomeditOrAdd('add');
  };

  const validateDAEmail = (email) => {
    // Regular expression to check if the email ends with @data-aces.com
    const pattern = /^[a-zA-Z0-9._%+-]+@data-aces\.com$/;
    return pattern.test(email);
  };
  const handleSaveCustom = (sectionName, value) => {
    // setSectionData((prev) => ({ ...prev, [sectionName]: value }));
    setCurrentView("list");
    setActiveStep("custom");
    const updatedSteps = [
      ...steps.slice(0, steps.length - 1),
      sectionName,
      steps[steps.length - 1],
    ];
    if (selectedTemplate) {
      const updatedTemplate = {
        ...selectedTemplate,
        custom: [
          ...(selectedTemplate.custom || []), // prevent undefined spread error
          {
            label: sectionName,
            value: value,
          },
        ],
        steps: updatedSteps,
      };
      debouncedSave(updatedTemplate);
      setSelectedTemplate(updatedTemplate); // Assuming setSelectedTemplate is the setter for 'selectedTemplate'
    }
    steps = updatedSteps;
  };
  const handleUpdateCustom = (sectionName, value) => {
    if (selectedTemplate) {
      const updatedCustom = (selectedTemplate.custom || []).map((item) =>
        item.label === sectionName ? { ...item, value } : item
      );
      const exists = updatedCustom.some((item) => item.label === sectionName);
      // if (!exists) {
      //   updatedCustom.push({ label: sectionName, value });
      // }
      const updatedTemplate = {
        ...selectedTemplate,
        custom: updatedCustom,
      };
      debouncedSave(updatedTemplate);
      setSelectedTemplate(updatedTemplate);
    }
    setcustomeditOrAdd('');
  };
  const handleBackCustom = () => {
    setCurrentView("list");
  };
  const handleAddOrEditCustom = () => {
    
    // if(!selectedTemplate?.steps?.some(
    //   (step) => step.toLowerCase() === customHeading.toLowerCase()
    // ) && (text.trim() !== "<p><br></p>") ){
      const secName = customeditOrAdd==="add" ? currentView : activeStep
      const finalSectionName = secName === "Add Own" && customHeading ? customHeading : secName;
      if(customeditOrAdd==="add"){
        handleSaveCustom(finalSectionName, text);
      }
      else if(customeditOrAdd==="edit"){
        handleUpdateCustom(finalSectionName, text);
      }
      setCustomHeading("")
    // }
  };
  const handleDeleteCustomSection = (sectionName, index) => {
    
    if (selectedTemplate) {
      setActiveStep(steps[index - 1]);
      const updatedSteps = selectedTemplate?.steps?.filter((_, idx) => idx !== index);

      // Remove the custom section by label match (case-insensitive)
      const updatedCustom = selectedTemplate?.custom?.filter(
        (item) => item?.label?.toLowerCase() !== sectionName?.toLowerCase()
      );
  
      // Build the updated template correctly
      const updatedTemplate = {
        ...selectedTemplate,
        steps: updatedSteps,
        custom: updatedCustom,
      };
      
      setSelectedTemplate(updatedTemplate); // Assuming this updates the state
    }
  };

  const handleRename = () => {
    const trimmedName = tempName.trim();
  
    if (!trimmedName) {
      // Do nothing or optionally show an error
      return;
    }
  
    setFileName(trimmedName);
    selectedTemplate.template_saved_name = trimmedName;
    setEditing(false);
  };
  // Handle open and close of the popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // Convert `skills.value` array to the format react-select requires
  // const selectedSkillOptions =
  //   typeof selectedTemplate?.skills?.value === "object"
  //     ? selectedTemplate?.skills?.value?.map((skill) => ({
  //         value: skill.toLowerCase(),
  //         label: skill,
  //       }))
  //     : [];
  // Convert `skills.value` array to the format react-select requires
  const selectedSkillOptions =
    typeof selectedTemplate?.skills?.value === "object"
      ? selectedTemplate?.skills?.value
      : [];

  // Options for the dropdown
  const [skillOptions, setKillOptions] = useState(selectedSkillOptions);

  // setKillOptions([...skillOptions, ...selectedSkillOptions]);

  // Handle changes in selection
  const handleSkillChange = (newSelectedOptions) => {
    const newSkills = newSelectedOptions
      ? newSelectedOptions.map((opt) => opt.label)
      : [];
    setSelectedTemplate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        value: newSkills, // Update the skills.value array with new selections
      },
    }));
  }; 
  

  // Handle adding a new option dynamically
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setKillOptions((prevOptions) => [...prevOptions, newOption]); // Add new option to the list
    setSelectedTemplate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        value: [...prev.skills.value, newOption.label], // Add the new skill
      },
    }));
  };

  // Handle removing a chip
  const handleDeleteChip = (chipToDelete) => {
    setSelectedTemplate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        value: prev.skills.value.filter((skill) => skill !== chipToDelete),
      },
    }));
  };


  const handleChanges = (value) => {
    setContent(value);
  };


  const handleChange = (field, value) => {
    setErrors({...errors,[field]:""})
    setSelectedTemplate((prev) => {
      const updatedTemplate = { ...prev };

      // Check if the field belongs to personaldetails or any other section
      if (field in updatedTemplate.personaldetails) {
        updatedTemplate.personaldetails[field] = value;
      } else if (field === "summary") {
        updatedTemplate.summary.value = value;
      } else if (field === "skills") {
        updatedTemplate.skills.value = value;
      } else if (field === "template_saved_name") {
        updatedTemplate.template_saved_name = value;
      }
      debouncedSave(updatedTemplate);
      return updatedTemplate;
    });
  };

  const handleArrayChange = (field, index, value) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  // Handle changes in nested fields
  const handleNestedChange = (field, index, subField, value) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field].value];
      updatedArray[index] = { ...updatedArray[index], [subField]: value };
      return { ...prev, [field]: { ...prev[field], value: updatedArray } };
    });
  };

  // Handle adding a new item to the array
  const handleAddItem = (field, newItem) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field].value, newItem];
      return { ...prev, [field]: { ...prev[field], value: updatedArray } };
    });
  };

  // Handle deleting an item from the array
  const handleDeleteItem = (field, index) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field].value];
      updatedArray.splice(index, 1); // Remove item at the specified index
      return { ...prev, [field]: { ...prev[field], value: updatedArray } };
    });
  };
  const validatePersonalDetailsForm = () => {
    const errors = {};
    const { firstname,lastname, email, phone,role,has_photo,photo } = selectedTemplate?.personaldetails;
    if (!firstname?.trim()) {
      errors.firstname = "First name is required";
    }
    if (!lastname?.trim()) {
      errors.lastname = "Last name is required";
    }
    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!phone?.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10,15}$/.test(phone)) {
      errors.phone = "Phone must be 10 to 15 digits";
    }
    if (!role?.trim()) {
      errors.role = "Role is required";
    }
    console.log(selectedTemplate.personaldetails,'fjoeaw');
    
    if (has_photo && !photo) {
      errors.photo = "Please upload a profile image.";
    }
    return errors;
  };
  const validateSummaryForm = () => {
    const errors = {};
    if (!SummaryeditorRef.current) {
      errors.summary = "Summary editor is not ready";
      return errors;
    }
    const editor = SummaryeditorRef.current.getEditor();
  
    const html = editor.root.innerHTML.trim();
    const content = editor.getText().trim();
  
    if (content === "" || html === "<p><br></p>") {
      errors.summary = "Summary is required";
    }
    return errors;
  };
  
  
  const validateEducationForm = (editIndex) => {
    const errors = {};
    const education = tempEntry;
    // If the whole education object is missing
    console.log(selectedTemplate,'edufaohewo');

    if (!education?.institution || !education.institution.trim()) {
      errors.institution = "Name is required";
    }
    if (!education?.degree || !education.degree.trim()) {
      errors.degree = "Degree is required";
    }
    if (!education?.year || !education.year.trim()) {
      errors.year = "Graduation Date is required";
    }
    if (selectedTemplate?.education?.has_mark && (!education?.marks || !education.marks.trim())) {
      errors.marks = "Marks is required";
    }
    setErrors(errors)
    return Object.keys(errors).length > 0 ? errors : false;
  };
  const validateCertificateForm = () => {
    const errors = {};
    const certificate = tempEntry;
    
    if (!certificate?.name || !certificate.name.trim()) {
      errors.name = "Title is required";
    }
    if (!certificate?.year || !certificate.year) {
      errors.year = "Degree is required";
    }

    setErrors(errors)
    return Object.keys(errors).length > 0 ? errors : false;
  };
  const validateExperienceForm = () => {
    const errors = {};
    const Experience = tempEntry;
    console.log(tempEntry,'tempentryfojewaho',!Experience?.endDate);
    
    if (!Experience?.position || !Experience.position.trim()) {
      errors.position = "Position is required";
    }
    if (!Experience?.company || !Experience.company.trim()) {
      errors.company = "Company is required";
    }
    if (!Experience?.location || !Experience.location.trim()) {
      errors.location = "Location is required";
    }
    if (!Experience?.startDate || !Experience?.startDate) {
      errors.startDate = "Start date is required";
    }
    if (!Experience?.endDate || !Experience.endDate) {
      errors.endDate = "End date is required";
    }
    
    if (selectedTemplate?.experience?.has_responsibilities && (!Experience?.responsibilities || Experience?.responsibilities==="<p><br></p>")) {
      errors.responsibilities = "Responsibilities is required";
    }
    
    setErrors(errors)
    return Object.keys(errors).length > 0 ? errors : false;
  };
  const validateProjectsForm = () => {
    const errors = {};
    const Projects = tempEntry;
    console.log(tempEntry,'tempendtoewho');
    
    if (!Projects?.client_name || !Projects.client_name.trim()) {
      errors.client_name = "Position is required";
    }
    if (!Projects?.name || !Projects.name.trim()) {
      errors.name = "Position is required";
    }
    if (!Projects?.role || !Projects.role.trim()) {
      errors.role = "Role is required";
    }
    if (!Projects?.technology || !Projects.technology.trim()) {
      errors.technology = "Technology/Tools is required";
    }
    if (!Projects?.location || !Projects.location.trim()) {
      errors.location = "Location is required";
    }
    if (!Projects?.startDate || !Projects?.startDate) {
      errors.startDate = "Start date is required";
    }
    if (!Projects?.endDate || !Projects.endDate) {
      errors.endDate = "End date is required";
    }
    if (!Projects?.description || Projects.description==="<p><br></p>") {
      errors.description = "Description is required";
    }
    console.log(errors,'eroroewhow');
    
    setErrors(errors)
    return Object.keys(errors).length > 0 ? errors : false;
  };
  
  const validateSkillsForm = () => {
    const errors = {};
    const skillarray = selectedTemplate?.skills?.value;
    if (skillarray.length == 0) errors.skills = "At least one skill is required."
    return errors;
  };
  const validateCustom = () => {
    const errors = {};
   
    if (currentView === "Add Own" && customHeading?.trim() === "") {
      errors.customHeading = "Heading is required.";
    }
    if (currentView === "Add Own" && selectedTemplate?.steps?.some(
      (step) => step.toLowerCase() === customHeading.toLowerCase()
    )) {
      errors.customHeading = "This heading already exists.";
    }
    if (!text || text.trim() === "<p><br></p>") {
      errors.description = `${ currentView !== "list" ? currentView : activeStep} is required.`;
    }
    setErrors(errors)
    return errors;
  };

  const validateForm = () => {
    let newErrors = {};
  
    if (activeStep === "Personal Details") {
      newErrors = validatePersonalDetailsForm();
    } else if (activeStep === "Summary") {
      newErrors = validateSummaryForm();
    } else if (activeStep === "Skills") {
      newErrors = validateSkillsForm();
    } else if (activeStep === "Certificate" && isFormOpen) {
      newErrors = validateCertificateForm();
    } else if (activeStep === "Education" && isFormOpen) {
      newErrors = validateEducationForm();
    } else if (activeStep === "Experience" && isFormOpen) {
      newErrors = validateExperienceForm();
    } else if (activeStep === "Projects" && isFormOpen) {
      newErrors = validateProjectsForm();
    } else if ((selectedTemplate.custom?.some(
          (item) => item.label?.toLowerCase() === activeStep?.toLowerCase()
        ) &&  customeditOrAdd==="edit") || (activeStep === "custom" && currentView !== "list")){
      newErrors = validateCustom();
      if(Object.keys(newErrors).length === 0){
        handleAddOrEditCustom()
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleNext = () => {
    handleSave();
    setIsFormOpen(null);
    let activePath;
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // handleSave();
    setCurrentView("list");
    if (customeditOrAdd==="add" || customeditOrAdd==="edit") {
      setcustomeditOrAdd('');
    }
    if (currentIndex === steps.length - 1) {
      if (steps.includes("custom")) {
        const filteredSteps = steps.filter((step) => step !== "custom");
        steps = filteredSteps;
        if (selectedTemplate) {
          selectedTemplate.steps = filteredSteps;
        }
      }
      activePath = "preview";
      setActiveStep(activePath); // Go to Preview if on the last step
    } else {
      activePath = steps[currentIndex + 1];
      setActiveStep(activePath); // Move to the next step
    }
    navigate(`/${mainRoute}/${activePath}${userId ? `/${userId}` : ''}`);
    
    // setCurrentSection('certificate')
    if (currentIndex === steps.length - 1) {
      const element = document.getElementById("resume");

      const bloboptions = {
        // scale: 2, // Higher scale for better quality
        // margin: 0.5,
        // filename: "resume.pdf",
        // image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1 },
        // jsPDF: {
        //   unit: "in",
        //   format: "letter",
        //   orientation: "portrait",
        // },
        scale: 2, // Increase scale for sharper image (2–4 is typical)
        useCORS: true, // For loading images/fonts correctly if cross-origin
        allowTaint: false, // Avoid tainted canvases if CORS fails
        backgroundColor: "#ffffff",
      };

      // Use html2canvas to convert the element to an image
      html2canvas(element, bloboptions)
        .then((canvas) => {
          // Convert the canvas to a data URL
          const imgDataUrl = canvas.toDataURL("image/png");
          console.log(imgDataUrl);
          
          selectedTemplate.template_thumbnail = imgDataUrl;
        })
        .catch((error) => console.error("Image generation failed:", error));
    }
  };

  const handleBack = () => {
    // handleSave();
    resetForm()
    if (customeditOrAdd==="add" || customeditOrAdd==="edit") {
      setcustomeditOrAdd('');
    }
    setIsFormOpen(null);
    if (isPreview) {
      setActiveStep(steps[steps.length - 1]); // Go back to the last step from Preview
      navigate(`/${mainRoute}/${steps[steps.length - 1]}${userId ? `/${userId}` : ''}`);
    } else if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1]); // Move to the previous step
      navigate(`/${mainRoute}/${steps[currentIndex - 1]}${userId ? `/${userId}` : ''}`);
    }
    // activeStep === 1
    //   ? setActiveTab(0)
    //   : setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  const getStepIcon = (value) => {
    const iconProps = { fontSize: "small" };

    // If step is completed, show a CheckCircleIcon
    // if (isCompleted) {
    //   return <CheckCircleIcon sx={{ color: "primary.main" }} {...iconProps} />;
    // }

    // Otherwise, show the respective step icon
    if (value.toLowerCase().includes("home"))
      return <HomeIcon {...iconProps} />;
    if (value.toLowerCase().includes("personal"))
      return <PersonIcon {...iconProps} />;
    if (value.toLowerCase().includes("education"))
      return <SchoolIcon {...iconProps} />;
    // if (value.toLowerCase().includes("work"))
    //   return <BuildIcon {...iconProps} />;
    if (value.toLowerCase().includes("summary"))
      return <SubjectIcon {...iconProps} />;
    if (value.toLowerCase().includes("skill"))
      return <DownhillSkiingIcon {...iconProps} />;
    if (value.toLowerCase().includes("certificate"))
      return <ApprovalIcon {...iconProps} />;
    if (value.toLowerCase().includes("experi"))
      return <AddReactionIcon {...iconProps} />;
    if (value.toLowerCase().includes("project"))
      return <AccountTreeIcon {...iconProps} />;
    if (value.toLowerCase().includes("languages"))
      return <LanguageIcon {...iconProps} />;
    if (value.toLowerCase().includes("hobbies"))
      return <EmojiPeopleIcon {...iconProps} />;
    if (value.toLowerCase().includes("interests"))
      return <LibraryBooksIcon {...iconProps} />;
    if (value.toLowerCase().includes("awards"))
      return <MilitaryTechIcon {...iconProps} />;
    if (value.toLowerCase().includes("certifications"))
      return <AssignmentIcon {...iconProps} />;
    if (value.toLowerCase().includes("skills"))
      return <CodeIcon {...iconProps} />;
    if (value.toLowerCase().includes("volunteer experience"))
      return <VolunteerActivismIcon {...iconProps} />;
    if (value.toLowerCase().includes("references"))
      return <AccountCircleIcon {...iconProps} />;
    if (value.toLowerCase().includes("publications"))
      return <BookIcon {...iconProps} />;
    if (value.toLowerCase().includes("testimonials"))
      return <MessageIcon {...iconProps} />;
    if (value.toLowerCase().includes("achievements"))
      return <FlagIcon {...iconProps} />;
    if (value.toLowerCase().includes("extra curriculars"))
      return <FlagIcon {...iconProps} />;
    if (value.toLowerCase().includes("add own") || value.includes("custom"))
      return <BuildIcon {...iconProps} />;

    return (
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "1px solid #e0e0e0",
          color: "#fff",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // boxShadow: "inset 0 0 2px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize: "0.7rem",
            // color: "#777",
            userSelect: "none",
          }}
        >
          {value.charAt(0).toUpperCase()}
        </Typography>
      </Box>
    ); // Fallback: First letter of the step
  };
  const CustomTextBoxStyle = {
    marginTop: "0px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px", // Rounded corners
      backgroundColor: "white", // Light background
      backgroundColor: "#f9fafb",
      marginTop: "0px",
      outLine: "none",
      "&.Mui-focused": {
        // backgroundColor: "#e3f2fd", // Slight highlight when focused
        // boxShadow: "0 0 5px #42a5f5", // Blue glow
      },
      "& fieldset": {
        // borderColor: "#42a5f5", // Custom border color
      },
      "&:hover fieldset": {
        // borderColor: "#1e88e5", // Border color on hover
      },
      "& .MuiInputBase-input": {
        padding: "10px 14px",
        fontSize: "12px", // Smaller font size for the input text
      },
    },
    "& .MuiInputLabel-root": {
      // color: "#757575", // Label color
    },
    "& .MuiInputLabel-root": {
      // color: "#757575", // Label color
      fontSize: "13px", // Smaller font size for the label
    },
    "& .MuiInputLabel-root.Mui-focused": {
      // color: "#1e88e5", // Label color when focused
    },
  };

  const labelStyle = {
    // color: "#1e88e5", // Custom color for the label
    marginBottom: "4px", // Space between label and input
    // fontWeight: "bold",
  };

  //

  // Handle input changes for the form
  const handleChangesss = (field, value) => {
    setTempEntry((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    setErrors({...errors,[field]:""})
  };

  // Save the current entry (add or update)
  const handleSave = () => {
    setIsFormOpen(null); // Open form for the section

    if (currentSection) {
      // setSelectedTemplate((prev) => {
      //   const updatedList = [...prev[currentSection].value];
      //   if (editIndex !== null) {
      //     updatedList[editIndex] = tempEntry; // Update existing
      //   } else {
      //     updatedList.push(tempEntry); // Add new
      //   }
      //   return {
      //     ...prev,
      //     [currentSection]: { value: updatedList },
      //   };
      // });


      setSelectedTemplate((prev) => {
        const updatedList = [...prev[currentSection].value];
        console.log(updatedList,'foewh',currentSection,prev[currentSection].value);
        
        const defaultStructure = Object.keys(
          prev[currentSection].value[0] || {}
        ).reduce((acc, key) => {
          acc[key] = ""; // Default all keys to empty
          return acc;
        }, {});
        const mergedEntry = { ...defaultStructure, ...tempEntry };

        // Check if all values in the merged entry are empty strings
        const isEmptyEntry = Object.values(mergedEntry).every((val) => val === "");
      
        if (isEmptyEntry) {
          // Do not add/update if entry is completely empty
          console.warn("Empty entry skipped");
          return prev; // No state change
        }
      
        if (editIndex !== null) {
          updatedList[editIndex] = mergedEntry;
        } else {
          updatedList.push(mergedEntry);
        }
      
        const updated = {
          ...prev,
          [currentSection]: {
            ...prev[currentSection],
            value: updatedList, // Update value
          },
        };
        debouncedSave(updated);
        return updated;
      });
    }

    resetForm();
  };

  // Reset the form
  const resetForm = () => {
    setTempEntry({});
    setEditIndex(null);
    // setCurrentSection(null);
    setIsFormOpen(null);
    setErrors({})
  };

  // Edit an entry
  const handleEdit = (section, index) => {
    setIsFormOpen(section); // Open form for the section

    setCurrentSection(section);
    setEditIndex(index);
    setTempEntry(selectedTemplate[section].value[index]);
  };

  // Delete an entry
  const handleDelete = (section, index) => {
    // setSelectedTemplate((prev) => {
    //   const updatedList = prev[section].value.filter((_, i) => i !== index);
    //   return { ...prev, [section]: { value: updatedList } };
    // });

    setSelectedTemplate((prev) => {
      const updatedList = prev[section].value.filter((_, i) => i !== index);

      // Preserve other keys like `has_institution`, etc.
      const updated = {
        ...prev,
        [section]: {
          ...prev[section], // Preserve other keys
          value: updatedList, // Update value
        },
      }
      debouncedSave(updated);
      return updated;
    });
    // setSelectedTemplate((prev) => {
    //   const updatedList = [...prev[section].value];
    //   const emptyKeys = Object.keys(updatedList[index]).reduce((acc, key) => {
    //     acc[key] = ""; // Reset all keys to an empty string
    //     return acc;
    //   }, {});

    //   updatedList[index] = emptyKeys;

    //   return {
    //     ...prev,
    //     [section]: {
    //       ...prev[section],
    //       value: updatedList, // Update value with the cleared object
    //     },
    //   };
    // });
    resetForm();
  };

  // Delete an entry
  // const handleDelete = (section, index) => {
  //   setSelectedTemplate((prev) => {
  //     const updatedList = [...prev[section].value];
  //     const emptyEntry = Object.keys(updatedList[index]).reduce((acc, key) => {
  //       acc[key] = ""; // Set all keys to empty strings
  //       return acc;
  //     }, {});
  //     updatedList[index] = emptyEntry; // Replace the entry with the empty object
  //     return { ...prev, [section]: { value: updatedList } };
  //   });
  // };

  // Open the form for adding a new entry
  const handleAdd = (section) => {
    setIsFormOpen(section); // Open form for the section

    setCurrentSection(section);
    setTempEntry({});
    setEditIndex(null);
  };

  const saveResume = (text) => {
    const element = document.getElementById("resume");

    selectedTemplate.template_saved_name = tempName.trim() || fileName;

    const options = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(element)
      .output("blob") // Ensure the output is a Blob
      .then((pdfBlob) => {
        // Create a URL for the Blob and open it in a new tab
        const pdfUrl = URL.createObjectURL(pdfBlob);
        if (text !== "save") {
          window.open(pdfUrl, "_blank");
        }

        if (text === "save") {
          const payload = {
            resume_id: selectedTemplate.resume_id,
            resume_details: selectedTemplate,
          };

          if (pathname.includes("create")) {
            axiosInstance
              .post("api/user-template/", selectedTemplate)
              .then((res) => {
                console.log(res);
                navigate("/home");
                toast.success("Resume created successfully!!");
              })
              .catch((err) => console.log(err));
          }
          if (
            pathname.includes("myresume") ||
            pathname.includes("usertemplates")
          ) {
            axiosInstance
              .put("api/user-template/", payload)
              .then((res) => {
                console.log(res);
                navigate("/home");
                toast.success("Resume updated successfully!");
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((error) => console.error("PDF generation failed:", error));
  };

  const saveResumeAsWord = () => {
    const element = document.getElementById("resume");

    if (!element) {
      console.error("Resume element not found");
      return;
    }

    // Extract the text content of the resume
    const textContent = element.innerText || element.textContent;

    // Create a new Word document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: textContent, break: 1 })],
            }),
          ],
        },
      ],
    });

    // Generate the Word file and trigger download
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
      console.log("Word document generated and downloaded");
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        // background: "linear-gradient(180deg, #fff 0%, #ceeeff 100%)",
      }}
    >
      {/* Stepper */}
      {isPreview && (
        <div className="mb-7">
          <Navbar />
        </div>
      )}
      {!isPreview && (
        <Box
          sx={{
            background: "navy",
            padding: 2,
            height: "100vh",
            position: "fixed",
            width: "60px",
          }}
        >
          <TemplateStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            setActiveTab={setActiveTab}
            setOpenNavigateDialog={setOpenNavigateDialog}
          />
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          // marginLeft: activeStep !== steps.length ? "60px" : "0px",
          marginLeft: activeStep !== "preview" ? "60px" : "0px",
          height: "100%",
          // marginTop: isPreview ? "40px" : "",
        }}
      >
        {/* preview header */}
        {!isPreview && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderBottom: "1px solid lightgray",
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: "10",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {activeStep === "custom" ? "Custom Section" : activeStep}
            </Typography>

            {/* Buttons */}
            <Box>
              {currentIndex === 0 && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenNavigateDialog(true)
                  }}
                  sx={{ mr: 2 }}
                >
                  Back
                </Button>
              )}

              {currentIndex !== 0 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  // disabled={activeStep === 0}
                  disabled={currentIndex === 0 && !isPreview} // Disable if at the first step
                  sx={{ mr: 2 }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  if(validateForm()){
                    handleNext();
                  }
                }}
                // disabled={activeStep === steps.length}
                disabled={isPreview}
                // sx={{ mr: 2 }}
              >
                {/* {activeStep === steps.length - 1 ? "Finish" : "Next"} */}
                {currentIndex === steps.length - 1 ? "Finish" : "Next"}
              </Button>

              {/* {activeStep === steps.length && (
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  color="secondary"
                >
                  Reset
                </Button>
              )} */}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: !isPreview ? "flex" : '',
            justifyContent: "space-between",
            padding:!isPreview ?  2 : '',
            backgroundColor: isPreview ? "#f8f8f8" : "",
          }}
        >
          {!isPreview && (
            <>
              <Box style={{ width: "60%" }}>
                {/* Form for Editing */}
                <Box
                  sx={{
                    flex: 1,
                    // background: "#f7f7f7",
                    padding: "0px 0px 0px 10px",
                    borderRadius: 2,
                  }}
                >
                  {!isPreview && activeStep === "Personal Details" && (
                    <>
                 <Box sx={{ mt: 3, textAlign: 'center' }}>
                  {/* Avatar container with camera icon */}
                 {selectedTemplate?.personaldetails?.has_photo && <>
                 <Box sx={{ position: 'relative', width: 120, height: 120, mx: 'auto' }}>
                  <label htmlFor="avatar-upload">
                      <Avatar
                        src={selectedTemplate?.personaldetails?.photo || Photo}
                        sx={{
                          width: 120,
                          height: 120,
                        border: '2px dotted #aaa',
                          backgroundColor: '#f9f9f9',
                          color: '#666',
                          cursor: 'pointer',
                        }}
                      >
                        {/* {!selectedTemplate?.personaldetails?.photo && <PersonOutlineIcon sx={{ fontSize: 48 }} />} */}
                      </Avatar>
                    </label>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar-upload"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />

                    {/* Camera Icon Button */}
                    <IconButton
                      onClick={handleIconClick}
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        p: '4px',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    >
                      {!selectedTemplate?.personaldetails?.photo ? (
                          <PhotoCameraIcon sx={{ fontSize: 18, color: '#666' }} />
                        ) : (
                          <EditIcon sx={{ fontSize: 18, color: '#666' }} />
                        )}

                    </IconButton>
                </Box>    
                    {/* Label */}
                    <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
                    {!selectedTemplate?.personaldetails?.photo ? "Upload" : 'Change' } Profile Image<span style={{ color: "red" }}>*</span>
                    </Typography>
                    {errors?.photo && (
                          <div style={{ color: "red", fontSize: "12px", }}>
                            {errors.photo}
                          </div>
                        )}
                        </>
                  }
                  </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={labelStyle}>
                            First Name<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <TextField
                            // label="First Name"
                            placeholder="Enter first name"
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 200 }}
                            value={selectedTemplate.personaldetails.firstname}
                            onChange={(e) =>
                              handleChange("firstname", e.target.value)
                            }
                            onBlur={(e) =>
                              handleChange("firstname", e.target.value.trim())
                            }
                            size="small"
                            sx={CustomTextBoxStyle}
                          />
                          {errors?.firstname && (
                            <div style={{ color: "red", fontSize: "12px", }}>
                              {errors.firstname}
                            </div>
                          )}
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Last Name<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <TextField
                            // label="Last Name"
                            placeholder="Enter last name"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.lastname}
                            inputProps={{ maxLength: 200 }}
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                            onChange={(e) => {
                              handleChange("lastname", e.target.value)
                            }}
                            onBlur={(e) =>
                              handleChange("lastname", e.target.value.trim())
                            }
                            size="small"
                          />
                          {errors?.lastname && (
                            <div style={{ color: "red", fontSize: "12px",}}>
                              {errors.lastname}
                            </div>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Email<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          // label="Email"
                          type="email"
                          placeholder="Enter email"
                          fullWidth
                          margin="normal"
                          value={selectedTemplate.personaldetails.email}
                          inputProps={{ maxLength: 200 }}
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e)=> {
                            handleChange("email", e.target.value)
                            setEmailError("");
                          }}
                          onBlur={(e) => {
                            const value = e.target.value.trimStart(); // trim only start to not remove spaces inside while typing
                            handleChange("email", value);
                            // Validate email live (optional: only validate if includes '@' to avoid premature error)
                            if (value && !validateEmail(value)) {
                              setEmailError("Please enter a valid email address");
                            } else {
                              setEmailError("");
                            }
                          }}
                          // error={!!emailError}
                          // helperText={emailError}
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                      </Box>

                      {errors.email && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                            {errors.email}
                          </div>
                        )}
                      <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Phone<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          // label="Phone"
                          type="number"
                          placeholder="Enter phone number"
                          fullWidth
                          margin="normal"
                          value={selectedTemplate.personaldetails.phone}
                          // inputProps={{ maxLength: 15 }}//type string only works
                          onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, ""); // keep digits only
                            if (value.length > 15) {
                              value = value.slice(0, 15); // limit to max 15 digits
                            }
                            handleChange("phone", value);
                          }}
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                        {errors.phone && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                            {errors.phone}
                          </div>
                        )}
                      </Box>
                      {"sociallink" in selectedTemplate?.personaldetails &&
                        <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Social Link
                        </Typography>
                        <TextField
                          placeholder="Enter social link (e.g., LinkedIn, personal website, portfolio, GitHub)."
                          fullWidth
                          value={selectedTemplate.personaldetails.sociallink}
                          inputProps={{ maxLength: 200 }}//type string only works
                          // onKeyDown={(e) => {
                          //   if (e.key === "e" || e.key === "E") {
                          //     e.preventDefault();
                          //   }
                          // }}
                          onChange={(e) => {
                            handleChange("sociallink", e.target.value);
                          }}
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                        {errors.phone && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                            {errors.phone}
                          </div>
                        )}
                      </Box>
                      }
                       {"totalexp" in selectedTemplate?.personaldetails &&
                      <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Experience
                        </Typography>
                        <TextField
                          // label="Phone"
                          type="number"
                          placeholder="Enter Total number of experience"
                          fullWidth
                          margin="normal"
                          value={selectedTemplate.personaldetails.totalexp}
                          // inputProps={{ maxLength: 15 }}//type string only works
                          onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            let value = e.target.value;
                          
                            if (/^\d{0,2}(\.\d?)?$/.test(value)) {
                              const numericValue = parseFloat(value);
                          
                              if (value === "" || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 50)) {
                                handleChange("totalexp", value);
                              }
                            }
                          }}                          
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                        {errors?.totalexp && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                            {errors?.totalexp}
                          </div>
                        )}
                      </Box>
                      } 
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={labelStyle}>
                            City
                          </Typography>
                          <TextField
                            // label="City"
                            placeholder="Enter city"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.city}
                            onChange={(e) =>
                              handleChange("city", e.target.value)
                            }
                            onBlur={(e) =>
                              handleChange("city", e.target.value.trim())
                            }
                            inputProps={{ maxLength: 200 }}
                            size="small"
                            sx={CustomTextBoxStyle}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Country
                          </Typography>
                          <TextField
                            // label="Country"
                            placeholder="Enter  country"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.country}
                            onChange={(e) =>
                              handleChange("country", e.target.value)
                            }
                            onBlur={(e) =>
                              handleChange("country", e.target.value.trim())
                            }
                            size="small"
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                        </Box>
                        {/* <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Pincode
                          </Typography>
                          <TextField
                            // label="Pincode"
                            type="number"
                            placeholder="Enter pincode"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.pincode}
                            onChange={(e) =>
                              handleChange("pincode", e.target.value)
                            }
                            size="small"
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                        </Box> */}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Role<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          // label="First Name"
                          placeholder="Enter Role"
                          fullWidth
                          margin="normal"
                          value={selectedTemplate.personaldetails.role}
                          onChange={(e) => handleChange("role", e.target.value)}
                          inputProps={{ maxLength: 200 }}
                          onBlur={(e) => handleChange("role", e.target.value.trim())}
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                        {errors.role && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                          {errors.role}
                        </div>
                      )}
                      </Box>
                    </>
                  )}

                {!isPreview && activeStep === "Summary" && (
                  <Box style={{ padding: 0 }}>
                    {/* Error Message */}
                    {errors.summary && (
                      <p
                        className="mb-0"
                        style={{
                          color: "#991b1b",
                          backgroundColor: "#fef2f2",
                          borderLeft: "4px solid #dc2626",
                          padding: "8px 12px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          marginTop: "4px",
                          maxWidth: "fit-content",
                        }}
                      >
                        ⚠️ {errors.summary}
                      </p>
                    )}

                    <Box mt={3}>
                    <QuillToolbar handleopenaienhance={handleopenaienhance} />
                      <ReactQuill
                        theme="snow"
                        ref={SummaryeditorRef}
                        modules={modules}
                        formats={formats}
                        value={selectedTemplate.summary?.value || ""}
                        onChange={(e) => handleChange("summary", e)}
                        placeholder="Enter professional summary"
                        style={{ height: "400px", width: "100%" }}
                        onBlur={() => {
                          const editor = SummaryeditorRef.current?.getEditor();
                          if (!editor) return;
                        
                          const html = editor.root.innerHTML.trim();
                          const text = editor.getText().trim();
                        
                          const content = text === "" ? "<p><br></p>" : html;
                          handleChange("summary", content);
                        }}
                        // contentEditable={true}
                        // spellCheck={true}
                      />
                    </Box>
                  </Box>
                )}


                  {/* Skills */}
                  {!isPreview && activeStep === "Skills" && (
                    <>
                      {/* <label style={{ fontSize: "14px", marginBottom: "4px" }}>
                        Skills
                      </label> */}

                      {typeof selectedTemplate.skills?.value === "object" ? (
                        // <textarea
                        //   value={selectedTemplate.skills.value}
                        //   onChange={(e) => handleChange("skills", e)}
                        // />
                        // <>
                        //   <CreatableSelect
                        //     isMulti
                        //     isClearable
                        //     options={skillOptions} // Options for the dropdown
                        //     value={selectedSkillOptions} // Convert selected values to react-select format
                        //     onChange={handleSkillChange} // Handle selecting options
                        //     onCreateOption={handleCreate} // Handle creating a new option
                        //     placeholder="Type to search or add new skill"
                        //   />
                        //   {/* Chips for selected skills */}
                        //   <div
                        //     style={{
                        //       marginTop: "20px",
                        //       display: "flex",
                        //       flexWrap: "wrap",
                        //       gap: "10px",
                        //     }}
                        //   >
                        //     {selectedTemplate.skills.value.map(
                        //       (skill, index) => (
                        //         <Chip
                        //           key={index}
                        //           label={skill}
                        //           onDelete={() => handleDeleteChip(skill)}
                        //           style={{
                        //             backgroundColor: "#f9fafb",
                        //             color: "#006064",
                        //           }}
                        //         />
                        //       )
                        //     )}
                        //   </div>
                        // </>
                        <>
                          <SkillsComponent
                            selectedSkillOptions={selectedSkillOptions}
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                            debouncedSave={debouncedSave}
                            errors={errors}
                            setErrors={setErrors}
                            sortState={sortState}
                            setSortState={setSortState}
                          />
                        </>
                      ) : (
                        <>
                        <QuillToolbar handleopenaienhance={handleopenaienhance}/>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          style={{ height: "400px", width: "100%" }}
                          placeholder="Enter skills"
                          value={selectedTemplate.skills?.value || ""}
                          onChange={(e) => handleChange("skills", e)}
                        />
                        </>
                      )}
                    </>
                  )}
                  {/* Education */}
                  {!isPreview && activeStep === "Education" && (
                    <EducationComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                      setSelectedTemplate={setSelectedTemplate}
                      errors={errors}
                      setErrors={setErrors}
                      validateEducationForm={validateEducationForm}
                    />
                  )}
                  {!isPreview && activeStep === "Achievements" && (
                    <AchievementsComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                      setSelectedTemplate={setSelectedTemplate}
                    />
                  )}
                  {/* Certificates */}
                  {!isPreview && activeStep === "Certificate" && (
                    <CertificateComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                      setSelectedTemplate={setSelectedTemplate}
                      errors={errors}
                      setErrors={setErrors}
                      validateCertificateForm={validateCertificateForm}
                    />
                  )}

                  {/* Experience */}
                  {!isPreview && activeStep === "Experience" && (
                    <ExperienceComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                      setSelectedTemplate={setSelectedTemplate}
                      errors={errors}
                      setErrors={setErrors}
                      validateExperienceForm={validateExperienceForm}
                    />
                  )}

                  {/* Projects */}
                  {!isPreview && activeStep === "Projects" && (
                    <ProjectComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                      setSelectedTemplate={setSelectedTemplate}
                      errors={errors}
                      setErrors={setErrors}
                      validateProjectsForm={validateProjectsForm}
                    />
                  )}
                </Box>
                {console.log(activeStep,'activestepfoe')
                }
                {activeStep === "custom" && (
                  <>
                    {currentView === "list" ? (
                      <SectionSelection
                        onSelectSection={handleSelectSection}
                        steps={steps}
                        customSections={selectedTemplate?.custom}
                        setActiveStep={setActiveStep}
                      />
                    ) : (
                      <SectionEditor
                        sectionName={currentView}
                        type={customeditOrAdd}
                        // initialValue={sectionData[currentView] || ""}
                        initialValue={ ""}
                        onSave={handleSaveCustom}
                        onBack={handleBackCustom}
                        handleSelectSection={handleSelectSection}
                        selectedTemplate={selectedTemplate}
                        text={text}
                        setText={setText}
                        customHeading={customHeading}
                        setCustomHeading={setCustomHeading}
                        handleSave={handleAddOrEditCustom}
                        errors={errors}
                        setErrors={setErrors}
                        validateCustom={validateCustom}
                      />
                    )}
                  </>
                )}
                {selectedTemplate?.custom?.length > 0 &&
                  selectedTemplate.custom.some(
                    (item) => item.label === activeStep
                  ) && (
                    <>
                      <Box>
                        {customeditOrAdd !=="edit" ? (
                          <Box
                            className="p-3 mt-3"
                            sx={{
                              border: "1px solid lightgray",
                              borderRadius:"4px",
                              mb: 2,
                              background: "#f9fafb",
                            }}
                          >
                            {/* <Typography variant="h6" sx={{ mb: 0 }}>
                          {activeStep.charAt(0).toUpperCase() + activeStep.slice(1)}
                        </Typography> */}
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              sx={{ height: "fit-content" }}
                            >
                              <div
                                style={{
                                  margin: "0px",
                                  textAlign: "justify",
                                  fontSize: "13px",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    selectedTemplate?.custom?.find(
                                      (item) => item.label === activeStep
                                    )?.value || "",
                                }}
                              ></div>
                              <Box sx={{margin:"0.5rem",minWidth:"2.8rem"}}>
                                <Tooltip title="Edit">
                                  <EditIcon
                                    sx={{
                                      cursor: "pointer",
                                      "&:hover": { color: "#3b82f6" },
                                      color: "gray",
                                      fontSize: 18,
                                      mr: 1,
                                    }}
                                    onClick={() => setcustomeditOrAdd('edit')}
                                  />
                                </Tooltip>

                                <Tooltip title="Delete">
                                  <DeleteIcon
                                    sx={{
                                      cursor: "pointer",
                                      "&:hover": { color: "#ef4444" },
                                      color: "gray",
                                      fontSize: 18,
                                    }}
                                    onClick={() =>
                                    {
                                      handleDeleteClick()}
                                    }
                                  />
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          <SectionEditor
                            type={customeditOrAdd}
                            sectionName={activeStep}
                            initialValue={
                              selectedTemplate?.custom?.find(
                                (item) => item.label === activeStep
                              )?.value || ""
                            }
                            onSave={handleUpdateCustom}
                            onBack={handleBack}
                            handleSelectSection={handleBack}
                            selectedTemplate={selectedTemplate}
                            text={text}
                            setText={setText}
                            customHeading={customHeading}
                            setCustomHeading={setCustomHeading}
                            handleSave={handleAddOrEditCustom}
                            errors={errors}
                            setErrors={setErrors}
                            validateCustom={validateCustom}
                          />
                        )}
                      </Box>
                    </>
                  )}
              </Box>
              <Box
                id={"resume_container"}
                style={{
                  width: "35%",
                  padding: "10px 10px",
                  // height: document?.documentElement?.scrollHeight - 300 + "px",
                  // Cursor: "grab",
                }}
              >
                <div
                  style={{
                    height: "450px",
                    overflow: "auto",
                    marginTop: "5px",
                    position: "sticky",
                    top: 110,
                    backgroundColor: "#fff",
                    border:"1px solid #eaeff0"
                  }}
                >
                  <SelectedTemplate
                    selectedTemplate={selectedTemplate}
                    isPreview={true}
                  />
                </div>
              </Box>
            </>
          )}
          {/* Rendered Resume */}

          {isPreview && (
            <div>
              <div style={{ backgroundColor: "#f8f9fb" ,display:'flex'}}>
                {" "}
                {/* <Box className="col-3 text-center">
                <TemplateStyles
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              </Box> */}
                {/* <Box className="col-3">
            <Button
              // variant="contained"
              style={{
                textAlign: "left",
                color: "black",
                border: "1px solid gray",
                width: "100%",
                padding: "10px",
              }}
              onClick={() => {
                saveResume();
              }}
              startIcon={<DownloadForOfflineIcon />}
            >
              <span>Download & Save</span>
            </Button>
            <div
              className="mt-3"
              style={{
                padding: "10px",
                border: "bisque",
                color: "#5a5a73",
                borderBottom: "2px dashed gray",
                borderTop: "2px dashed gray",
              }}
            >
              {" "}
              <b>Resume Sections</b>
            </div>
            <div>
              {steps.map((step, index) => (
                <div
                  key={index}
                  // style={{
                  //   // display: index === 0 ? "none" : "block",
                  //   border: "1px solid gray",
                  //   textAlign: "center",
                  //   gridColumn:
                  //     steps.length % 2 !== 0 && index === steps.length - 1
                  //       ? "1 / -1"
                  //       : "auto",
                  // }}
                  onClick={() => setActiveStep(step)}
                  // startIcon={step.icon}
                >
                  <span>{step}</span>
                </div>
              ))}
            </div>
                </Box> */}
                {!validateDAEmail(useremail) && (
                  <>
                    {/* <StylingSection
                      setActiveStep={setActiveStep}
                      fontFamily={fontFamily}
                      setFontFamily={setFontFamily}
                      selectedSection={selectedSection}
                      setSelectedSection={setSelectedSection}
                      textType={textType}
                      setTextType={setTextType}
                      fontSize={fontSize}
                      setFontSize={setFontSize}
                      lineHeight={lineHeight}
                      setLineHeight={setLineHeight}
                      fontWeight={fontWeight}
                      setFontWeight={setFontWeight}
                      fontStyle={fontStyle}
                      setFontStyle={setFontStyle}
                      textDecoration={textDecoration}
                      setTextDecoration={setTextDecoration}
                      textAlign={textAlign}
                      setTextAlign={setTextAlign}
                      fontColor={fontColor}
                      setFontColor={setFontColor}
                      steps={steps} // make sure to pass this for the back button to work
                    /> */}
                  </>
                )}
                <Box className="" sx={{
                  flex: 1, display: "flex",justifyContent:'center', marginTop:'4rem',
                }}>
                  {/* {validateDAEmail(useremail) && ( */}
                  {/* <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      position: "fixed",
                      top: 80,
                      left: 20,
                      zIndex: 1000,
                      // backgroundColor: "#fff",
                      border: "1px solid #4d63da",
                      color: "#4d63da",
                      fontWeight: 500,
                      borderRadius: "16px",
                      fontSize: "14px",
                      padding: "6px 16px",
                      textTransform: "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#e3ecff", // lighter blue-gray background
                        borderColor: "#0a58ca",     // slightly deeper border
                      },
                      // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      // "&:hover": {
                      //   boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                      // },
                      "&:focus": {
                        boxShadow: "0 0 0 3px rgba(13,110,253,0.25)", // subtle focus ring
                      },
                    }}
                    
                    onClick={() => {
                      setActiveStep(steps[steps.length - 1]);
                      navigate(`/${mainRoute}/${steps[steps.length - 1]}${userId ? `/${userId}` : ''}`);
                    }}
                  >
                    Back
                  </Button> */}

                  {/* )} */}
                  <Box
                    className={`${!validateDAEmail(useremail)} ? "" : "" `}
                    sx={{
                      flexGrow: 1,
                      // marginLeft: validateDAEmail(useremail) ? "6%" : "23%", // Align to the right of the left fixed section
                      // marginRight: validateDAEmail(useremail) ? "29%" : "22%", // Align to the left of the right fixed section
                      // marginRight: validateDAEmail(useremail) ? "29%" : "22%", // Align to the left of the right fixed section
                      // marginLeft: "5%", // Align to the right of the left fixed section
                      // padding: "20px",
                      // pt: "10px",
                      height: "100%",
                      width: "fit-content",
                      display:'flex',
                      justifyContent:'center',
                    }}
                  >
                    {" "}
              
                    <Box
                    className="pb-4"
                      sx={{
                        width: "calc(100% - 33.33%)", 
                        height: '100%',
                        backgroundColor: '#f8f9fb',
                        // boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                        // margin: 'auto',
                        display:'flex',
                        justifyContent:'center',
                        boxSizing: 'border-box',
                      }}
                      flexDirection={'column'}
                    >
                      <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      paddingRight={1.5}
                      py={1}
                      borderRadius={0}
                      boxShadow={0}
                      style={{ 
                        backgroundColor:"#f8f9fb",
                        // borderRadius: '6px',
                        position: "sticky",
                        top: 65,
                        zIndex:200,
                        // width: "calc(100% - 30.33%)", 
                       }}
                    >
                      {/* Back Button */}

                      {/* Filename and Edit/Save */}
                      <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      // position: "fixed",
                      // top: 80,
                      // left: 20,
                      // zIndex: 1000,
                      // backgroundColor: "#fff",
                      // border: "1px solid #4d63da",
                      color: "#4d63da",
                      fontWeight: 500,
                      borderRadius: "16px",
                      fontSize: "14px",
                      padding: "6px 16px",
                      textTransform: "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#e3ecff", // lighter blue-gray background
                        borderColor: "#0a58ca",     // slightly deeper border
                      },
                      // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      // "&:hover": {
                      //   boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                      // },
                      "&:focus": {
                        boxShadow: "0 0 0 3px rgba(13,110,253,0.25)", // subtle focus ring
                      },
                    }}
                    
                    onClick={() => {
                      setActiveStep(steps[steps.length - 1]);
                      navigate(`/${mainRoute}/${steps[steps.length - 1]}${userId ? `/${userId}` : ''}`);
                    }}
                  >
                    Back
                  </Button>
                      <Box
                        flex={1}
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        gap={0.5}
                        style={{ width: "fit-content" }}
                        paddingX={0}
                      >
                        {editing ? (
                          <>
                            <InputBase
                              value={tempName}
                              onChange={(e) => setTempName(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleRename()
                              }
                              autoFocus
                              sx={{
                                fontSize: 14,
                                textAlign: "center",
                                borderBottom: "1px solid #ccc",
                                px: 0.5,
                                pb: "2px",
                                width: "100%",
                                maxWidth: 200,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={handleRename}
                              sx={{ p: 0.5, color: "green" }} // Green for Save
                            >
                              <FiCheckCircle size={20} />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <Typography
                              fontSize={14}
                              noWrap
                              sx={{ cursor: "pointer", color: "#212529" }}
                              onClick={() => setEditing(true)}
                            >
                              {fileName}
                            </Typography>
                            <Tooltip title={"Edit File Name"}>
                              <IconButton
                                size="small"
                                onClick={() => setEditing(true)}
                                sx={{
                                  p: 0.5,
                                  color: "#1976d2", // Blue for Edit
                                  "&:hover": {
                                    color: "#1565c0", // Darker blue on hover
                                  },
                                }}
                              >
                                <FiEdit2 size={17} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>

                      {/* Empty IconButton for symmetry */}
                    </Box>
                    <SelectedTemplate
                      selectedTemplate={selectedTemplate}
                      isPreview={false}
                      fontFamilyProp={fontFamily}
                      fontSizeProp={fontSize}
                      lineHeightProp={lineHeight}
                    />
                  </Box>
                  </Box>
                </Box>
                <Box
                  className={`me-1 ${!validateDAEmail(
                    useremail
                  )} ? "col-3 me-3" : "" `}
                  sx={{
                     width: '30.33%',
                    height: "100vh",
                    position: "sticky",
                    top: 80,
                    flexShrink: 0,
                    width: !validateDAEmail(useremail) ? "22%" : "24%", // Adjust width as needed
                    height: "85vh",
                    backgroundColor: "#fff",
                    padding: "20px",
                    fontSize: "14px",
                    textAlign: "center",
                    // border: "1px solid #ddd",
                    borderRadius: "6px",
                    // margin: "20px",
                    fontFamily: "inherit",
                    // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", // Same shadow style for visual harmony
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div
                      // variant="contained"
                      style={{
                        textAlign: "left",
                        color: "black",
                        border: "1px dashed gray",
                        width: "30%",
                        backgroundColor: "#fff",
                        border: "1px dashed #bbb",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          borderColor: "#888",
                        },
                      }}
                      onClick={handlePopoverOpen}
                    >
                      <FileUploadOutlinedIcon style={{ fontSize: "20px" }} />
                      <div>Export</div>
                    </div>
                    {/* <PDFDownloadLink
                      document={<ResumeDocumentPdf1 selectedTemplate={selectedTemplate}/>}
                      fileName="resume.pdf"
                      style={{
                        textAlign: "left",
                        color: "black",
                        border: "1px dashed gray",
                        width: "30%",
                        padding: "10px",
                        textAlign: "center",
                        background: "white",
                      }}
                    >
                      <DownloadForOfflineIcon style={{ fontSize: "20px" }} />
                      Download Pdf
                    </PDFDownloadLink>                   */}
                    <div
                      // variant="contained"
                      style={{
                        textAlign: "left",
                        color: "lightgray",
                        border: "1px dashed gray",
                        width: "30%",
                        backgroundColor: "#fff",
                        border: "1px dashed #bbb",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          borderColor: "#888",
                        },
                      }}

                      // onClick={() => {
                      //   let divElement = document.getElementById("resume");
                      //   if (!divElement) {
                      //     alert("Div not found!");
                      //     return;
                      //   }
                      //   let originalContent = document.body.innerHTML; // Save original page content
                      //   let printContent = divElement.outerHTML; // Get selected div content

                      //   document.body.innerHTML = printContent; // Set only selected div as body content
                      //   window.print(); // Print selected div
                      //   document.body.innerHTML = originalContent;
                      //   window.location.reload(); // Refresh to restore events
                      // }}
                      // startIcon={<DownloadForOfflineIcon />}
                    >
                      <LocalPrintshopIcon style={{ fontSize: "20px" }} />
                      <div>print </div>
                    </div>
                    <div
                      // variant="contained"
                      style={{
                        textAlign: "left",
                        color: "lightgray",
                        width: "30%",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        border: "1px dashed #bbb",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          borderColor: "#888",
                        },
                      }}
                      // onClick={() => {
                      //   // saveResume();
                      //   saveResumeAsWord();
                      // }}
                      // startIcon={<DownloadForOfflineIcon />}
                    >
                      <EmailIcon style={{ fontSize: "20px" }} />
                      <div>Email</div>
                    </div>
                  </div>

                  <div>
                    <Button
                      style={{
                        borderRadius: "25px",
                        color: "white",
                        background: "#9700fb",
                        width: "60%",
                        marginTop: "20px",
                      }}
                      className="bg-primary"
                      variant="contained"
                      onClick={() => {
                        saveResume("save");
                      }}
                    >
                      Save
                    </Button>
                  </div>
                  <div
                    className="mt-4"
                    style={{
                      padding: "10px",
                      border: "bisque",
                      color: "#5a5a73",
                      // borderBottom: "2px solid gray",
                      borderTop: "2px solid gray",
                    }}
                  >
                    {" "}
                    <b>Resume Sections</b>
                  </div>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 1.5,
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    {steps.map((step, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "#fff",
                          border: "1px dashed #bbb",
                          borderRadius: 2,
                          padding: "8px 6px",
                          textAlign: "center",
                          cursor: "pointer",
                          fontSize: "11.5px",
                          minHeight: 68,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gridColumn:
                            steps.length % 3 !== 0 &&
                            index === steps.length - 1 &&
                            steps.length % 3 === 1
                              ? "1 / -1"
                              : steps.length % 3 === 2 &&
                                index === steps.length - 1
                              ? "2 / span 2"
                              : "auto",
                          transition: "0.2s ease",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                            borderColor: "#999",
                          },
                        }}
                        onClick={() => {
                          navigate(`/${mainRoute}/${step}${userId ? `/${userId}` : ''}`);
                          setActiveStep(step);
                        }}
                      >
                        <Box
                          sx={{
                            my: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 22,
                          }}
                        >
                          {getStepIcon(step)}
                        </Box>
                        <Box
                          sx={{
                            textAlign: "center",
                            lineHeight: 1.2,
                            my: "auto",
                          }}
                        >
                          {step}
                        </Box>
                      </Box>
                    ))}
                  </Box>

                 <Box display="flex" justifyContent="center" mt={2}>
                    {/* <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        const updatedSteps = [...steps, "custom"];

                        setActiveStep("custom");
                        navigate(`/${mainRoute}/custom${userId ? `/${userId}` : ''}`)
                        if (selectedTemplate) {
                          const updatedTemplate = {
                            ...selectedTemplate,
                            steps: [...selectedTemplate.steps, "custom"],
                          };
                          setSelectedTemplate(updatedTemplate); // Assuming setSelectedTemplate is the setter for 'selectedTemplate'
                        }
                        steps = updatedSteps; // You can do this since it's a variable, not a state
                      }}
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#1565c0",
                        border: "1px solid #1565c0",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "13px",
                        display: validateDAEmail(useremail) ? "none" : "",
                        px: 1.1,
                        py: 0.8,
                        mt: 1,
                        transition: "all 0.2s ease-in-out",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
                        "&:hover": {
                          backgroundColor: "#f3f3f3",
                          borderColor: "#aaa",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
                        },
                      }}
                    >
                      Custom Section
                    </Button> */}
                  </Box> 
                </Box>
              </div>
            </div>
            // <div
            //   className="container"
            //   style={{ display: "flex", overflow: "hidden" }}
            // >
            //   {/* Left Fixed Container */}
            //   <div
            //     style={{
            //       flexBasis: "25%",
            //       // backgroundColor: "lightblue",
            //       padding: "20px",
            //       position: "sticky",
            //       top: 0,
            //       height: "100vh",
            //     }}
            //   >
            //     <div
            //       className="mt-3"
            //       style={{
            //         padding: "10px",
            //         border: "bisque",
            //         color: "#5a5a73",
            //         borderBottom: "2px solid gray",
            //         borderTop: "2px solid gray",
            //       }}
            //     >
            //       {" "}
            //       <b>Resume Sections</b>
            //     </div>
            //     <div style={{ padding: "10px 0px 0px 10px" }}>
            //       {steps.map((step, index) => (
            //         <div key={index} onClick={() => setActiveStep(step)}>
            //           <span>{step}</span>
            //         </div>
            //       ))}
            //     </div>
            //     <div
            //       className="mt-3"
            //       style={{
            //         padding: "10px",
            //         border: "bisque",
            //         color: "#5a5a73",
            //         borderBottom: "2px solid gray",
            //         borderTop: "2px solid gray",
            //       }}
            //     >
            //       {" "}
            //       <b>Add section</b>
            //     </div>
            //     <div
            //       // variant="contained"
            //       // style={{
            //       //   textAlign: "left",
            //       //   color: "black",
            //       //   border: "1px solid gray",
            //       //   width: "100%",
            //       //   padding: "10px",
            //       // }}
            //       style={{ padding: "10px 0px 0px 0px" }}
            //       onClick={() => {
            //         saveResume();
            //       }}
            //     >
            //       <span>
            //         <DownloadForOfflineIcon />
            //       </span>{" "}
            //       <span>Download & Save</span>
            //     </div>
            //   </div>

            //   {/* Right Scrollable Container */}
            //   <div
            //     style={{
            //       flex: 1,
            //       overflowY: "auto",
            //       // backgroundColor: "lightgreen",
            //       padding: "20px",
            //       // marginLeft: "150px",
            //     }}
            //   >
            //     <div
            //       style={{
            //         fontSize: "14px",
            //         width: "70%",
            //         margin: "auto",
            //         display: "flex",
            //       }}
            //     >
            //       <input
            //         value={selectedTemplate?.template_saved_name}
            //         onChange={(e) =>
            //           handleChange("template_saved_name", e.target.value)
            //         }
            //         placeholder="Resume name"
            //         style={{
            //           border: "none",
            //           fontSize: "14px",
            //           height: "0px",
            //           padding: "10px 0px",
            //           border: "none",
            //           fontSize: "14px",
            //           color: "black !important",
            //           borderBottom: !resumeName ? "0" : "1px solid gray",
            //           borderRadius: "0px",
            //           width: "max-content",
            //           background: "none",
            //         }}
            //         disabled={!resumeName ? true : false}
            //       />
            //       {!resumeName && (
            //         <div
            //           onClick={() => {
            //             setResumeName(!resumeName);
            //           }}
            //         >
            //           edit
            //         </div>
            //       )}
            //       {resumeName && (
            //         <div
            //           onClick={() => {
            //             setResumeName(!resumeName);
            //           }}
            //         >
            //           <span>close</span>
            //           <span>save</span>
            //         </div>
            //       )}
            //     </div>
            //     <SelectedTemplate
            //       selectedTemplate={selectedTemplate}
            //       isPreview={false}
            //     />
            //   </div>
            // </div>
          )}
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            borderRadius: 3,
            overflow: "visible",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        disableScrollLock
      >
        <div
          style={{ padding: "10px" }}
          className="d-flex flex-column align-items-start"
        >
          {/* DOCX Button */}
          <Button
            startIcon={<Description style={{ fontSize: "16px" }} />}
            onClick={() => {
              const converted = htmlDocx.asBlob(
                ReactDOMServer.renderToString(
                  <SelectedTemplate
                    selectedTemplate={selectedTemplate}
                    isDownload={true}
                    fontFamilyProp={fontFamily}
                    fontSizeProp={fontSize}
                    lineHeightProp={lineHeight}
                  />
                  // <Test/>
                )
              );

              saveAs(converted, `${fileName}.docx`);
              handlePopoverClose();
            }}
            style={{ fontSize: "12px", textTransform: "none" }}
          >
            Export as DOCX
          </Button>

          {/* PDF Button using PDFDownloadLink */}
          <PDFDownloadLink
            document={
              <SelectedPdfTemplate selectedTemplate={selectedTemplate} />
            }
            fileName={`${fileName}.pdf`}
          >
            {({ loading }) => (
              <Button
                color="error"
                startIcon={<PictureAsPdf style={{ fontSize: "16px" }} />}
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  textTransform: "none",
                  color: "#FF4D4D",
                }}
                onClick={handlePopoverClose}
              >
                {loading ? "Preparing PDF..." : "Export as PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </Popover>
      <Dialog
        open={openNavigateDialog}
        onClose={() => setOpenNavigateDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1.5,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            pb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Unsaved Changes
          </Typography>
          <IconButton onClick={() => setOpenNavigateDialog(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 2, py: 1 }}>
          <Typography variant="body1">
            Are you sure you want to go back to the home page? Any unsaved data
            will be lost.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={() => setOpenNavigateDialog(false)}
            sx={{
              minWidth: 100,
              color: "#555",
              borderColor: "#ccc",
              backgroundColor: "#f9fafb",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                borderColor: "#bdbdbd",
              },
            }}
          >
            Stay
          </Button>
          
          <Button
            variant="contained"
            color="error"
            onClick={()=>{
              navigate(`/${mainRoute}/home${userId ? `/${userId}` : ''}`);
              // setAllTemplates([]);
              setActiveTab(0);
              setSelectedTemplate(null)
              dispatch({ type: "USER_TEMPLATE_DETAILS", data: null });
            }}
            sx={{
              minWidth: 100,
            }}
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
        sectionName={sectionName}
        selectedItem={selectedToDelete}
        custom={false}
      />
<Popover
  open={Boolean(anchorElaienhance)}
  anchorEl={anchorElaienhance}
  onClose={handleCloseaienhance}
  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  transformOrigin={{ vertical: "top", horizontal: "left" }}
  PaperProps={{
    elevation: 8,
    sx: {
      p: 3,
      borderRadius: 4,
      maxWidth: 440,
      mt: 1.2,
      overflow: "visible",
      boxShadow:
        "0 12px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
      bgcolor: "background.paper",
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        width: 14,
        height: 14,
        bgcolor: "background.paper",
        top: 0,
        left: "14%",
        transform: "translate(-50%, -50%) rotate(45deg)",
        boxShadow:
          "-2px -2px 4px rgba(0,0,0,0.03)", // subtle shadow on arrow
        zIndex: 0,
        borderRadius: 1,
      },
    },
  }}
>
  <Typography
    variant="h6"
    fontWeight={700}
    mb={2}
    color="primary.dark"
    letterSpacing={0.3}
  >
    ✨ Enhance {activeStep} with AI
  </Typography>

  <IconButton
    size="small"
    onClick={handleCloseaienhance}
    sx={{
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: "grey.100",
      color: "grey.600",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "grey.200",
      },
    }}
  >
    <CloseIcon fontSize="small" />
  </IconButton>

  <Tabs
    value={tabvalue}
    onChange={handleChangeTabinPopover}
    aria-label="AI Resume Enhancer Tabs"
    textColor="primary"
    variant="scrollable"
    scrollButtons={false}
    sx={{
      minHeight: 36,
      mb: 2,
      borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
      "& .MuiTabs-flexContainer": {
        gap: 1,
      },
      "& .MuiTabs-indicator": {
        height: 3,
        borderRadius: 3,
        backgroundColor: "primary.main",
      },
    }}
  >
    {tabData.map((tab, index) => (
      <Tab
        key={index}
        label={tab.label}
        disableRipple
        sx={{
          minHeight: 30,
          px: 1.5,
          fontSize: 14,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 3,
          color: "text.secondary",
          "&.Mui-selected": {
            color: "primary.main",
            fontWeight: 700,
          },
          "&:hover": {
            backgroundColor: "rgba(59, 130, 246, 0.08)",
          },
        }}
      />
    ))}
  </Tabs>

  {/* Tab 0: Autocomplete & Summary List */}
  {tabvalue === 0 && (
    <Box>
      <Box flex={1} minWidth="280px" my={2}>
        <Autocomplete
          options={[
            "Frontend Developer",
            "Backend Developer",
            "UI/UX Designer",
            "Software Engineer",
            "DevOps Engineer",
          ]}
          value={profession}
          onChange={handleProfessionSelect}
          freeSolo
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some(
              (option) => inputValue === option
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                label: `Add "${inputValue}"`,
              });
            }
            return filtered;
          }}
          sx={{
            "& .MuiAutocomplete-listbox": {
              fontSize: 14,
            },
          }}
          ListboxProps={{
            sx: {
              "& .MuiAutocomplete-option": {
                fontSize: 13,
                py: 0.8,
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search with keyword or job title..."
              fullWidth
              size="small"
              inputRef={inputRef}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: 14,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.25s ease",
                  "& fieldset": {
                    borderColor: "#ccc",
                    transition: "border-color 0.25s ease",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 6px rgba(59,130,246,0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputAdornment-root svg": {
                  fontSize: 20,
                  color: "#666",
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      {loadingSummary ? (
        <Box
          sx={{
            maxHeight: 270,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={70}
              width="100%"
              sx={{ borderRadius: 3 }}
              animation="wave"
            />
          ))}
        </Box>
      ) : aiSummaryList.length > 0 ? (
        <Box
          sx={{
            maxHeight: 270,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {aiSummaryList.map((summary, index) => {
            const isSelected = selectedTemplate?.summary?.value?.includes(
              summary
            );
            return (
              <Box
                key={index}
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                p={2}
                borderRadius={3}
                bgcolor={isSelected ? "#e3f2fd" : "#fafafa"}
                border={`1.5px solid ${
                  isSelected ? "#64b5f6" : "#e0e0e0"
                }`}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.25s ease, border-color 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    borderColor: "#64b5f6",
                  },
                }}
                onClick={() =>
                  isSelected ? removeFromEditor(summary) : addToEditor(summary)
                }
              >
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    fontSize: 15,
                    color: "#222",
                    lineHeight: 1.5,
                    userSelect: "none",
                  }}
                >
                  {summary}
                </Typography>

                <IconButton
                  size="small"
                  sx={{
                    ml: 1.5,
                    backgroundColor: isSelected ? "#bbdefb" : "#e3f2fd",
                    color: isSelected ? "#1976d2" : "#0d47a1",
                    "&:hover": {
                      backgroundColor: isSelected ? "#90caf9" : "#bbdefb",
                    },
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {isSelected ? (
                    <RemoveIcon fontSize="small" />
                  ) : (
                    <AddIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, fontStyle: "italic", textAlign: "center" }}
        >
          No summaries available.
        </Typography>
      )}

      <Box className="d-flex w-100 mt-3">
        <Button
          size="small"
          variant="contained"
          className="ms-auto"
          disableElevation
          startIcon={<RestartAltIcon fontSize="small" />}
          onClick={handleRegenerate}
          sx={{
            borderRadius: 3,
            fontSize: 13,
            color: "#fff",
            textTransform: "none",
            px: 3,
            py: 0.7,
            boxShadow: "0 4px 12px rgba(63, 81, 181, 0.4)",
            backgroundColor: "#1976d2",            
            transition: "all 0.3s ease",
          }}
        >
          Regenerate
        </Button>
      </Box>
    </Box>
  )}

  {/* Tab 1: Rephrased Summaries */}
  {tabvalue === 1 && (
    <Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        // gap: 3,
        maxHeight: 300,
        overflow: "hidden",
      }}
    >
  <Box
    sx={{
      position: "relative",
      borderRadius: 4,
      // p: 1,
      mb: 2,
      // boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      // "&:hover": {
      //   transform: "translateY(-6px)",
      //   boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
      // },
    }}
  >

    {/* Original Content Box */}
    <Box
      sx={{
        // mt: 2.5,
        // p: 2,
        border: "1px solid #d1d5db",
        borderRadius: 2,
        backgroundColor: "#ffffff",
        color: "#374151",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
      }}
    >
      <Box
      sx={{
        width:'fit-content',
        bgcolor: "#6b7280",
        color: "#fff",
        px: 2,
        py: 0.5,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      ORIGINAL
    </Box>
    <Box sx={{
      maxHeight: "7.5em",
      overflowY: "auto",
      p:2,
      pt:0.3,
      '& p':{
        margin:"0"
      }
    }}
    dangerouslySetInnerHTML={{ __html: selectedTemplate?.summary?.value || "" }}
    >
    </Box>
    </Box>

    {/* Rephrased Section */}
    <Box
      sx={{
        mt: 2,
        // p: 2,
        border: "1px solid #bfdbfe",
        borderRadius: 2,
        backgroundColor: "#e0f2fe",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        color: "#1e3a8a",
        whiteSpace: "pre-wrap",
        position: "relative",
      }}
    >
      {/* REPHRASED Ribbon */}
      <Box
        sx={{
          width:'fit-content',
          bgcolor: "#3b82f6",
          color: "#fff",
          px: 2,
          py: 0.5,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
          marginLeft:"auto",
        }}
      >
        REPHRASED
      </Box>
      <Box sx={{
        maxHeight: "7.5em",
        overflowY: "auto",
        p:2,
        pt:0.3,
      }}>
      {'feofohaowe'}
      </Box>
    </Box>
  </Box>
</Box>

<Box className="d-flex w-100 justify-content-end" gap={1}>
  <Button
    size="small"
    variant="outlined"
    disableElevation
    startIcon={<RestartAltIcon fontSize="small" />}
    onClick={handleRegenerate}
    sx={{
      borderRadius: 3,
      fontSize: 13,
      textTransform: "none",
      border:'none',
      px: 3,
      py: 0.7,
      transition: "all 0.3s ease",
    }}
  >
    Regenerate
  </Button>

  <Button
    size="small"
    variant="contained"
    disableElevation
    startIcon={<CheckCircleIcon fontSize="small" />}
    onClick={handleRegenerate}
    sx={{
      borderRadius: 3,
      fontSize: 13,
      textTransform: "none",
      px: 3,
      py: 0.7,
      color: "#fff",
      textTransform: "none",
      px: 3,
      py: 0.7,
      backgroundColor: "#1976d2", 
      transition: "all 0.3s ease",
    }}
  >
    Apply
  </Button>
</Box>

    </Box>
  )}
</Popover>

    </Box>
  );
}

export default TemplatePreview;
