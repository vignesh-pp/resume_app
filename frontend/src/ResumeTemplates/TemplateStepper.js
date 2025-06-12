import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import SubjectIcon from "@mui/icons-material/Subject";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ApprovalIcon from "@mui/icons-material/Approval";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
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
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect,useRef,useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function TemplateStepper({ steps, activeStep, setActiveStep, setActiveTab, setOpenNavigateDialog }) {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [showTopDots, setShowTopDots] = useState(false);
  const [showBottomDots, setShowBottomDots] = React.useState(false);
  const updatedSteps = ["Home", ...steps];
  const location = useLocation();
  const isCreateRoute = location.pathname === "/create";
  useEffect(() => {
    const index = updatedSteps.indexOf(activeStep);
    if (stepRefs.current[index]) {
      stepRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

    
  }, [activeStep,steps]);
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
  
    const tolerance = 1; // Small tolerance to ensure the condition works even with rounding issues
    setShowTopDots(el.scrollTop > tolerance);
    setShowBottomDots(el.scrollTop + el.clientHeight < el.scrollHeight - tolerance);
  };
  
  const scrollContent = (direction) => {
    const el = containerRef.current;
    if (el) {
      const scrollAmount = 100; // Adjust this value for more or less scroll per click
      el.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  const handleResize = () => {
    const el = containerRef.current;
    if (el) {
      // Recalculate visibility of dots after resize (zoom/screen size change)
      const tolerance = 1; // Small tolerance
      setShowTopDots(el.scrollTop > tolerance);
      setShowBottomDots(el.scrollTop + el.clientHeight < el.scrollHeight - tolerance);
    }
  };
  
  useEffect(() => {
    handleScroll(); // Initial check on mount
  
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
  
    // Listen to window resize events to adjust dots visibility
    window.addEventListener("resize", handleResize);
  
    // Cleanup on component unmount
    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const getStepIcon = (value) => {
    const iconProps = { fontSize: "small" };
    const key = value.toLowerCase();

    
    if (key.includes("home")) return <HomeIcon {...iconProps} />;
    if (key.includes("personal")) return <PersonIcon {...iconProps} />;
    if (key.includes("education")) return <SchoolIcon {...iconProps} />;
    if (key.includes("summary")) return <SubjectIcon {...iconProps} />;
    if (key.includes("skill")) return <DownhillSkiingIcon {...iconProps} />;
    if (key.includes("certificate")) return <ApprovalIcon {...iconProps} />;
    if (key.includes("experi")) return <AddReactionIcon {...iconProps} />;
    if (key.includes("project")) return <AccountTreeIcon {...iconProps} />;
    if (key.includes("languages")) return <LanguageIcon {...iconProps} />;
    if (key.includes("hobbies")) return <EmojiPeopleIcon {...iconProps} />;
    if (key.includes("interests")) return <LibraryBooksIcon {...iconProps} />;
    if (key.includes("awards")) return <MilitaryTechIcon {...iconProps} />;
    if (key.includes("certifications")) return <AssignmentIcon {...iconProps} />;
    if (key.includes("skills")) return <CodeIcon {...iconProps} />;
    if (key.includes("volunteer experience")) return <VolunteerActivismIcon {...iconProps} />;
    if (key.includes("references")) return <AccountCircleIcon {...iconProps} />;
    if (key.includes("publications")) return <BookIcon {...iconProps} />;
    if (key.includes("testimonials")) return <MessageIcon {...iconProps} />;
    if (key.includes("achievements")) return <FlagIcon {...iconProps} />;
    if (key.includes("extra curriculars")) return <FlagIcon {...iconProps} />;
    if (key.includes("add own") || key.includes("custom")) return <BuildIcon {...iconProps} />;

    return <Typography variant="caption" sx={{      
      fontWeight: 600,
      fontSize: "0.7rem",
      userSelect: "none",}}
      >{value.charAt(0).toUpperCase()}</Typography>;
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: direction === "up" ? -100 : 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
    {showTopDots && (
        <Box
        className="mb-2"
        >
          <IconButton
            onClick={() => scrollContent("up")}
            sx={{
              position: "absolute", // Absolute positioning outside the container
              top: 3, // Adjust based on your design to place it outside
              left: "49%", // Position it horizontally at the center
              transform: "translateX(-50%)",
              zIndex: 1100, // Ensure the icon is above the sidebar
              width: "30px", // Set the size of the button
              height: "30px", // Set the size of the button
              borderRadius: "50%", // Make it a circular button
              backgroundColor: "rgba(211, 211, 211, 1)", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Floating shadow effect
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s, transform 0.3s", // Smooth transition for hover effect
              "&:hover": {
                backgroundColor: "#b0b0b0", // Darker shade of brown or mild color when hovered
              },
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: "1.35rem", color: "#777777" }}/>
          </IconButton>
        </Box>
      )}
    <Box sx={{ position: "relative", }}>
      {/* Top dots */}

      {/* Scrollable content */}
      <Box
        ref={containerRef}
        sx={{
          overflowY: "hidden",
          overflowX: "hidden",
          maxHeight: "calc(93vh - 20px)", 
          my: 1,
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        <Stepper
          activeStep={updatedSteps.indexOf(activeStep)}
          orientation="vertical"
        >
          {updatedSteps.map((value, index) => {
            const isCompleted = updatedSteps.indexOf(activeStep) > index;
            const isActive = activeStep === value;

            return (
              <Step key={index} ref={(el) => (stepRefs.current[index] = el)}>
                <StepLabel
                  StepIconComponent={() => (
                    <Tooltip title={value} arrow>
                      <Box
                        sx={{
                          width: 27,
                          height: 27,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isActive || isCompleted
                            ? "primary.main"
                            : "grey.300",
                          color: isActive || isCompleted ? "white" : "grey.500",
                          boxShadow: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (index === 0) {
                            setOpenNavigateDialog(true)
                            // setActiveTab(0)
                          }; // ← Stop if not on '/create'
                        //   else {
                        //     if (index === 0) setActiveTab(0);
                        //     setActiveStep(value);
                        // }
                        }}
                      >
                        {getStepIcon(value)}
                      </Box>
                    </Tooltip>
                  )}
                />
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Box>
      {/* Bottom dots */}
      {showBottomDots && (
        <Box
        >
          <IconButton
            onClick={() => scrollContent("down")}
                sx={{
              position: "absolute", // Absolute positioning outside the container
              bottom: 4,
              left: "49%", // Position it horizontally at the center
              transform: "translateX(-50%)",// Adjust based on your design to place it outside
              zIndex: 1100, // Ensure the icon is above the sidebar
              width: "30px", // Set the size of the button
              height: "30px", // Set the size of the button
              borderRadius: "50%", // Make it a circular button
              backgroundColor: "rgba(211, 211, 211, 1)", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Floating shadow effect
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s, transform 0.3s", // Smooth transition for hover effect
              "&:hover": {
                backgroundColor: "#b0b0b0", // Darker shade of brown or mild color when hovered
              },
            }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: "1.35rem", color: "#777777"  }}/>
          </IconButton>
        </Box>
      )}
    </>
  );
}
