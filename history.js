import React from 'react';

class HistoryTable extends React.Component {
  
    
constructor(props) {
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
    const student_id = window.location.pathname.replace("/history","")
    fetch(`http://localhost:8000/history/${student_id}`, requestSettings)
    .then(response => response.json())
    .then(data => {
        this.setState({membershop: data});
    })
    .catch((error) =>{
        console.error('Error:', error)
    });
}

componentDidMount() {
    this.getData();
}
getHistoryTable() {
    let HistoryComponents = [];
    let firstRow = (
        <tr>
            <th>Student ID</th>
            <th>Class Name</th>
            <th>Class ID</th>
            <th>Class Subject</th>
            <th>Class Grade</th>


        </tr>
    );
    HistoryComponents.push(firstRow);

     for (const History of this.state.membership) 
    {

        let newRow = (
            <tr>
            <th>{History[0]}</th>
            <th>{History[1]}</th>
            <th>{History[2]}</th>
            <th>{History[3]}</th>
            <th>{History[4]}</th>

            
  
          </tr> 
        );
        HistoryComponents.push(newRow)
    }

    return <div>
          <button type="button" onClick={() =>{window.location.replace(`/`)}}> Go Home </button>
          <table>
        {HistoryComponents}
      </table>
      </div>
    
    
    }

    render() {
        return this.getHistoryTable()
    }
}
export default HistoryTable;