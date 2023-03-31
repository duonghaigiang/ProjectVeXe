import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const Station = [
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Cần Thơ",
    "Bến Tre",
    "Đà Lạt",
    "Nha Trang",
  ];
  const [trip, setTrip] = useState([]);
  const values = { user, setUser, setToken, Station, trip, setTrip };
  useEffect(() => {
    curentUser();
  }, [token]);
  const navi = useNavigate();
  const curentUser = () => {
    if (token) {
      axios
        .get("http://localhost:7000/api/v1/user/user", {
          headers: {
            token: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          setUser();
          console.log(error);
        });
    } else {
      setUser();
    }
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") throw new Error("Error");
  return context;
}
export { AuthContextProvider, useAuth };
