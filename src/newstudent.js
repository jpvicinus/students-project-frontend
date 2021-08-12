import React from 'react';

class NewStudent extends React.Component {

    constructor(props) {
      console.log("newstudent loading")
      super(props);
    }
  
    submitData() {
      const newclassdata = {
        first_name: document.getElementById("firstname").value,
        last_name: document.getElementById("lastname").value,
        student_grade: document.getElementById("grade").value,
        
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
      fetch(`http://localhost:8000/students`, requestSettings)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.replace(`/students`);
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
                First Name
                <input id="firstname" type="text" name="firstname" />
                </form>
                <br></br>
            <form>
                Last Name
                <input id="lastname" type="text" name="lastname" />
                </form>
                <br></br>
            <form>
                Grade
                <input id="grade" type="text" name="grade" />
                </form>
                <br></br>
            
                <br></br>
            <button type="submit" onClick={this.submitData}>Submit </button>
          </div>
      )
    }
}
export default NewStudent;


