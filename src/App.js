import "./App.scss";
import { useState } from "react";
import Landing from "./pages/Landing";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import { UserContext, LogoutContext } from "./context/Context";
import useSignin from "./customHooks/useSignin";
import useLogout from "./customHooks/useLogout";
import { ThemeProvider } from "@mui/material/styles";
import useMuiTheme from "./customHooks/useMuiTheme";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { signin } = useSignin(setUser);
  const { logout } = useLogout(setUser);
  const muiTheme = useMuiTheme();

  return (
    <ThemeProvider theme={muiTheme}>
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
    </ThemeProvider>
  );
}

export default App;
