import React,{ Component } from 'react';
import './UserForm.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const style = {
  button: {
    marginTop: "1%",
    width: '10%',
    backgroundColor: '#2ed573',
    color: '#fff'
  },
  userText: {
    marginLeft: '5%'
  }
}

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      age: null,
      password: "",
      rePassword: "",
      showPassword: false,
      showRePassword: false,
    }
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  handleChange = prop => event => {
    console.log(event.target.value);
    this.setState({ [prop]: event.target.value });
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
      showRePassword 
    } = this.state;
    const { buttonText } = this.props;

    return (
      <div>
        <TextField 
          label="First Name"
          placeholder="First Name"
          helperText="Please type in your first name"
          margin="normal"
          variant="outlined"
          value={firstName}
          onChange={this.handleChange('firstName')}
        />
        <br />
        <TextField 
          label="Last Name"
          placeholder="Last Name"
          helperText="Please type in your last name"
          margin="normal"
          variant="outlined"
          value={lastName}
          onChange={this.handleChange('lastName')}
        />
        <br />
        <TextField 
          label="Gender"
          placeholder="Gender"
          margin="normal"
          variant="outlined"
          value={gender}
          onChange={this.handleChange('gender')}
        />
        <br />
        <TextField 
          label="Age"
          placeholder="Age"
          margin="normal"
          variant="outlined"
          value={age}
          onChange={this.handleChange('age')}
        />
        <br />
        <TextField 
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
        <br />
        <TextField 
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
                  onClick={this.handleClickShowPassword}
                >
                  {showRePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <div>
          <Button variant="contained" style={style.button}>
            <i class="fas fa-download"></i>
            <div style={style.userText}>{buttonText}</div>
          </Button>
        </div>
      </div>
    )
  }
}

export default UserForm;