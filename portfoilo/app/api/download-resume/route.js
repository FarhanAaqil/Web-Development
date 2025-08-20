import { NextResponse } from "next/server"

export async function GET() {
  try {
    // For now, we'll return a simple text response
    // In a real implementation, you would generate a PDF here
    const resumeContent = `
FARHAN AAQIL DURRANI
Mahbubnagar | fadurrani543@gmail.com | +91-6300825009 | linkedin.com/in/farhan-aaqil

PROFESSIONAL SUMMARY
Dynamic and detail-oriented B.Tech student in Artificial Intelligence & Machine Learning with strong foundations in data science, machine learning, and software development. Experienced in building AI-driven applications and full-stack web solutions using Python, JavaScript, C++, and C. Skilled in problem-solving, teamwork, and delivering efficient, user-friendly technology solutions.

EDUCATION
Jayaprakash Narayan College of Engineering
Bachelor of Technology – Artificial Intelligence & Machine Learning
2023 – 2027

Prathibha Junior College
Intermediate (MPC), Marks: 82%
2020 – 2022

Jamia Darul Huda High School
SSC, Marks: 10/10 GPA
2020

TECHNICAL SKILLS
Programming Languages: JavaScript, Python, Java, C++, C
Web Development:
- Frontend: HTML, CSS, JavaScript
- Backend: React.js, Node.js, Express.js
- Database: MongoDB
- APIs: RESTful APIs
Machine Learning Tools: Scikit-learn, Pandas, NumPy, Matplotlib
Concepts: Object-Oriented Programming (OOP), Responsive Web Design, CRUD Operations

PROJECTS
Diabetes Prediction Using Python (Machine Learning)
• Developed a machine learning model using Logistic Regression and Decision Trees
• Evaluated performance using accuracy score and confusion matrix
• Achieved an accuracy of 78%

Markdown Editor (HTML/CSS/JavaScript)
• Built a lightweight markdown editor with live preview functionality
• Implemented export to plain text feature
• Used HTML for structure, CSS for styling, and JavaScript for dynamic behavior

Stock Market Prediction Using Python (Machine Learning)
• Designed system to forecast stock prices using historical data
• Implemented regression and time series analysis techniques
• Achieved prediction accuracy of 92% using Pandas and Scikit-learn

AI-Powered Reverse Coding Engine (Python + ML)
• Created NLP tool that interprets problem statements and generates Python code
• Utilized NLP models and ML algorithms for code generation
• Achieved 80% success rate in generating correct code snippets

CERTIFICATIONS
• C++ Programming, SkillUp
• Python for Data Analysis, SkillUp
• Database Management Systems (DBMS), NPTEL

RESEARCH PUBLICATION
Diabetes Prediction System Using Machine Learning
2025
Published in the Journal of Advancement in Parallel Computing, Volume 08, Issue 02
Published by HBRP Publication Pvt. Ltd.
• Explores application of ML techniques for diabetes prediction
• Demonstrates commitment to AI-driven healthcare solutions
    `

    return new NextResponse(resumeContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": 'attachment; filename="Farhan_Aaqil_Durrani_Resume.txt"',
      },
    })
  } catch (error) {
    console.error("Error generating resume:", error)
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}
