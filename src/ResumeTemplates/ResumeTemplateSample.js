import React, { useState } from "react";

const ResumeTemplate = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Dynamic Resume Template",
      fields: {
        personalDetails: {
          label: "Personal Details",
          fields: [
            { key: "firstname", label: "First Name", type: "text", value: "John" },
            { key: "lastname", label: "Last Name", type: "text", value: "Doe" },
            { key: "email", label: "Email", type: "email", value: "john.doe@example.com" },
            { key: "phone", label: "Phone", type: "text", value: "1234567890" },
            { key: "photo", label: "Photo", type: "file", value: null }
          ]
        },
        summary: {
          label: "Summary",
          fields: [
            { key: "summary", label: "Professional Summary", type: "textarea", value: "Experienced developer with a passion for building scalable applications." }
          ]
        },
        skills: {
          label: "Skills",
          fields: [
            { key: "skills", label: "Skill List", type: "list", value: ["JavaScript", "React", "Node.js"] }
          ]
        }
      },
      stepsOrder: ["personalDetails", "summary", "skills"],
      styles: {
        bgColor: "#f4f4f4",
        textColor: "#333333",
        fontFamily: "Arial, sans-serif",
        headingSize: "16pt",
        textSize: "12pt",
        sectionSpacing: "10px",
        lineSpacing: "1.5"
      }
    }
  ]);

  const handleFieldUpdate = (templateId, sectionKey, fieldKey, newValue) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.id === templateId) {
          const updatedFields = { ...template.fields };
          updatedFields[sectionKey].fields = updatedFields[sectionKey].fields.map((field) =>
            field.key === fieldKey ? { ...field, value: newValue } : field
          );
          return { ...template, fields: updatedFields };
        }
        return template;
      })
    );
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Form Section */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        {templates.map((template) => (
          <div key={template.id}>
            <h2>{template.name}</h2>
            {template.stepsOrder.map((sectionKey) => (
              <div key={sectionKey} style={{ marginBottom: "20px" }}>
                <h4>{template.fields[sectionKey].label}</h4>
                {template.fields[sectionKey].fields.map((field) => (
                  <div key={field.key} style={{ marginBottom: "10px" }}>
                    <label>{field.label}: </label>
                    {field.type === "text" || field.type === "email" ? (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => handleFieldUpdate(template.id, sectionKey, field.key, e.target.value)}
                        style={{ padding: "5px", width: "100%" }}
                      />
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={field.value}
                        onChange={(e) => handleFieldUpdate(template.id, sectionKey, field.key, e.target.value)}
                        style={{ padding: "5px", width: "100%", height: "80px" }}
                      />
                    ) : field.type === "list" ? (
                      <ul>
                        {field.value.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        {templates.map((template) => {
          const { fields, styles, stepsOrder } = template;

          const containerStyle = {
            backgroundColor: styles.bgColor,
            color: styles.textColor,
            fontFamily: styles.fontFamily,
            padding: "20px",
            lineHeight: styles.lineSpacing
          };

          const headingStyle = {
            fontSize: styles.headingSize,
            marginBottom: styles.sectionSpacing
          };

          return (
            <div key={template.id} style={containerStyle}>
              <h2 style={{ ...headingStyle, textAlign: "center" }}>{template.name}</h2>
              {stepsOrder.map((sectionKey) => (
                <div key={sectionKey} style={{ marginBottom: styles.sectionSpacing }}>
                  <h4 style={headingStyle}>{fields[sectionKey].label}</h4>
                  {fields[sectionKey].fields.map((field) => (
                    <div key={field.key}>
                      {field.type === "list" ? (
                        <ul>
                          {field.value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{field.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeTemplate;
