import React from "react";
import fire from "./components/firebase";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
    let usr = fire.auth().currentUser;
    let isAuth = usr ? true : false;
    let user = usr ? usr.displayName : "";
    let uid = usr ? usr.uid : "";
    this.state = {
      //isAuth: localStorage.getItem("isAuth") === "true",
      //user: localStorage.getItem("user"),
      isAuth: isAuth,
      user: user,
      invalid_cred: false,
      uid: uid
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(usr => {
      usr
        ? this.setState({ user: usr.displayName, isAuth: true, uid: usr.uid })
        : this.setState({ user: "", isAuth: false });
    });
    //console.log(this.state.isAuth);
  }

  /*componentWillUnmount() {
    console.log(this.state.isAuth);
    setTimeout(function() {}, 20000);
    localStorage.setItem("isAuth", this.state.isAuth);
    localStorage.setItem("user", this.state.user);
  }*/

  /*login({ event, user }) {
    //console.log(this.state.isAuth);
    event.preventDefault();
    fetch("/login_user", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({ User: user }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          isAuth: true,
          user: res.user
        })
      );
    localStorage.setItem("isAuth", true);
    localStorage.setItem("user", user);
  }*/
  login({ event, email, pass }) {
    this.setState({ invalid_cred: false });
    event.preventDefault();
    const usr = fire
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(e => this.setState({ invalid_cred: true }));
  }

  logout() {
    fire
      .auth()
      .signOut()
      .catch(e => console.log(e));
    // this.setState({ isAuth: false, user: "" });
    // localStorage.setItem("isAuth", false);
    // localStorage.setItem("user", "");
    // console.log(this.state.isAuth);
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          login_check: this.login_check,
          invalid_cred: this.state.invalid_cred,
          uid: this.state.uid
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
