import './App.css';
import ClassListTable from './classlist.js';
import RosterTable from './roster.js';
import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {students: []};
  }

  getData() {
    const requestSettings = {
      method: 'GET',
      redirect: "follow",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log('sending get request to get students...')
    fetch('http://localhost:8000/students', requestSettings)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({students: data});
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  componentDidMount() {
    this.getData();
  }
  
  getStudentsTable(grade) {
    console.log("the grade is" + grade)
    let studentComponents = [];
    let firstRow = (
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Student ID</th>
        <th>Grade</th>
      </tr>
    );
    studentComponents.push(firstRow);
    console.log('these are the students: ' + this.state.students);
    
    let students = this.state.students 
    if (grade && parseInt(grade)) {
      students = this.state.students.filter(s => s[3] === parseInt(grade))
    }

    for (const student of students) {
      console.log('adding new row of students')
      let newRow = (
        <tr>
          <th>{student[0]}</th>
          <th>{student[1]}</th>
          <th>{student[2]}</th>
          <th>{student[3]}</th>
        </tr>
      );
      studentComponents.push(newRow)
    }

    return <table>
      {studentComponents}
    </table>
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              <header className="App-header">
                Schedule Assistant
                <Link to="/students">Students List</Link>
                <Link to="/class">Class List</Link>
                <form>
                Enter the name of the class
                <input id="nameofclass" type="text" name="nameofclass" onKeyPress={(event,value) => {
                  console.log("We entered value " + event.key)
                  const classname =  document.getElementById("nameofclass").value;
                  console.log("the value is:"+ classname)
                  if (event.key === "Enter"){
                    event.preventDefault()
                    event.stopPropagation()
                    window.location.replace(`/roster/${classname}`)
                  }
                }}/>
                </form>
                <button type="button" onClick={() =>{
                  window.location.replace(`/students/9`)
                }}>Grade 9</button>
                
              </header>
            }
          />
          <Route
            path="/students/9"
            exact 
            render={() =>
              this.getStudentsTable(9)
            } 
          />
          <Route
            path="/students"
            exact 
            render={() =>
              this.getStudentsTable()
            } 
          />
          <Route
            path="/class"
            exact 
            render={() =>
              <ClassListTable/> 
            }
            />
          <Route
            path="/roster/:id" 
            render={() =>
              <RosterTable/> 
            }
            />

        </Switch>
      </div>
    );
  } 
}

export default App;
