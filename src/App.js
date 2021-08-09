//import logo from './logo.svg';
import './App.css';
import React from 'react';
//import axios from 'axios';

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

  getStudentsTable() {
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

    for (const student of this.state.students) {
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
        <header className="App-header">
          
          Schedule Assistant

          {this.getStudentsTable()}

        </header>
      
      </div>
    );
  }
  
}

export default App;
