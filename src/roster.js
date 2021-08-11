import React from 'react';

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
      const class_name = window.location.pathname.replace("/roster/", "")
      console.log('sending get request to get Roster...'+ class_name)
      fetch(`http://localhost:8000/memberships/${class_name}`, requestSettings)
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
            
  
          </tr>
        );
        RosterComponents.push(newRow)
      }
  
      return <table>
        {RosterComponents}
      </table>

    }

    render() {
      return this.getRosterTable()
    }
}
export default RosterTable;
