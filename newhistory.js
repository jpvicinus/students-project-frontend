import React from 'react';

class NewStudentHistory extends React.Component {

    constructor(props) {
      console.log("newstudenthistory loading")
      super(props);
    }
  
    submitData() {
        const newhistorydata = {
            student_id: document.getElementById("studentid").value,
            class_name: document.getElementById("classname").value,
            class_id: document.getElementById("classid").value,
            class_subject: document.getElementById("classsubject").value,
            class_grade: document.getElementById("classgrade").value,
        
        };
      const requestSettings = {
        method: 'POST',
        redirect: "follow",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newhistorydata)
      };
      console.log('sending post request...')
      fetch(`http://localhost:8000/newhistory`, requestSettings)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.replace(`/history`);
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
                Student ID
                <input id="studentid" type="text" name="studentid" />
                </form>
                <br></br>
                <form>
                Class Name
                <input id="classname" type="text" name="classname" />
                </form>
                <br></br>
                <form>
                Class ID
                <input id="classid" type="text" name="classid" />
                </form>
                <br></br>
                <form>
                Class Subject
                <input id="classsubject" type="text" name="classsubject" />
                </form>
                <br></br>
                <form>
                Class Grade
                <input id="classgrade" type="text" name="classgrade" />
                </form>
                <br></br>
            
                <br></br>
                <br></br>
            <button type="submit" onClick={this.submitData}>Submit </button>
          </div>
      )
    }
}
export default NewStudentHistory;


