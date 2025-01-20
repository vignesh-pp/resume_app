import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Button, Divider } from "@mui/material";

// Define initial sections of the resume
const initialSections = [
  { id: "1", label: "Personal Details" },
  { id: "2", label: "Summary" },
  { id: "3", label: "Skills" },
  { id: "4", label: "Experience" },
  { id: "5", label: "Education" },
  { id: "6", label: "Certificates" },
];

const ResumeTemplate = () => {
  // Manage state for sections (resume parts)
  const [sections, setSections] = useState(initialSections);

  // Handle the drag end event to reorder the sections
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the droppable area, do nothing
    if (!destination) return;

    // Reorder the sections based on the drag result
    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(source.index, 1); // Remove dragged section
    reorderedSections.splice(destination.index, 0, movedSection); // Insert it at the new position

    // Update state with the reordered sections
    setSections(reorderedSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections" direction="vertical">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#f4f4f4",
              minHeight: "200px", // Ensure there's enough space for dragging
            }}
          >
            <h3>Resume Sections</h3>
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      padding: "10px",
                      marginBottom: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      cursor: "move",
                    }}
                  >
                    {section.label}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {/* Optional: Button to add new sections dynamically */}
      <Button
        variant="outlined"
        onClick={() =>
          setSections([
            ...sections,
            {
              id: `${sections.length + 1}`,
              label: `New Section ${sections.length + 1}`,
            },
          ])
        }
      >
        Add Section
      </Button>
    </DragDropContext>
  );
};

export default ResumeTemplate;
