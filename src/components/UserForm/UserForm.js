import React,{ Component } from 'react';
import './UserForm.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { createUserAction } from '../../redux/actions/createUser';
import { editUserAction } from '../../redux/actions/editUser';

const style = {
  button: {
    marginTop: "1%",
    width: '10%',
    backgroundColor: '#2ed573',
    color: '#fff'
  },
  userText: {
    marginLeft: '5%'
  },
  errorMessage: {
    color: 'red'
  },
  textField: {
    width: 220,
    textAlign: 'left'
  }
}

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageAction: "",
      id: null,
      firstName: "",
      lastName: "",
      gender: "",
      age: null,
      password: "",
      rePassword: "",
      showPassword: false,
      showRePassword: false,
      firstNameError: false,
      lastNameError: false,
      genderArray: ["Male", "Female", "Unknown"],
      ageError: false,
      passwordError: false,
      rePasswordError: false,
    }
  }

  componentDidMount() {
    if (this.props.history.location.pathname === '/create') {
      this.setState({ pageAction: "create"});
    }
    else {
      this.setState({ pageAction: "edit" });
      this.setState({ id: this.props.id});
    }
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  handleClickShowRePassword = () => {
    this.setState({showRePassword: !this.state.showRePassword});
  }

  handleChange = prop => event => {
    let value = event.target.value;
    if (prop === 'firstName') {
      let regex = /[\W\d]+/;
      if (regex.test(value)) {
        // handle type error
        this.setState({firstNameError: true});
      }
      else {
        this.setState({ [prop]: value });
        this.setState({firstNameError: false});
      }
    }
    else if (prop === 'lastName') {
      let regex = /[\W\d]+/;
      if (regex.test(value)) {
        // handle type error
        this.setState({lastNameError: true});
      }
      else {
        this.setState({ [prop]: value });
        this.setState({lastNameError: false});
      }
    }
    else if (prop === 'gender') {
      this.setState({ [prop]: value});
    }
    else if (prop === 'age') {
      let regex = /[\D]+/;
      if (regex.test(value)) {
        this.setState({ ageError: true });
      }
      else {
        this.setState({ [prop]: value });
        this.setState({ ageError: false });
      }
    }
    else if (prop === 'password') {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      this.setState({ [prop]: value });
      if (regex.test(value)) {
        this.setState({ passwordError: false });
      }
      else {
        this.setState({ passwordError: true });
      }
    }
    else if (prop === 'rePassword') {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      this.setState({ [prop]: value });
      if (regex.test(value)) {
        this.setState({ rePasswordError: false });
      }
      else {
        this.setState({ rePasswordError: true });
      }
    }
    
  }

  handleClick = () => {
    const {
      pageAction,
      id,
      firstName,
      lastName,
      gender,
      age,
      password,
      rePassword,
      firstNameError,
      lastNameError,
      ageError,
      passwordError,
      rePasswordError
    } = this.state;
    if (password === rePassword && 
        !firstNameError &&
        !lastNameError &&
        gender !== "" &&
        !ageError &&
        !passwordError &&
        !rePasswordError) {
          let user = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            age: age,
            password: password
          };
          if (pageAction === "create") {
            this.props.createUser(user, () => {
              this.props.history.push('/');
            });
          }
          else {
            this.props.editUser(user, () => {
              this.props.history.push('/');
              console.log("Finish");
            });
          }
        }
    else {
      alert("Incorrect input format, please try again!");
    }
  }

  render() {

    const { 
      firstName, 
      lastName, 
      gender, 
      age, 
      password, 
      rePassword, 
      showPassword, 
      showRePassword,
      firstNameError,
      lastNameError,
      genderArray,
      ageError,
      passwordError,
      rePasswordError
    } = this.state;
    const { buttonText } = this.props;

    return (
      <div>
        <FormControl>
          <TextField 
            style={style.textField}
            label="First Name"
            placeholder="First Name"
            margin="normal"
            variant="outlined"
            value={firstName}
            onChange={this.handleChange('firstName')}
            error={firstNameError}
          />
          { 
            firstNameError && 
            <FormHelperText style={style.errorMessage}>
              Name only contains english letters!
            </FormHelperText>
          }
        </FormControl>
        <br />
        <FormControl>
          <TextField 
            style={style.textField}
            label="Last Name"
            placeholder="Last Name"
            margin="normal"
            variant="outlined"
            value={lastName}
            onChange={this.handleChange('lastName')}
            error={lastNameError}
          />
          {
            lastNameError &&
            <FormHelperText style={style.errorMessage}>
              Name only contains english letters!
            </FormHelperText>
          }
        </FormControl>
        <br />
        <FormControl>
          <TextField
            style={style.textField}
            label="Gender"
            select
            placeholder="Gender"
            margin="normal"
            variant="outlined"
            value={gender}
            onChange={this.handleChange('gender')}
          >
          {
            genderArray.map((elem, index) => (
              <MenuItem key={index} value={elem}>
                {elem}
              </MenuItem>
            ))
          }
          </TextField>
        </FormControl>
        <br />
        <FormControl>
          <TextField 
            style={style.textField}
            label="Age"
            placeholder="Age"
            margin="normal"
            variant="outlined"
            value={age}
            onChange={this.handleChange('age')}
          />
          {
            ageError && 
            <FormHelperText style={style.errorMessage}>
              Age should be an positive integer!
            </FormHelperText>
          }
        </FormControl>
        <br />
        <FormControl>
          <TextField 
            style={style.textField}
            label="Password"
            placeholder="Password"
            margin="normal"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {
            passwordError &&
            <FormHelperText style={style.errorMessage}>
              Password should at least 8 characters!
            </FormHelperText>
          }
        </FormControl>
        <br />
        <FormControl>
          <TextField 
            style={style.textField}
            label="Pepeat Password"
            placeholder="Repeat Passowrd"
            margin="normal"
            variant="outlined"
            type={showRePassword ? 'text' : 'password'}
            value={rePassword}
            onChange={this.handleChange('rePassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowRePassword}
                  >
                    {showRePassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {
            rePasswordError &&
            <FormHelperText style={style.errorMessage}>
              Password should at least 8 characters!
            </FormHelperText>
          }
        </FormControl>
        <br />
        <div>
          <Button variant="contained" style={style.button} onClick={this.handleClick}>
            <i class="fas fa-download"></i>
            <div style={style.userText}>{buttonText}</div>
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    createState: state.createUser,
    editState: state.editUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: (userInfo, callback) => {
      dispatch(createUserAction(userInfo));
      callback();
    },
    editUser: (userInfo, callback) => {
      dispatch(editUserAction(userInfo, callback));
      // callback();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);