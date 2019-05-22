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
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { createUserAction } from '../../redux/actions/createUser';
import { editUserAction } from '../../redux/actions/editUser';

const style = {
  button: {
    margin: "auto",
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
  },
  modalStyle: {
    margin: "auto", 
    marginTop: "20%",
    position: "absolute",
    boxShadow: "5px",
    width: "20%",
  }
}

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageAction: "",
      id: Number(null),
      firstName: "",
      lastName: "",
      gender: "",
      age: Number(null),
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
      modalOpen: false,
      modalMessage: "",
      modalHeadertext: "Sorry",
      modalBtnText: "Try Again",
      modalBtnColor: "#d63031"
    }
  }

  componentDidMount() {
    if (this.props.history.location.pathname === '/create') {
      this.setState({ pageAction: "create"});
    }
    else {
      this.setState({ pageAction: "edit" });
      this.setState({ id: this.props.id});
      this.props.userList.data.forEach(user => {
        if (parseInt(user.id) === parseInt(this.props.id)) {
          console.log("hello");
          this.setState({ firstName: user.firstName });
          this.setState({ lastName: user.lastName });
          this.setState({ gender: user.gender });
          this.setState({ age: user.age });
          this.setState({ password: user.password });
          this.setState({ rePassword: user.password });
        }
      })
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

  getTextFieldCondition = () => {
    const {
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
    return (
      firstName !== "" &&
      lastName !== "" &&
      gender !== "" &&
      age !== Number(null) &&
      password !== "" &&
      rePassword !== "" &&
      password === rePassword && 
      !firstNameError &&
      !lastNameError &&
      !ageError &&
      !passwordError &&
      !rePasswordError
    );
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
    } = this.state;
    if (this.getTextFieldCondition()) {
          let userInfo = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            age: age,
            password: password
          };
          if (pageAction === "create") {
            this.props.createUser(userInfo, () => {
              const { err } = this.props.createState;
              this.setState({ modalOpen: true });
              this.setState({ modalMessage: err ? "Something went wrong, creating user failed!" : "You successfully created a new user"});
              this.setState({ modalHeadertext: err ? "Sorry" : "Congratulations"});
              this.setState({ modalBtnText: err ? "Try Again" : "Go Back"});
              this.setState({ modalBtnColor: err ? "#d63031" : "#2ed573" });
            });
          }
          else {
            this.props.editUser(userInfo, () => {
              const { err } = this.props.editState;
              this.setState({ modalOpen: true});
              this.setState({ modalMessage: err ? "Something went wrong, editing user failed!" : "You successfully edited the user information"});
              this.setState({ modalHeadertext: err ? "Sorry" : "Congratulations"});
              this.setState({ modalBtnText: err ? "Try Again" : "Go Back" });
              this.setState({ modalBtnColor: err ? "#d63031" : "#2ed573" });
            });
          }
        }
    else {
      this.setState({ modalOpen: true });
      this.setState({ modalMessage: "Incorrect input format, please check again and type in the correct information!"});
      this.setState({ modalHeadertext: "Sorry"});
      this.setState({ modalBtnText: "Try Again"});
      this.setState({ modalBtnColor: "#d63031"});
    }
  }

  redirectWithPath = (path) => {
    this.props.history.push(path);
  }

  handleModalBtnClick = (path) => {
    this.setState({ modalOpen: false });
    this.redirectWithPath(path);
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
      rePasswordError,
      modalOpen,
      modalMessage,
      modalHeadertext,
      modalBtnText,
      modalBtnColor
    } = this.state;
    const { buttonText } = this.props;
    const path = this.getTextFieldCondition() ? '/' : this.props.history.location.pathname;

    return (
      <div>
        <FormControl>
          <TextField 
            style={style.textField}
            autoFocus={true}
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          style={style.modalStyle}
        >
          <div className="modalDiv">
            <Typography variant="h5" id="modal-title" style={{ color: modalBtnColor}}>
              {modalHeadertext}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {modalMessage}
            </Typography>
            <Button 
              style={{ background: modalBtnColor}}
              id="modalBtn"
              variant="contained" 
              onClick={() => this.handleModalBtnClick(path)}>
              <div>{modalBtnText}</div>
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userList: state.getUser,
    createState: state.createUser,
    editState: state.editUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: (userInfo, callback) => {
      dispatch(createUserAction(userInfo, callback));
    },
    editUser: (userInfo, callback) => {
      dispatch(editUserAction(userInfo, callback));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);