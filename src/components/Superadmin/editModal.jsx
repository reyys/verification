import React, { useState } from "react";
import Images from "../../assets";
import "./editModal.css";
import { db } from "../../config";
import { updateDoc, doc } from "firebase/firestore";

function EditModal({ id, setModal }) {
  const [field, setField] = useState({});

  const editHandler = async () => {
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, field);
      alert("Berhasil mengedit dokumen");
      setModal(false);
    } catch (error) {
      alert(error);
    }
  };

  const inputHandler = (e) => {
    setField((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <div style={{ zIndex: "50" }} className="position-absolute w-100 p-5">
      <div className="p-5 bg-white rounded h-100 w-100">
        <div className="w-100 d-flex mb-3 align-items-center justify-content-between">
          <div className="fw-bold fs-3">Perubahan Data</div>
          <img onClick={() => setModal(false)} style={{ width: "2rem", height: "2rem" }} src={Images.close} alt="" />
        </div>
        <div className="custom-grid">
          <div className="d-flex flex-column gap-3">
            <label className="fw-bolder" htmlFor="username">
              Username
            </label>
            <input onChange={(e) => inputHandler(e)} id="username" placeholder="Masukkan Username Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="email">
              Email
            </label>
            <input onChange={(e) => inputHandler(e)} id="email" placeholder="Masukkan Email Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="namaLengkap">
              Nama Lengkap
            </label>
            <input onChange={(e) => inputHandler(e)} id="namaLengkap" placeholder="Masukkan Nama Lengkap Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="nip">
              NIP
            </label>
            <input onChange={(e) => inputHandler(e)} id="nip" placeholder="Masukkan NIP Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="unitKerja">
              Unit Kerja
            </label>
            <input onChange={(e) => inputHandler(e)} id="unitKerja" placeholder="Masukkan Unit Kerja Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="jabatan">
              Jabatan
            </label>
            <input onChange={(e) => inputHandler(e)} id="jabatan" placeholder="Masukkan Jabatan Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="role">
              Role
            </label>
            <input onChange={(e) => inputHandler(e)} id="role" placeholder="Masukkan Role Baru"></input>
          </div>
          <div className="d-flex flex-column gap-2">
            <label className="fw-bolder" htmlFor="status">
              Status
            </label>
            <input onChange={(e) => inputHandler(e)} id="status" placeholder="Masukkan Status Baru"></input>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-end gap-3 mt-3">
          <button onClick={() => setModal(false)} style={{ border: "none" }} className="text-primary p-2 rounded px-5">
            Cancel
          </button>
          <button onClick={() => editHandler()} style={{ border: "none", background: "#1F4690" }} className="text-white p-2 rounded px-5">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
