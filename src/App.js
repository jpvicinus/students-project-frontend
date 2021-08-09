import './App.css';
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
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              <header className="App-header">
                Schedule Assistant
                <Link to="/students">Students List</Link>
              </header>
            }
          />
          <Route
            path="/students"
            exact 
            render={() =>
              this.getStudentsTable()
            }
          />
        </Switch>
      </div>
    );
  }
  
}

export default App;
