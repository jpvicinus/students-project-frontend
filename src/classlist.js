import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
class ClassListTable extends React.Component {

    constructor(props) {
      console.log("ClassListTable")
      super(props);
      this.state = {classinfo: []};
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
      console.log('sending get request to get classes...')
      fetch('http://localhost:8000/class', requestSettings)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.setState({classinfo: data});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  
    componentDidMount() {
      this.getData();
    }
    
    getClassTable() {
      let classComponents = [];
      let firstRow = (
        <tr>
          <th>Class Name</th>
          <th>Grade</th>
          <th>Subject</th>
          <th>Size per Class</th>
          <th>Class ID</th>
  
        </tr>
      );
      classComponents.push(firstRow);
      console.log('these are the classes: ' + this.state.classinfo);
  
      for (const classes of this.state.classinfo) {
        console.log('adding new row of classes')
        let newRow = (
          <tr>
            <th><Link to={`/roster/${classes[0]}`}>{classes[0]}</Link></th>
            <th>{classes[1]}</th>
            <th>{classes[2]}</th>
            <th>{classes[3]}</th>
            <th>{classes[4]}</th>
  
          </tr>
        );
        classComponents.push(newRow)
      }
  
      return <div>
          <button type="button" onClick={() =>{window.location.replace(`/`)}}> Go Home </button>
          <table>
        {classComponents}
      </table>
      </div>
    }

    render() {
        return this.getClassTable() 
    }

}

export default ClassListTable;
