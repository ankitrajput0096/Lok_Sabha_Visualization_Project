import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.content}>
        <h10>&copy; {new Date().getFullYear()} Visualization Project. All rights reserved.</h10>
        <br></br>
        <h10>Abhay Jogenipalli | Hemanth Koneti | Ron George | Ankit Rajput | Pushkar Talwalkar</h10>
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    backgroundColor: "#f8f9fa",
    padding: "20px 0",
    textAlign: "center",
    borderTop: "1px solid #ddd",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  links: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    margin: "0 5px",
  },
  separator: {
    margin: "0 5px",
    color: "#888",
  },
};

export default Footer;
