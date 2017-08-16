import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const data = [
{   
id: '1',
dt_start:   '2017-08-15 7:27',
duration:   '1:01',
category:   'Health',
name:   'Morning Exrcise',
dt_finish: '2017-08-04 8:28' 
},
{   
id: '2',
dt_start:   '2017-08-04 8:28',
duration:   '0:32',
category:   'Health',
name:   'Bath',
dt_finish:  '2017-08-04 9:00'
},  
{   
id: '3',
dt_start:   '2017-08-04 9:00',
duration:   '0:45',
category:   'Food',
name:   'Breakfast',
dt_finish:  '2017-08-04 9:45'
},  
{   
id: '4',
dt_start:   '2017-08-04 9:45',
duration:   '0:45',
category:   'Education',
name:   'Java Homework',
dt_finish:  '2017-08-04 10:30'
},  
{   
id: '5',
dt_start:   '2017-08-04 10:30',
duration:   '1:50',
category:   'Health',
name:   'Gym',
dt_finish:  '2017-08-04 12:20'
},  
{   
id: '6',
dt_start:   '2017-08-04 12:20',
duration:   '0:20',
category:   'Food',
name:   'Snacks',
dt_finish:  '2017-08-04 12:40'
},  
{   
id: '7',
dt_start:   '2017-08-04 12:40',
duration:   '1:12',
category:   'Relationships',
name:   'Friends',
dt_finish:  '2017-08-04 13:52'
},  
{   
id: '8',
dt_start:   '2017-08-04 13:52',
duration:   '0:08',
category:   'Free Time',
name:   'Break',
dt_finish:  '2017-08-04 14:00'
},  
{   
id: '9',
dt_start:   '2017-08-04 14:00',
duration:   '5:00',
category:   'Education',
name:   'Agile Homework',
dt_finish:  '2017-08-04 19:00'
},  
{   
id: '10',
dt_start:   '2017-08-04 19:00',
duration:   '0:20',
category:   'Transportation',
name:   'In the car',
dt_finish:  '2017-08-04 19:20'
},  
{   
id: '11',
dt_start:   '2017-08-04 19:20',
duration:   '0:40',
category:   'Food',
name:   'Dinner',
dt_finish:  '2017-08-04 20:00'
},  
{   
id: '12',
dt_start:   '2017-08-04 20:00',
duration:   '1:20',
category:   'Transportation',
name:   'In the car',
dt_finish:  '2017-08-04 21:20'
},  
{   
id: '13',
dt_start:   '2017-08-04 21:20',
duration:   '1:54',
category:   'Entertainment',
name:   'Dance',
dt_finish:  '2017-08-04 23:14'
},  
{   
id: '14',
dt_start:   '2017-08-04 23:14',
duration:   '0:04',
category:   'Free Time',
name:   'Break',
dt_finish:  '2017-08-04 23:18'
},  
{   
id: '15',
dt_start:   '2017-08-04 23:18',
duration:   '0:40',
category:   'Relationships',
name:   'Talks',
dt_finish:  '2017-08-04 23:58'
},  
{   
id: '16',
dt_start:   '2017-08-04 23:58',
duration:   '0:39',
category:   'Free Time',
name:   'Break',
dt_finish:  '2017-08-05 0:37'
},  
{   
id: '17',
dt_start:   '2017-08-05 0:37',
duration:   '7:47',
category:   'Health',
name:   'Sleep',
dt_finish:  '2017-08-05 8:24'
}
];

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const DataTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Start DateTime</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Category</TableHeaderColumn>
        <TableHeaderColumn>Duration</TableHeaderColumn>
        <TableHeaderColumn>Finish DateTime</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>

    {data.map( (row, index) => (
      <TableRow key={index}>
        <TableRowColumn>{row.id}</TableRowColumn>
        <TableRowColumn>{row.dt_start}</TableRowColumn>
        <TableRowColumn>{row.name}</TableRowColumn>
        <TableRowColumn>{row.category}</TableRowColumn>
        <TableRowColumn>{row.duration}</TableRowColumn>
        <TableRowColumn>{row.dt_finish}</TableRowColumn>
      </TableRow>
      ))}

    </TableBody>
  </Table>
);

@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="col-md-12">
                <h1>Dashboard</h1>
                <hr />
                <DataTable />
            </div>
        );
    }
}

export default Dashboard;
