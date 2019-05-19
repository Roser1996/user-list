import React, { Component } from 'react';
import './Home.css';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { getUsersAction } from '../../redux/actions/getUsers';
import { deleteUserAction } from '../../redux/actions/deleteUser';

const style = {
  paper: {
    overflowX: 'auto'
  },
  tableHeader: {
    color: '#130f40',
    fontWeight: 'bold',
    fontSize: 'medium'
  },
  textField: {
    width: '30%',
  },
  icon: {
    marginRight: '20%'
  },
  button: {
    width: '20%',
    backgroundColor: '#2ed573',
    color: '#fff'
  },
  userText: {
    marginLeft: '5%'
  }
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0,
      loading: true,
      users: []
    }
  }

  componentDidMount() {
    this.props.getUserList();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    console.log(event.target.value);
    this.setState({ page: 0, rowsPerPage: event.target.value });
  }

  handleDeleteBtn = userId => {
    this.props.deleteUserById(userId);
  }

  // componentWillUpdate() {
  //   this.setState({users: this.props.userList.data});
  // }

  render() {
    const { rowsPerPage, page } = this.state;
    const { userList } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, userList.data.length - page * rowsPerPage);

    return (
      <div className="home">
        <h1 className="header">Users</h1>
        <div className="text">
          <TextField 
            label='Search'
            style={style.textField}
            placeholder='Type a name'
            variant='outlined'
          />
        </div>
        <div className="table">
          <Paper style={style.paper}>
            {
              userList.isGetLoading ? <div>loading...</div> : 
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={style.tableHeader} align="center">First Name</TableCell>
                    <TableCell style={style.tableHeader} align="center">Last Name</TableCell>
                    <TableCell style={style.tableHeader} align="center">Gender</TableCell>
                    <TableCell style={style.tableHeader} align="center">Age</TableCell>
                    <TableCell style={style.tableHeader} align="center">Edit</TableCell>
                    <TableCell style={style.tableHeader} align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    userList.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((elem, index) => (
                      <TableRow key={elem.id}>
                        <TableCell align="center">{elem.firstName}</TableCell>
                        <TableCell align="center">{elem.lastName}</TableCell>
                        <TableCell align="center">{elem.gender}</TableCell>
                        <TableCell align="center">{elem.age}</TableCell>
                        <TableCell align="center">
                          <Link to={`/edit/${elem.id}`} className="link">
                            <Button variant="contained" color="primary">
                              <div style={style.icon}>Edit</div>
                              <i class="fas fa-pencil-alt"></i>
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="secondary" onClick={() => this.handleDeleteBtn(elem.id)}>
                            <div style={style.icon}>Delete</div>
                            <i class="fas fa-trash-alt"></i>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination 
                      rowsPerPageOptions={[5, 10, 25]}
                      count={userList.data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            }
          </Paper>
        </div>
        <div className="create">
          <Link to='/create' className="link">
            <Button variant="contained" style={style.button}>
              <i class="fas fa-user-plus"></i>
              <div  style={style.userText}>Create New User</div>
            </Button>
          </Link>
        </div>
        <div>
          {this.state.loading && <div>loading...</div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userList: state.getUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(getUsersAction());
    },
    deleteUserById: (id) => {
      dispatch(deleteUserAction(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));