import React, { useEffect, useState } from "react";
import Images from "../../assets";
import "./superadmin.css";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";
import EditModal from "./editModal";
import AddModal from "./addModal";
import Notification from "./notification";

function Superadmin() {
  const tableList = ["Username", "Email", "Nama Lengkap", "NIP", "Unit Kerja", "Jabatan", "Role", "Status", "Aksi"];
  const userCollection = collection(db, "users");
  const [userData, setUserData] = React.useState("");

  // Edit Data Modal & Id
  const [currentId, setCurrentId] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [add, setAdd] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      let dataArray = [];
      const data = await getDocs(userCollection);
      data.docs.map((doc) => dataArray.push({ ...doc.data(), id: doc.id }));
      setUserData(dataArray);
    };
    getData();
  }, [userData]);

  const editHandler = (id) => {
    setModal(true);
    setCurrentId(id);
  };

  const deleteHandler = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  const [menu, setMenu] = useState(true);
  return (
    <div className="w-100 d-flex position-relative">
      {add && <div style={{ background: "rgba(0,0,0,0.5)", left: "0", top: "0", bottom: "0", right: "0", zIndex: "49" }} className="w-100 position-fixed"></div>}
      {modal && <div style={{ background: "rgba(0,0,0,0.5)", left: "0", top: "0", bottom: "0", right: "0", zIndex: "49" }} className="w-100 position-fixed"></div>}

      {add && <AddModal setAdd={setAdd} />}
      {modal && <EditModal id={currentId} setModal={setModal} />}
      {/* Navigation Menu  */}
      <div className={`${menu ? "show-menu" : "hide-menu"} h-100`} style={{ backgroundColor: "#EAF6F6", transition: "all 1s" }}>
        <div style={{ borderBottom: "1px solid gray" }} className="d-flex w-100 px-3 py-3 align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <img style={{ width: "2rem", height: "2rem" }} src={Images.logo} alt="" />
            <div>SPPDA</div>
          </div>
          <img className="responsive-close" style={{ width: "2rem", height: "2rem" }} onClick={() => setMenu(false)} src={Images.close} alt="" />
        </div>
        <div className="mt-3 w-100 px-3 d-flex flex-column gap-3">
          <div>MENU</div>
          <div style={{ background: "#1F4690", color: "white", borderRadius: "5px", cursor: "pointer", width: "15rem" }} className="d-flex px-2 py-3 align-items-center gap-2">
            <svg style={{ width: "1.5rem", height: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z"
              />
            </svg>
            <div>Management User</div>
          </div>
        </div>
      </div>
      <div style={{ maxHeight: "100vh", overflowY: "auto" }} className="w-100">
        <nav style={{ borderBottom: "1px solid gray" }} className="w-100 p-3 d-flex align-items-center justify-content-between">
          <img onClick={() => setMenu(!menu)} style={{ cursor: "pointer", width: "2rem", height: "2rem" }} src={Images.menu} alt="" />
          <div className="d-flex gap-3 align-items-center">
            <Notification />
            <div>Admin Pengguna</div>
          </div>
        </nav>
        <div className="p-3">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <div>
              <div className="fs-4 fw-bold">Management User</div>
              <div className="d-flex gap-2 align-items-center">
                <div>Management User</div>
              </div>
            </div>
            <button onClick={() => setAdd(true)} style={{ backgroundColor: "#1F4690", border: "none", color: "white" }} className="d-flex align-items-center gap-1 p-2 rounded">
              <svg style={{ width: "1.5rem", height: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1c-.4.2-.8.3-1.2.5c-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8c2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
                />
              </svg>
              <span>Add New User</span>
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="border">
            <div className="w-100 d-flex align-items-center justify-content-between p-3">
              <div className="fw-bold">Daftar User</div>
              <img src={Images.close} alt="" style={{ width: "1.5rem", height: "1.5rem" }} />
            </div>
            <div className="w-100" style={{ background: "gainsboro", height: "1px" }}></div>
            <div className="w-100 p-3 d-flex align-items-center justify-content-between">
              <input placeholder="Search" type="text"></input>
              <div className="d-flex align-items-center gap-1">
                <span>Show</span>
                <input style={{ width: "2rem" }} type="number"></input>
                <span>Data</span>
              </div>
            </div>
            <div className="p-3">
              <table className="w-100 border">
                <tr style={{ borderBottom: "1px solid gray" }}>
                  {tableList.map((x) => {
                    return (
                      <th>
                        <div className="d-flex align-items-center gap-1">
                          <span>{x}</span>
                          <img src={Images.sort} alt="" style={{ width: "1rem", height: "1rem" }} />
                        </div>
                      </th>
                    );
                  })}
                </tr>
                {userData !== "" &&
                  userData.map((x) => {
                    if (x.role !== "superadmin") {
                      return (
                        <tr>
                          <td>{x.username}</td>
                          <td>{x.email}</td>
                          <td>{x.name}</td>
                          <td>{x.nip}</td>
                          <td>{x.unitKerja}</td>
                          <td>{x.jabatan}</td>
                          <td>{x.role}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded p-1">Active</div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-1">
                              <button onClick={() => editHandler(x.id)} className="p-1 rounded border">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="m16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621Z" />
                                    <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
                                  </g>
                                </svg>
                              </button>
                              <button onClick={() => deleteHandler(x.id)} className="p-1 rounded border">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                                  <path
                                    fill="currentColor"
                                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Superadmin;
