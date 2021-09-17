import React from 'react';
import {Link} from 'react-router-dom';
class RosterTable extends React.Component {

    constructor(props) {
      console.log("Loading rosterTable")
      super(props);
      this.state = {membership: []};
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
      const class_id = window.location.pathname.replace("/roster/", "")
      console.log('sending get request to get Roster...'+ class_id)
      fetch(`http://localhost:8000/memberships/${class_id}`, requestSettings)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.setState({membership: data});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  
    componentDidMount() {
      this.getData();
    }
    getRosterTable() {
      let RosterComponents = [];
      let firstRow = (
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Student ID</th>


          

          
        </tr>
      );
      RosterComponents.push(firstRow);
      console.log('this is the Roster: ' + this.state.membership);
  
      for (const Roster of this.state.membership) {
        console.log('adding new row of classes')
        let newRow = (
          <tr>
            <th>{Roster[0]}</th>
            <th>{Roster[1]}</th>
            <th><Link to={`/history/${Roster[2]}`}>{Roster[2]}</Link></th>
            
  
          </tr>
        );
        RosterComponents.push(newRow)
      }
      
      return <div>
          <button type="button" onClick={() =>{window.location.replace(`/`)}}> Go Home </button>
          <table>
        {RosterComponents}
      </table>
      </div>

    }

    render() {
      return this.getRosterTable()
    }
}
export default RosterTable;
