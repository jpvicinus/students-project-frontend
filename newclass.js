import React from 'react';
import SubjectList from './subjectlist.js';

class NewClass extends React.Component {

    constructor(props) {
      console.log("newclass loading")
      super(props);
    }
  
    submitData() {
      const newclassdata = {
        class_name: document.getElementById("classname").value,
        class_grade: document.getElementById("grade").value,
        class_subject: document.getElementById("subject").value,
        class_size: document.getElementById("maxindividualclasssize").value,
        max_students: document.getElementById("maxtotalenrollment").value,
        class_section: document.getElementById('classsection').value
       };
       
      const requestSettings = {
        method: 'POST',
        redirect: "follow",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(newclassdata)
      };
      console.log('sending post request...')
      fetch(`http://localhost:8000/class/new`, requestSettings)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.replace(`/class`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    render() {
      return (
          <div>
            <button type="button" onClick={() =>{window.location.replace(`/`)}}> Go Home </button>
            <br></br>
            <br></br>
            <br></br>
            <form>
                Class Name
                <input id="classname" type="text" name="classname" />
                </form>
                <br></br>
            <form>
                Grade
                <input id="grade" type="text" name="grade" />
                </form>
                <br></br>
            <form>
                Subject
                <input id="subject" type="text" name="subject" />
                </form>
                <br></br>
            <form>
                Max Individual Class Size
                <input id="maxindividualclasssize" type="text" name="maxindividualclasssize" />
                </form>
                <br></br>
            <form>
                Max Total Enrollment
                <input id="maxtotalenrollment" type="text" name="maxtotalenrollment" />
                </form>
                <br></br>
                <form>
                Class Section
                <input id="classsection" type="text" name="classsection" />
                </form>
                <br></br>
               
            
                <br></br>
            
            <button type="submit" onClick={this.submitData}>Submit </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <SubjectList></SubjectList>
          </div>
      )
    }
}
export default NewClass;


