import React from 'react';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

function mapStateToProps(state) {
    return {
        data: state.data,
        records: state.data.data,
        token: state.auth.token,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends React.Component {
    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const token = this.props.token;
        this.props.fetchProtectedData(token);
    }

    render() {  

    return (
        <div>
            {!this.props.loaded
                ? <h1>Loading data...</h1>
                :
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>ID</TableHeaderColumn>
                      <TableHeaderColumn>Start DateTime</TableHeaderColumn>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Category</TableHeaderColumn>
                      <TableHeaderColumn>Duration, min</TableHeaderColumn>
                      <TableHeaderColumn>Finish DateTime</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                  {
                    this.props.records.map((row, index) => (
                      <TableRow key={index}>
                        <TableRowColumn>{ index+1 }</TableRowColumn>
                        <TableRowColumn>{ moment(row.dt_start).format('DD-MM-YYYY hh:mm') }</TableRowColumn>
                        <TableRowColumn>{ row.name }</TableRowColumn>
                        <TableRowColumn>{ row.category }</TableRowColumn>
                        <TableRowColumn>{ moment(row.dt_finish).diff( moment(row.dt_start), 'minutes') }</TableRowColumn>
                        <TableRowColumn>{ moment(row.dt_finish).format('DD-MM-YYYY hh:mm') }</TableRowColumn>
                      </TableRow>
                    ))
                  }

                </TableBody>
                </Table>
            }
        </div>
    );
    }
}

Dashboard.propTypes = {
    fetchProtectedData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
};
