"use client";

import React, { useState, useEffect } from "react";

// Define a type for resumeData
type ResumeData = {
  name: string;
  phoneNumber: string;
  gmail: string;
  address: string;
  education: string;
  workExperience: string;
  skills: string;
  picture: string;
};

export default function Page() {
  // Initialize state with default values
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "John Doe",
    phoneNumber: "123-456-7890",
    gmail: "john.doe@example.com",
    address: "123 Main St, Cityville, Country",
    education: "Bachelor's in Computer Science - XYZ University",
    workExperience: "Software Developer at ABC Corp",
    skills: "JavaScript, React, Next.js, TypeScript",
    picture: "",
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  // Update the resumeData in state and save it to localStorage
  const handleUpdate = (key: keyof ResumeData, value: string) => {
    const updatedData = { ...resumeData, [key]: value };
    setResumeData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        handleUpdate("picture", imageData);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Reset the resume data to default values
  const resetResume = () => {
    const initialData: ResumeData = {
      name: "John Doe",
      phoneNumber: "123-456-7890",
      gmail: "john.doe@example.com",
      address: "123 Main St, Cityville, Country",
      education: "Bachelor's in Computer Science - XYZ University",
      workExperience: "Software Developer at ABC Corp",
      skills: "JavaScript, React, Next.js, TypeScript",
      picture: "",
    };
    setResumeData(initialData);
    localStorage.setItem("resumeData", JSON.stringify(initialData));
  };

  // Render editable fields with placeholders
  const renderEditableText = (key: keyof ResumeData, placeholder: string) => {
    return (
      <p
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => handleUpdate(key, e.currentTarget.innerText)}
        className="editable"
        style={{
          outline: "none",
          borderBottom: "1px solid #90caf9",
          padding: "5px",
          color:
            resumeData[key] === placeholder || resumeData[key] === ""
              ? "#aaa"
              : "black", // Light gray for placeholder, black for user input
        }}
      >
        {resumeData[key] === placeholder || resumeData[key] === ""
          ? placeholder
          : resumeData[key]}
      </p>
    );
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        background: "linear-gradient(to bottom, #e3f2fd, #bbdefb)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Title Section */}
      <title>Editable Resume</title>
      <h1 style={{ textAlign: "center", color: "#0d47a1", fontSize: "36px", marginBottom: "20px" }}>
        My Editable Resume
      </h1>

      {/* Picture Section */}
      <div className="picture-section" style={{ textAlign: "center", marginBottom: "20px" }}>
        {resumeData.picture ? (
          <img
            src={resumeData.picture}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
          />
        ) : (
          <div
            className="picture-placeholder"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#f0f0f0",
              display: "inline-block",
              lineHeight: "120px",
              textAlign: "center",
              fontSize: "14px",
              color: "#aaa",
              margin: "0 auto",
            }}
          >
            No Picture
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
          style={{
            display: "block",
            margin: "10px auto",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Editable Sections */}
      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Name</h3>
        {renderEditableText("name", "Enter your name")}
      </div>

      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Phone Number</h3>
        {renderEditableText("phoneNumber", "Enter your phone number")}
      </div>

      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Gmail</h3>
        {renderEditableText("gmail", "Enter your email")}
      </div>

      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Address</h3>
        {renderEditableText("address", "Enter your address")}
      </div>

      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Education</h3>
        {renderEditableText("education", "Enter your education details")}
      </div>

      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Work Experience</h3>
        {renderEditableText("workExperience", "Enter your work experience")}
      </div>

      <div className="section" style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#0d47a1" }}>Skills</h3>
        {renderEditableText("skills", "Enter your skills")}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetResume}
        className="reset-button"
        style={{
          display: "block",
          padding: "10px 20px",
          backgroundColor: "#0d47a1",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        Reset Resume
      </button>
    </div>
  );
}