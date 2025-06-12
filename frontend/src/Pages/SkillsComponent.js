import React, { useEffect, useRef, useState } from "react";
import { Chip, Stack, TextField, Button, Tooltip, Box, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';
import { Eraser } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';
import { ArrowDownAZ } from 'lucide-react';
import { ArrowUpAZ } from 'lucide-react';
const styles = {
  box: {
    border: "1px solid #ccc",
    padding: "10px 20px",
    width: "47%",
    minHeight: "450px",
    // overflowY: "auto",
    borderRadius: "2px",
    background: "#f9fafb",
  },
  fixedBox: {
    border: "1px solid #ccc",
    padding: "10px 20px",
    width: "47%",
    minHeight: "450px",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
  },
  fixedHeader: {
    position: "sticky",
    top: 0,
    background: "#fff",
    paddingBottom: "10px",
    zIndex: 2,
    borderBottom: "1px solid lightgray",
  },
  scrollableContent: {
    flex: 1,
    overflowY: "auto",
  },
  fixedFooter: {
    position: "sticky",
    bottom: 0,
    background: "#fff",
    paddingTop: "10px",
    zIndex: 2,
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
};
const sortStates = ["default", "asc", "desc"];
export default function SkillsComponent({
  selectedSkillOptions,
  selectedTemplate,
  setSelectedTemplate,
  debouncedSave,
  errors,
  setErrors,
  setSortState,
  sortState,
}) {
  const allSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
  ];

  const originalSkillsRef = useRef(
    selectedTemplate?.skills?.value ? [...selectedTemplate.skills.value] : []
  );  
  // State to store available skills and selected skills
  const [availableSkills, setAvailableSkills] = useState([
    ...allSkills,
    ...selectedTemplate?.skills?.value,
  ]);
  //   const [selectedSkills, setSelectedTemplate] = useState({
  //     skills: { label: "skill", value: [] },
  //   });
  const [newSkill, setNewSkill] = useState("");
  const [search, setSearch] = useState("");

  // Handle selecting a skill
  const handleToggleSkill = (skill) => {
    setErrors({})
    const isSelected = selectedTemplate.skills.value.includes(skill);

    if (isSelected) {
      const updatedSkills = selectedTemplate.skills.value.filter((item) => item !== skill);
      if (
        Array.isArray(originalSkillsRef.current) &&
        originalSkillsRef.current.includes(skill)
      ) {
        originalSkillsRef.current = originalSkillsRef.current.filter((item) => item !== skill);
      }
      let sortedSkills = [...updatedSkills]; // apply sorting on updatedSkills
      if (sortState === "asc") {
        sortedSkills.sort((a, b) => a.localeCompare(b));
      } else if (sortState === "desc") {
        sortedSkills.sort((a, b) => b.localeCompare(a));
      }
      const updatedTemplate = {
        ...selectedTemplate,
        skills: {
          ...selectedTemplate.skills,
          value: sortedSkills,
        },
      };

      setSelectedTemplate(updatedTemplate);
      debouncedSave(updatedTemplate);
      setAvailableSkills([...availableSkills, skill]);
    } else {
      // Add to selected and remove from available
      if (
        Array.isArray(originalSkillsRef.current) &&
        !originalSkillsRef.current.includes(skill)
      ) {
        originalSkillsRef.current = [...originalSkillsRef.current, skill];
      }      
      
      const updatedSkills = [...selectedTemplate?.skills.value, skill];
      let sortedSkills = [...updatedSkills]; // apply sorting on updatedSkills
      if (sortState === "asc") {
        sortedSkills.sort((a, b) => a.localeCompare(b));
      } else if (sortState === "desc") {
        sortedSkills.sort((a, b) => b.localeCompare(a));
      }
      const updatedTemplate = {
        ...selectedTemplate,
        skills: {
          ...selectedTemplate.skills,
          value: sortedSkills,
        },
      }
      setSelectedTemplate(updatedTemplate);
      debouncedSave(updatedTemplate);
      setAvailableSkills(availableSkills.filter((item) => item !== skill));
    }
  };


  const handleSort = () => {
    const nextSort = sortStates[(sortStates.indexOf(sortState) + 1) % sortStates.length];
    setSortState(nextSort);

    let sortedSkills = [...selectedTemplate.skills.value];
    if (nextSort === "asc") {
      sortedSkills.sort((a, b) => a.localeCompare(b));
    } else if (nextSort === "desc") {
      sortedSkills.sort((a, b) => b.localeCompare(a));
    } else {
      sortedSkills = [...originalSkillsRef.current];
    }
    const updatedTemplate = {
      ...selectedTemplate,
      skills: {
        ...selectedTemplate.skills,
        value: sortedSkills,
      },
    };
    debouncedSave(updatedTemplate)
    setSelectedTemplate(updatedTemplate);
  };

  const handleClear = () => {
    const updatedTemplate = {
      ...selectedTemplate,
      skills: {
        ...selectedTemplate.skills,
        value: [],
      },
    };
    debouncedSave(updatedTemplate)
    setSelectedTemplate(updatedTemplate);    
    originalSkillsRef.current = [];
    setSortState("default");
  };

  const getSortIcon = () => {
    const iconSize = 15;
    const iconColor = "#333"; // dark grey or any hex
  
    switch (sortState) {
      case "asc":
        return <ArrowDownAZ size={iconSize} color={iconColor} title="Sort Ascending" />;
      case "desc":
        return <ArrowUpAZ size={iconSize} color={iconColor} title="Sort Descending" />;
      default:
        return <ArrowUpDown size={iconSize} color={iconColor} title="Reset to Original" />;
    }
  };
  

  // Handle removing a skill from selected
  const handleRemoveSkill = (skill) => {
 
    const updatedTemplate = {
      ...selectedTemplate,
      skills: {
        ...selectedTemplate?.skills,
        value: selectedTemplate?.skills.value.filter((item) => item !== skill),
      }
    };
    if (
      Array.isArray(originalSkillsRef.current) &&
      originalSkillsRef.current.includes(skill)
    ) {
      originalSkillsRef.current = originalSkillsRef.current.filter((item) => item !== skill);
    }    
    setSelectedTemplate(updatedTemplate);
    debouncedSave(updatedTemplate);
    setAvailableSkills([...availableSkills, skill]);
  };
  const chipColors = [ "#e2e8ff", "#faf3c0", "#f5f5f5"]; // pink, light blue, mellow yellow, light grey
  const chipTextColors = ["#0d47a1", "#795548", "#424242"]; // Raspberry, Indigo, Coffee Brown, Charcoal Grey  
  // Handle adding a new skill
  const handleAddNewSkill = () => {
    setErrors({})
    const trimmedSkill = newSkill.trim().toLowerCase();
    const existingSkills = selectedTemplate?.skills?.value?.map(skill => skill.toLowerCase()) || [];
    
    if (existingSkills.includes(trimmedSkill)) {
      setErrors({ skills: "This skill already exists" });
      return;
    }    
    if (newSkill && newSkill.trim() && !selectedTemplate.skills.value.includes(newSkill)) {
      

      if (Array.isArray(originalSkillsRef.current)) {
        if (!originalSkillsRef.current.includes(newSkill)) {
          originalSkillsRef.current = [...originalSkillsRef.current, newSkill];
        }
      }         
      const updatedSkills = [...selectedTemplate?.skills?.value, newSkill];
      let sortedSkills = [...updatedSkills]; // apply sorting on updatedSkills
      if (sortState === "asc") {
        sortedSkills.sort((a, b) => a.localeCompare(b));
      } else if (sortState === "desc") {
        sortedSkills.sort((a, b) => b.localeCompare(a));
      }
      const updatedTemplate = {
        ...selectedTemplate,
        skills: {
          ...selectedTemplate?.skills,
          value: sortedSkills,
        },
      }
      setSelectedTemplate(updatedTemplate);
      debouncedSave(updatedTemplate);
      setNewSkill("");
    }
  };
  const options = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Software Engineer",
    "DevOps Engineer",
  ];
  return (
    <div>
        {errors.skills && (
     <p
     className="ms-3 mb-0"
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
     ⚠️ {errors.skills}
   </p>
   
      )}
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "15px 0px 0px 0px",
      }}
      >
      {/* Left Side (Available Skills) */}
      <div style={styles.box}>
        <h6 className="p-1" style={{ borderBottom: "1px solid lightgray" }}>
          Available Skills
        </h6>
        <Autocomplete
            freeSolo // allows typing new values not in options
            options={options}
            value={search}
            onChange={(event, newValue) => {
              setSearch(newValue || "");
            }}
            disabled
            inputValue={search}
            onInputChange={(event, newInputValue) => {
              setSearch(newInputValue);
            }}
            ListboxProps={{
              sx: {
                '& .MuiAutocomplete-option': {
                  fontSize: '0.8rem', 
                }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type a profession to see skill requirements..."
                fullWidth
                size="small"
                // type="search"
                sx={{
                  '& input': { fontSize: '0.8rem' } ,
                  "& .MuiInputBase-input": { fontSize: "12px" },
                  "& .MuiInputBase-root": { fontSize: "14px", margin: "4px 0px" },
                }}
              />
            )}
          />

        <div
          direction="column"
          spacing={1}
          style={{ overflowY: "auto", height: "400px" }}
          className="p-1"
        >
          {allSkills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              icon={
                !selectedTemplate?.skills?.value?.includes(skill) ? (
                  <AddIcon
                    style={{
                      color: "black",
                      background: "rgb(255, 205, 125)",
                      borderRadius: "25px",
                      fontSize: "13px",
                    }}
                  />
                ) : (
                  <RemoveIcon
                    style={{
                      color: "black",
                      background: "#dbeafe",
                      borderRadius: "25px",
                      fontSize: "13px",
                    }}
                  />
                )
              }
              onClick={() => handleToggleSkill(skill)}
              // color="primary"
              // variant="outlined"
              className="p-1 m-1"
              size="small"
              style={{ background: "white", border: !selectedTemplate?.skills?.value?.includes(skill)
                ? "1px solid #f5e59f" // slightly deeper yellow than #faf3c0
                : "1px solid #cbd5ff" // stronger soft blue than #e2e8ff
              }}
              title={"Click to add"}
            />
          ))}
        </div>
      </div>

      {/* Right Side (Selected Skills) */}
      {/* <div style={styles.box}>
        <h4>Selected Skills</h4>
        <Stack
          direction="column"
          spacing={1}
          style={{ overflowY: "auto", height: "400px" }}
        >
          {selectedTemplate?.skills?.value?.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onClick={() => handleRemoveSkill(skill)}
              color="secondary"
              variant="outlined"
            />
          ))}
          <div className="d-flex justify-content-between">
            <TextField
              size="small"
              label="Add a new skill"
              variant="outlined"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              fullWidth
              style={{ fontSize: "14px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewSkill}
              //   fullWidth
              disabled={!newSkill}
              endIcon={<AddIcon />}
              style={{ width: "max-content" }}
            ></Button>
          </div>
        </Stack>
      </div> */}
      {/* Right Side (Selected Skills) */}
      <div style={styles.fixedBox}>
        <div style={styles.fixedHeader}>
          <div
            className="d-flex justify-content-between align-items-center"
          >
            <label className="p-1">Selected Skills</label>
            <div className="d-flex align-items-center gap-2">
            <div
              onClick={handleSort}
              title={`Sort (${sortState})`}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                backgroundColor: "#f8f9fa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e6ea")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
            >
              {getSortIcon()}
            </div>


              <div
                onClick={handleClear}
                title="Clear Skills"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e6ea")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              >
                <Eraser size={15} color={'#333'}/>
              </div>
            </div>

          </div>
        </div>

        <div
          style={{
            // ...styles.scrollableContent,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            padding: "8px", 
          }}
        >
  {selectedTemplate?.skills?.value?.map((skill, index) => {
  const colorIndex = index % chipColors.length;
  return (
    <div
      key={skill}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", index);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const fromIndex = Number(e.dataTransfer.getData("text/plain"));
        const toIndex = index;

        if (fromIndex === toIndex) return;

        setSelectedTemplate((prev) => {
          const updatedSkills = [...prev.skills.value];
          const [movedItem] = updatedSkills.splice(fromIndex, 1);
          updatedSkills.splice(toIndex, 0, movedItem);

          return {
            ...prev,
            skills: {
              ...prev.skills,
              value: updatedSkills,
            },
          };
        });
      }}
      style={{
        cursor: "grab",
        margin: "4px",
        display: "inline-block",
      }}
    >
      <Chip
        label={skill}
        onDelete={() => handleRemoveSkill(skill)}
        size="small"
        style={{
          backgroundColor: chipColors[colorIndex],
          color: chipTextColors[colorIndex],
          // border: `1px solid ${chipBorderColors[colorIndex]}`,
          fontWeight: 500,
        }}
        deleteIcon={<CancelIcon style={{ fontSize: "16px",color:"#9e9e9e" }} />}
        title={"Click to remove"}
      />
    </div>
  );
})}

        </div>
        {/* Input for adding new skills */}
        <div style={styles.fixedFooter}>
          <TextField
            size="small"
            label="Add a new skill"
            variant="outlined"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddNewSkill();
              }
            }}
            fullWidth
            style={{ fontSize: "14px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewSkill}
            disabled={!newSkill}
            endIcon={<AddIcon />}
            style={{ width: "max-content" }}
          >
            Add
          </Button>

        </div>
          <Box className="mt-auto" display="flex" gap={0.5} sx={{ color: '#6b7280', fontSize: '14px' }}>
            <InfoIcon sx={{ fontSize: 16 }} />
            <span style={{fontSize:"12px",fontStyle:"italic"}}>Click the close icon to remove a skill, or drag to change the order.</span>
          </Box>
      </div>

    </div>
    </div>
  );
}
