import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";
import Images from "../../assets";
import "./addModal.css";

function AddModal({ setModal, setAdd }) {
  const [field, setField] = React.useState();
  const userCollection = collection(db, "users");
  const inputHandler = (e) => {
    setField((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const addHandler = async () => {
    try {
      await addDoc(userCollection, field);
      alert("Berhasil Menambahkan User Baru");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={{ zIndex: "50" }} className="position-absolute w-100 p-5">
      <div className="p-5 bg-white rounded h-100 w-100">
        <div style={{ borderBottom: "1px solid gray" }} className="pb-3 w-100 d-flex mb-5 align-items-center justify-content-between">
          <div className="fs-3">Add New User</div>
          <img onClick={() => setAdd(false)} style={{ width: "2rem", cursor: "pointer", height: "2rem" }} src={Images.close} alt="" />
        </div>
        <div className="custom-grid">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="username">
                Username
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="username" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="email">
                Email Address
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="email" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="namaLengkap">
                Nama Lengkap
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="namaLengkap" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="nip">
                NIP
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="nip" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="unitKerja">
                Unit Kerja
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="unitKerja" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="jabatan">
                Jabatan
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="jabatan" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="role">
                Role User
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="role" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <label className="fw-bolder" htmlFor="status">
                User Status
              </label>
              <span className="text-danger">*</span>
            </div>
            <input onChange={(e) => inputHandler(e)} id="status" placeholder="Masukkan Username Baru"></input>
          </div>
        </div>
        <div className="mt-3 w-100 custom-col-span d-flex justify-content-end gap-2">
          <button onClick={() => setAdd(false)} style={{ border: "none", width: "fit-content" }} className="rounded border text-primary p-2">
            Cancel
          </button>
          <button onClick={() => addHandler()} style={{ border: "none", background: "#1F4690", width: "fit-content" }} className="text-white rounded p-2">
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
