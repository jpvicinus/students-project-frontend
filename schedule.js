import React from 'react';

class SchedTable extends React.Component {

    constructor(props) {
      console.log("Loading StuSchedTable")
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
      const student_id = window.location.pathname.replace("/schedule/", "")
      console.log('sending get request to get schedule...'+ student_id)
      fetch(`http://localhost:8000/membership/schedule/${student_id}`, requestSettings)
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
    getSchedTable() {
      let SchedComponents = [];
      let firstRow = (
        <tr>
          <th>Class Name</th>
          
        </tr>
      );
      SchedComponents.push(firstRow);
      console.log('this is the Schedule: ' + this.state.membership);
  
      for (const Sched of this.state.membership) {
        console.log('showing schedule')
        let newRow = (
          <tr>
            <th>{Sched[0]}</th>
          </tr>
        );
        SchedComponents.push(newRow)
      }
  
      return <div>
          <button type="button" onClick={() =>{window.location.replace(`/`)}}> Go Home </button>
          <table>
        {SchedComponents}
      </table>
      </div>

    }

    render() {
      return this.getSchedTable()
    }
}
export default SchedTable;