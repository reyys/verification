import { useEffect, useState } from "react";
import Images from "../../assets";
import { getDocs, query, collection, limit, orderBy } from "firebase/firestore";
import { db } from "../../config";
import Pengajuan from "./pengajuan";
import "./index.css";
import Dashboard from "./dashboard.jsx";
import Notification from "./notification";

function User() {
  const tableList = ["ID", "Kepala Bidang", "Kepala Seksi", "Nama Program", "Sub Kegiatan", "Rincian Sub Kegiatan", "No Rekening", "Paket Pekerjaan", "Nilai Ditagih", "Tahun Anggaran"];
  const pengajuanCollection = collection(db, "pengajuan");
  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);

  const [menu, setMenu] = useState(true);
  const [navigation, setNavigation] = useState("dashboard");

  useEffect(() => {
    const getList = async () => {
      let dataArray = [];
      const data = await getDocs(pengajuanCollection);
      data.docs.map((doc) => dataArray.push({ ...doc.data(), id: doc.id }));

      setDataList(dataArray);
    };

    getList();
  }, [dataList]);

  return (
    <div className="w-100 d-flex position-relative">
      {modal && <div style={{ background: "rgba(0,0,0,0.5)", left: "0", top: "0", bottom: "0", right: "0", zIndex: "49" }} className="w-100 position-fixed"></div>}
      {modal && <Pengajuan setModal={setModal} />}
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
          <div
            onClick={() => setNavigation("dashboard")}
            style={{ background: `${navigation === "dashboard" ? "#1F4690" : ""}`, color: `${navigation === "dashboard" ? "white" : ""}`, borderRadius: "5px", cursor: "pointer", width: "15rem" }}
            className="d-flex px-2 py-3 align-items-center gap-2"
          >
            <svg style={{ width: "1.5rem", height: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z"
              />
            </svg>
            <div>Dashboard</div>
          </div>
          <div
            onClick={() => setNavigation("pengajuan")}
            style={{ background: `${navigation === "pengajuan" ? "#1F4690" : ""}`, color: `${navigation === "pengajuan" ? "white" : ""}`, borderRadius: "5px", cursor: "pointer" }}
            className="d-flex align-items-center gap-2 px-2 py-3"
          >
            <svg style={{ width: "1.5rem", height: "1.5rem", color: "black" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path
                fill={navigation === "pengajuan" ? "white" : "black"}
                d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55c.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75s-.75-.34-.75-.75s.34-.75.75-.75zM19 19H5V5h14v14z"
              />
            </svg>
            <div>Pengajuan Pencairan</div>
          </div>
        </div>
      </div>
      {/* Main Content  */}
      {navigation === "pengajuan" && (
        <div style={{ maxHeight: "100vh", overflowY: "auto" }} className="w-100">
          <nav style={{ borderBottom: "1px solid gray" }} className="w-100 p-3 d-flex align-items-center justify-content-between">
            <img onClick={() => setMenu(!menu)} style={{ cursor: "pointer", width: "2rem", height: "2rem" }} src={Images.menu} alt="" />
            <div className="d-flex gap-3 align-items-center">
              <Notification />
              <div>User Pengguna</div>
            </div>
          </nav>
          <div className="p-3">
            <div className="d-flex w-100 align-items-center justify-content-between">
              <div>
                <div className="fs-4 fw-bold">Pengajuan Pencairan Dana</div>
                <div className="d-flex gap-2 align-items-center">
                  <div>Dashboard</div>
                  <div>/</div>
                  <div>Pengajuan Pencairan Dana</div>
                </div>
              </div>
              <button onClick={() => setModal(true)} className="d-flex align-items-center gap-3 p-2 text-white fw-bold" style={{ background: "#1F4690", cursor: "pointer" }}>
                <svg style={{ width: "1.5rem", height: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55c.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75s-.75-.34-.75-.75s.34-.75.75-.75zM19 19H5V5h14v14z"
                  />
                </svg>
                <div>Add New Pengajuan</div>
              </button>
            </div>
            <div style={{ border: "1px solid gray" }} className="mt-3">
              <div className="px-3 pt-2 d-flex justify-content-between align-items-center">
                <div className="fw-bold fs-5">Daftar Pengajuan</div>
                <img style={{ width: "2rem", height: "2rem" }} src={Images.close} alt="" />
              </div>
              <hr></hr>
              <div className="px-3 pb-2">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <input className="px-2" placeholder="Search"></input>
                  <div className="d-flex align-items-center gap-2">
                    <span>Show</span>
                    <input style={{ width: "1.5rem" }} type="number" />
                    <span>Data</span>
                  </div>
                </div>
                <table className="w-100 border mt-3">
                  <tr>
                    {tableList.map((x) => {
                      return (
                        <th key={x}>
                          <div className="d-flex align-items-center">
                            {x}
                            <img style={{ with: "1rem", height: "1rem" }} src={Images.sort} alt="" />
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                  {dataList.map((x, index) => {
                    return (
                      <tr key={x.id}>
                        <td>{index + 1}</td>
                        <td>{x.namaKepalaBidang}</td>
                        <td>{x.namaKepalaSeksi}</td>
                        <td>{x.namaProgram}</td>
                        <td>{x.namaSubKegiatan}</td>
                        <td>{x.rincianSubKegiatan}</td>
                        <td>{x.noRekening}</td>
                        <td>{x.paketPekerjaan}</td>
                        <td>{x.nilaiDitagih}</td>
                        <td>{x.tahunAnggaran}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {navigation === "dashboard" && <Dashboard menu={menu} setMenu={setMenu} />}
    </div>
  );
}

export default User;
