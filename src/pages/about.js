import React from 'react';

function About() {
  return (
    <div>
      <h1 className='stats-title'>About</h1>
      <p>My project is based on the following report and data linked below:</p>
      <p>To summarize, the report is a study done with two friends,  measuring the accuracy of how well users measured certain words,
         with similar conditions and experiment set-up. 
      </p>

      <iframe title="report" style={styles.report} src="https://docs.google.com/document/d/1AZ744pIZhvrnZTRSPSkOiJHEEuLdzeIDDuh7SMgZjsw/edit?tab=t.0"></iframe>

      <a href="https://docs.google.com/spreadsheets/d/10sIQ44Zm_Yk1Ob8v1lmkN0InK4ypkwnqDSVQdz5T6mY/edit?gid=0#gid=0">Data used (Google Sheets link)</a>
    </div>
  );
}

export default About;


const styles = {
  report: {
    width: "100%",       /* full container width */
    height: "700px",     /* or any fixed/relative value */
    position: "relative",/* ensures child 100% height works */
  },
}