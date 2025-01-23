import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

export default function TemplateStepper(props) {
  const { steps, activeStep, setActiveStep, setActiveTab } = props;

  return (
    <Box>
      {/* Home Icon as the first step */}

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((value, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={() => (
                <Tooltip title={value.label} arrow>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        index <= activeStep ? "primary.main" : "grey.300",
                      color: index <= activeStep ? "white" : "grey.500",
                      boxShadow: 1,
                    }}
                    onClick={() => {
                      index === 0 && setActiveTab(0);
                    }}
                  >
                    {/* {index <= activeStep ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <Typography variant="caption">{index + 1}</Typography>
                    )} */}
                    {value.icon}
                  </Box>
                </Tooltip>
              )}
            />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
