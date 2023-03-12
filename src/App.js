import "./App.css";
import { useState } from "react";
import Landing from "./pages/Landing";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import db, { auth, provider } from "./firebase/firebase";
import { UserContext, LogoutContext } from "./context/Context";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const signin = () => {
    auth.signInWithPopup(provider).then((result) => {
      const newUser = {
        fullname: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      // Set User
      setUser(newUser);

      // Add user to local storage
      localStorage.setItem("user", JSON.stringify(newUser));

      db.collection("users").doc(newUser.email).set(newUser);

      navigate("/dashboard");
    });
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        // Remove user from local storage
        localStorage.removeItem("user");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <UserContext.Provider value={user}>
      <LogoutContext.Provider value={logout}>
        <div className="App">
          {!user ? (
            <Landing signin={signin} />
          ) : (
            <Container fluid style={{ padding: 0 }}>
              <NavbarComponent />
            </Container>
          )}
        </div>
      </LogoutContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
