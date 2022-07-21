import { useState, useEffect } from "react";
import LetterList from "../../components/LetterList";
import SpmtList from "../../components/SpmtList";
import User from "../../components/User";
import Admin from "../../components/Admin";
import Superadmin from "../../components/Superadmin/superadmin";

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const getRole = localStorage.getItem("role");
    setRole(getRole);
  }, []);

  return (
    <div className="d-flex flex-fill">
      {role === "user" && <User />}
      {role === "pimpinan" && <SpmtList />}
      {role === "verificator" && <LetterList role={role} />}
      {role === "bendahara" && <LetterList role={role} />}
      {role === "kabag" && <LetterList role={role} />}
      {role === "admin" && <Admin role={role} />}
      {role === "superadmin" && <Superadmin role={role} />}
    </div>
  );
};

export default Dashboard;
