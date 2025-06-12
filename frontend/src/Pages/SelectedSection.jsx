import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const sectionDetails = [
  { name: "Languages", description: "List all the languages you know and your level of fluency." },
  { name: "Hobbies", description: "Share hobbies or leisure activities you enjoy regularly." },
  { name: "Interests", description: "Mention topics or fields you enjoy learning about often." },
  { name: "Awards", description: "Include awards or honors you’ve received for achievements." },
  { name: "Volunteer Experience", description: "Describe community service or volunteer work you’ve done." },
  { name: "References", description: "List people who can speak about your skills and character." },
  { name: "Publications", description: "Mention any blogs, papers, or books you’ve authored or co-authored." },
  { name: "Testimonials", description: "Add feedback or quotes shared by peers, clients, or mentors." },
  { name: "Achievements", description: "Summarize personal or professional goals you’ve accomplished." },
  { name: "Extra Curriculars", description: "Highlight events, sports, or clubs you’ve participated in." },
  { name: "Add Own", description: "Create a custom section to include any additional information." },
];


const SectionSelection = ({ onSelectSection, steps = [],customSections,setActiveStep }) => {
    const { childroute,userId } = useParams();
      const location = useLocation();
      const Path = location.pathname;
    const mainRoute = Path.split("/")[1];
      const navigate = useNavigate();
  const lowerSteps = (steps || []).map(s => s.toLowerCase());
  const lowerCustomLabels = (customSections || []).map(c => c.label.toLowerCase());
  
  const filteredSections = sectionDetails?.filter(({ name }) => {
    const lowerName = name.toLowerCase();
    const isInSteps = lowerSteps.includes(lowerName);
    const isInCustom = lowerCustomLabels.includes(lowerName);
    return !(isInSteps && !isInCustom);
  });
  
  const existingNames = filteredSections?.map(({ name }) => name.toLowerCase()) || [];
  
  const customOnlySections = (customSections || [])
    .filter(({ label }) => !existingNames.includes(label.toLowerCase()))
    .map(({ label, value }) => ({
      name: label,
      description: value
    }));
  
  const finalSections = [...(filteredSections || []), ...customOnlySections];  
  // filter items that in steps but not in custom steps (because already in template...)
  return (
    <Box sx={{ pl: 4, py: 3,pt:0, }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Select a Section
      </Typography>
      
      <Grid container spacing={3}>
        {finalSections?.map(({ name, description }) => {
          const isSelected = steps.map(step => step.toLowerCase()).includes(name.toLowerCase());
          return (
            <Grid item xs={12} sm={6} md={4} key={name}>
              <Card
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  border: isSelected ? "2px solid #4caf50" : "1px solid #e0e0e0",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  boxShadow: isSelected
                    ? "0 8px 20px rgba(76, 175, 80, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.05)",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    transform: "translateY(-3px)",
                    borderColor: "#1976d2"
                  }
                }}
                onClick={() => {
                  if(!isSelected){ onSelectSection(name)}
                  else{
                    navigate(`/${mainRoute}/${name}${userId ? `/${userId}` : ''}`);
                    setActiveStep(name);
                  }
                }
                }
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography fontWeight={600} sx={{fontSize:"15px",color:"#212529"}}>
                      {name}
                    </Typography>
                    {isSelected ? (
                      <Tooltip title="Already Added">
                        <CheckCircleIcon sx={{ color: "#4caf50" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add Section">
                        <AddCircleOutlineIcon sx={{ color: "#757575" }} />
                      </Tooltip>
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "text.secondary",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      textOverflow: "ellipsis",
                      '& p': {
                        margin: 0, // Removes margin from inner <p> tags
                      },
                      '& ol': {
                        margin: 0, // Removes margin from inner <p> tags
                      },
                    }}
                    component="div"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />


                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SectionSelection;
