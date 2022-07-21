import React from "react";
import Images from "../../assets";
import Notification from "./notification";

function Dashboard({ setMenu, menu }) {
  return (
    <div className="w-100">
      <nav style={{ borderBottom: "1px solid gray" }} className="w-100 p-3 d-flex align-items-center justify-content-between">
        <img onClick={() => setMenu(!menu)} style={{ width: "2rem", height: "2rem", cursor: "pointer" }} src={Images.menu} alt="" />
        <div className="d-flex gap-3 align-items-center">
          <Notification />
          <div>Admin Pengguna</div>
        </div>
      </nav>
      <div className="p-3">
        <div className="fs-3 fw-bold">Dashboard</div>
        <div>
          <span>Dashboard</span> / <span>Pengajuan Pencairan</span>
        </div>
        <div className="mt-3 p-2 rounded d-flex flex-column justify-content-center" style={{ background: "#B8F1B0", borderLeft: "10px solid green" }}>
          <div className="fs-4 fw-bold">Selamat Datang</div>
          <div>This is a green callout.</div>
        </div>
        <div className="d-flex flex-column gap-3 mt-3">
          <div className="fs-3 fw-bold">Pengajuan Terakhir</div>
          <div className="d-flex w-75 mt-5 gap-1" style={{ marginInline: "auto", height: "10rem" }}>
            <div className="d-flex w-25 flex-column align-items-start">
              <div className="position-relative w-100">
                <div className="bg-success w-100" style={{ height: "2px" }}></div>
                <div style={{ left: "-10%", top: "-500%" }} className="position-absolute d-flex flex-column align-items-center justify-content-center">
                  <div className="bg-success d-flex align-items-center justify-content-center" style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}>
                    <img src={Images.check} alt="" />
                  </div>
                  <div>Submit</div>
                  <div className="p-1 px-2 rounded bg-success text-white">Success</div>
                </div>
              </div>
            </div>
            {/* //Processing  */}
            <div className="d-flex w-25 flex-column align-items-start">
              <div className="position-relative w-100">
                <div className="bg-success w-100" style={{ height: "2px" }}></div>
                <div style={{ left: "50%", top: "-500%", transform: "translateX(-50%)" }} className="position-absolute d-flex flex-column align-items-center justify-content-center">
                  <div className="bg-success d-flex align-items-center justify-content-center" style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}>
                    <img src={Images.check} alt="" />
                  </div>
                  <div>Submit</div>
                  <div className="p-1 px-2 rounded bg-success text-white">Success</div>
                </div>
              </div>
            </div>
            {/* Bendahara  */}
            <div className="d-flex w-25 flex-column align-items-start">
              <div className="position-relative w-100">
                <div className="bg-danger w-100" style={{ height: "2px" }}></div>
                <div style={{ left: "50%", top: "-500%", transform: "translateX(-50%)" }} className="position-absolute d-flex flex-column align-items-center justify-content-center">
                  <div className="bg-danger d-flex align-items-center justify-content-center" style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}>
                    <img style={{ width: "1rem", height: "1rem" }} src={Images.stop} alt="" />
                  </div>
                  <div>Bendahara</div>
                  <div className="p-1 px-2 rounded bg-danger text-white">Success</div>
                </div>
              </div>
            </div>
            {/* Pimpinan  */}
            <div className="d-flex w-25 flex-column align-items-start">
              <div className="position-relative w-100">
                <div className="w-100" style={{ height: "2px", background: "gray" }}></div>
                <div style={{ left: "50%", top: "-500%", transform: "translateX(-50%)" }} className="position-absolute d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center justify-content-center" style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "gray" }}>
                    <img style={{ width: "1rem", height: "1rem" }} src={Images.wait} alt="" />
                  </div>
                  <div>Bendahara</div>
                  <div className="p-1 px-2 rounded text-white" style={{ background: "gray" }}>
                    Success
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis augue eu sodales pretium. Vivamus sagittis nisi ligula, quis posuere eros egestas in. Sed at tortor a sem euismod dignissim. Duis tincidunt, dui vel
            accumsan mattis, eros risus tempor felis, quis blandit ante erat eu risus. Vestibulum et scelerisque justo, at blandit elit. Aliquam tincidunt erat ut nibh consectetur, eu fringilla ligula tincidunt. Aliquam lorem odio,
            hendrerit et hendrerit id, dignissim et nibh. Vestibulum tortor mi, semper sit amet dui in, placerat malesuada nunc. Etiam dolor orci, bibendum et odio in, blandit mollis tortor. Ut tincidunt suscipit dignissim.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
