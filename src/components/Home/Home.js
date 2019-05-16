import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
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

const data = [
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 6, firstName: "llj", lastName: "Gan", gender: "Male",  age: 23},
  {id: 7, firstName: "lli", lastName: "Gan", gender: "Male",  age: 23},
  {id: 8, firstName: "green", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "renee", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 1, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 2, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 3, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 4, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
  {id: 5, firstName: "Rui", lastName: "Gan", gender: "Male",  age: 23},
]

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    console.log(event.target.value);
    this.setState({ page: 0, rowsPerPage: event.target.value });
  }

  render() {
    const { rowsPerPage,page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
                  data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((elem, index) => (
                    <TableRow key={elem.id}>
                      <TableCell align="center">{elem.firstName}</TableCell>
                      <TableCell align="center">{elem.lastName}</TableCell>
                      <TableCell align="center">{elem.gender}</TableCell>
                      <TableCell align="center">{elem.age}</TableCell>
                      <TableCell align="center">
                        <Link to='/edit' className="link">
                          <Button variant="contained" color="primary">
                            <div style={style.icon}>Edit</div>
                            <i class="fas fa-pencil-alt"></i>
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="secondary">
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
                    count={data.length}
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

export default Home;