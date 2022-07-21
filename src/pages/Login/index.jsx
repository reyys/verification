import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../config";
import Images from "../../assets";
import "./login.css";

const Login = () => {
  const collectionUserRef = collection(db, "users");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (password !== "" && username !== "") {
      try {
        setLoading(true);
        const querys = query(collectionUserRef, where("username", "==", `${username}`));
        const data = await getDocs(querys);

        let dataArray = [];
        data.docs.map((doc) => dataArray.push({ ...doc.data(), id: doc.id }));

        if (dataArray.length > 0) {
          let dataLogin = [];
          dataArray.forEach((dt) => {
            if (dt.password === password) {
              dataLogin.push(dt);
            }
          });

          if (dataLogin.length > 0) {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("role", dataLogin[0].role);
            localStorage.setItem("name", dataLogin[0].name);
            navigate("/dashboard");
          } else {
            alert("Username atau password anda salah !");
          }
        } else {
          alert("Username atau password anda salah !");
        }

        setLoading(false);
      } catch (error) {
        alert("Gagal login, coba lagi nanti!");
        setLoading(false);
      }
    } else {
      alert("Pastikan isi semua isian yang di sediakan!");
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#EAF6F6" }} className="d-flex flex-column align-items-center justify-content-center">
      <div className="custom-width d-flex flex-column gap-4">
        <div className="d-flex justify-content-center align-items-center gap-3 w-100">
          <img src={Images.logo} alt="" />
          <div className="fw-bolder fs-3">SPPDA</div>
        </div>
        <div className="d-flex flex-column bg-white" style={{ padding: "2rem", boxShadow: "0 0 2px gray" }}>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column my-2">
              <label className="mb-3" htmlFor="username">
                Username<span className="text-danger">*</span>
              </label>
              <input id="username" type="text" placeholder="Username" className="py-2 w-100 border rounded px-3" onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>
            <div className="d-flex flex-column my-2">
              <label className="mb-3" htmlFor="password">
                Password<span className="text-danger">*</span>
              </label>
              <input id="password" type="password" placeholder="Password" className="py-2 w-100 border rounded px-3" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="d-flex gap-2 align-items-center my-2">
              <input id="remember" type="checkbox" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <div className="d-flex mt-3">
              <button style={{ backgroundColor: "#1F4690" }} className="w-100 p-2 border text-white rounded" onClick={() => loginUser()}>
                <div className="d-flex justify-content-center align-items-center">
                  {loading === true ? (
                    <div className="d-flex mx-2">
                      <div className="spinner-border text-light spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    // <div className="d-flex mx-2">
                    //   <FontAwesomeIcon icon={faSignIn} size="1x" />
                    // </div>
                    ""
                  )}
                  <div className="d-flex">
                    <span>Login</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
