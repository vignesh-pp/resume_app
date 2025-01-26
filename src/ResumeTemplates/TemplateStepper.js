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
import { useEffect } from "react";

export default function TemplateStepper(props) {
  const { steps, activeStep, setActiveStep, setActiveTab } = props;
  useEffect(() => {
    console.log(steps);
  }, []);

  // Adding "Home" as the first step to the updated steps array
  const updatedSteps = ["Home", ...steps];

  // Function to determine which icon to render based on step value
  const getStepIcon = (value, isCompleted, isActive) => {
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
    if (value.toLowerCase().includes("work"))
      return <BuildIcon {...iconProps} />;

    return (
      <Typography variant="caption">{value.charAt(0).toUpperCase()}</Typography>
    ); // Fallback: First letter of the step
  };

  return (
    <Box>
      <Stepper
        activeStep={updatedSteps.indexOf(activeStep)}
        orientation="vertical"
      >
        {updatedSteps.map((value, index) => {
          // Determine if the step is active, completed, or not yet reached
          const isCompleted = updatedSteps.indexOf(activeStep) > index;
          const isActive = activeStep === value;

          return (
            <Step key={index}>
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
                        backgroundColor: isActive
                          ? "primary.main"
                          : isCompleted
                          ? "primary.main"
                          : "grey.300",
                        color: isActive || isCompleted ? "white" : "grey.500",
                        boxShadow: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (index === 0) setActiveTab(0); // For the "Home" step
                      }}
                    >
                      {getStepIcon(value, isCompleted, isActive)}
                    </Box>
                  </Tooltip>
                )}
              />
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
