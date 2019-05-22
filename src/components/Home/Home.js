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
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  },
  progressBar: {
    margin: "auto",
    marginLeft: "50%"
  }
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0,
      loading: true,
      searchText: "",
      users: [],
      headerRows: [
        { id: "firstName", numeric: false, disablePadding: true, label: "First Name"},
        { id: "lastName", numeric: false, disablePadding: true, label: "Last Name"},
        { id: "gender", numeric: false, disablePadding: true, label: "Gender"},
        { id: "age", numeric: true, disablePadding: false, label: "Age"},
      ],
      order: "asc",
      orderBy: "firstName"
    }
  }

  componentDidMount() {
    this.props.getUserList(() => {
      this.setState({ users: this.props.userList.data});
    });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    console.log(event.target.value);
    this.setState({ page: 0, rowsPerPage: event.target.value });
  }

  handleDeleteBtn = userId => {
    this.props.deleteUserById(userId, () => {
      this.setState({ users: this.props.userList.data });
    });
  }

  handleChangeSearchField = event => {
    const { data } = this.props.userList
    let str = event.target.value;
    this.setState({ searchText: event.target.value });
    this.setState({ users: data.filter(elem => {
      return elem.firstName.toUpperCase().includes(str.toUpperCase()) || 
        elem.lastName.toUpperCase().includes(str.toUpperCase());
    })});
  }

  handleSortRequest = (rowId) => {
    const orderBy = rowId;
    let order = 'desc';

    if (this.state.orderBy === rowId && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  render() {
    const { rowsPerPage, page, searchText, users, headerRows, order, orderBy } = this.state;
    const { userList } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    return (
      <div className="home">
        <h1 className="header">Users</h1>
        <div className="text">
          <TextField 
            style={style.textField}
            autoFocus={true}
            label='Search'
            placeholder='Type a name'
            variant='outlined'
            value={searchText}
            onChange={this.handleChangeSearchField}
          />
        </div>
        <div className="table">
          <Paper style={style.paper}>
            {
              userList.isLoading ?
              <div className="progress">
                <CircularProgress style={style.progressBar} />
              </div> : 
              <Table>
                <TableHead>
                  <TableRow>
                    {
                      headerRows.map(row => (
                        <TableCell
                          style={style.tableHeader}
                          key={row.id}
                          align="center"
                          padding={row.disablePadding ? "none": "default" }
                          sortDirection={orderBy === row.id ? order: false}
                        >
                          <Tooltip
                            title="Sort"
                            placement={row.numeric ? "bottom-end": "bottom-start"}
                            enterDelay={300}
                          >
                            <TableSortLabel 
                              active={orderBy === row.id}
                              direction={order}
                              onClick={() => this.handleSortRequest(row.id)}
                            >
                              {row.label}
                            </TableSortLabel>
                          </Tooltip>
                        </TableCell>
                      ))
                    }
                    <TableCell style={style.tableHeader} align="center">Edit</TableCell>
                    <TableCell style={style.tableHeader} align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    stableSort(users, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((elem, index) => (
                      <TableRow key={elem.id} hover>
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
                      count={users.length}
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
    getUserList: (callback) => {
      dispatch(getUsersAction(callback));
    },
    deleteUserById: (id, callback) => {
      dispatch(deleteUserAction(id, callback));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));