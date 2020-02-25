import React from "react";
import axiosWithAuth from "../utilites/axiosWithAuth";

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credintials: {
      username: "",
      password: ""
    }
  }
  handleChange = e => {
    this.setState({
      credintials: {
        ...this.state.credintials,
        [e.target.name]: e.target.value
      }
    })
  }
    login = e => {
      e.preventDefault();
      axiosWithAuth()
        .post("http://localhost:5000/api/login", this.state.credintials)
        .then(res => {
          localStorage.setItem("token", res.data.payload);
          this.props.history.push("/protected");
        })
        .catch(err => {
          localStorage.removeItem("token");
          console.log("invalid login: ", err);
        });
    };
  
  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={this.state.credintials.username}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={this.state.credintials.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    );
  };
}

export default Login;
