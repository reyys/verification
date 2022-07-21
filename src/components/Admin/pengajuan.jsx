import React, { useState } from "react";
import Images from "../../assets";
import { db } from "../../config";
import { collection, addDoc } from "firebase/firestore";
import "./pengajuan.css";

function Pengajuan({ setModal }) {
  const pengajuanCollection = collection(db, "pengajuan");
  const notifCollectionRef = collection(db, "notifikasi");

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    setData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const sendForm = async () => {
    setLoading(true);
    if (
      // file !== "" &&
      data.namaKepalaBidang !== "" &&
      data.nipKepalaBidang !== "" &&
      data.noRekening !== "" &&
      data.paketPekerjaan !== "" &&
      // data.namaKepalaSeksi !== "" &&
      // data.nipKepalaSeksi !== "" &&
      data.nilaiDitagih !== "" &&
      data.diAjukanOleh !== "" &&
      data.namaProgram !== "" &&
      data.kodeProgram !== "" &&
      data.tahunAnggaran !== "" &&
      data.totalDanaDisetujui !== ""
      // data.namaSubKegiatan !== "" &&
      // data.kodeSubKegiatan !== "" &&
      // data.kodeRincianSubKegiatan !== "" &&
      // data.rincianSubKegiatan !== "" &&
    ) {
      try {
        const getName = localStorage.getItem("name");
        const dataToPost = {
          isVerify: "waiting",
          isSpmtCreated: false,
          createdAt: new Date(),
          namaKepalaBidang: data.namaKepalaBidang,
          nipKepalaBidang: data.nipKepalaBidang,
          noRekening: data.noRekening,
          paketPekerjaan: data.paketPekerjaan,
          namaKepalaSeksi: data.namaKepalaSeksi,
          nipKepalaSeksi: data.nipKepalaSeksi,
          nilaiDitagih: data.nilaiDitagih,
          diAjukanOleh: data.diAjukanOleh,
          namaProgram: data.namaProgram,
          kodeProgram: data.kodeProgram,
          tahunAnggaran: data.tahunAnggaran,
          totalDanaDisetujui: data.totalDanaDisetujui,
          namaSubKegiatan: data.namaSubKegiatan,
          kodeSubKegiatan: data.kodeSubKegiatan,
          kodeRincianSubKegiatan: data.kodeRincianSubKegiatan,
          rincianSubKegiatan: data.rincianSubKegiatan,
        };

        const letter = await addDoc(pengajuanCollection, dataToPost);
        const notifData = {
          idLetter: letter.id,
          isRead: false,
          role: "admin",
          textNotif: `${getName} telah mengajukan dokumen, periksa sakarang.`,
          createdAt: Date.now(),
        };

        await addDoc(notifCollectionRef, notifData);
        alert("Sukses melakukan pengajuan, tunggu beberapa saat hinga verifikator menyetujui!");

        setData({});
        setLoading(false);
      } catch (error) {
        alert("Gagal melakukan pengajuan, coba lagi!");
        setLoading(false);
      }
    } else {
      alert("Isi semua isian yang di sediakan !");
      setLoading(false);
    }
  };

  return (
    <div style={{ zIndex: "50" }} className="p-5 position-absolute w-100">
      <div className="d-flex flex-column w-100 h-100 p-2 bg-white">
        <div className="p-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img style={{ width: "2rem", height: "2rem" }} src={Images.pengajuan} alt="" />
            <div>Add New Pengajuan</div>
          </div>
          <img onClick={() => setModal(false)} style={{ width: "2rem", height: "2rem", cursor: "pointer" }} src={Images.close} alt="" />
        </div>
        <div className="w-100" style={{ background: "gray", height: "1px" }}></div>
        <div className="p-3 custom-grid">
          {/* INPUT FIELD  */}
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="namaKepalaBidang">
              Kepala Bidang<span className="text-danger">*</span>
            </label>
            <input value={data.namaKepalaBidang ? data.namaKepalaBidang : ""} onChange={(e) => inputHandler(e)} id="namaKepalaBidang" className="p-2" placeholder="Enter nama kepala bidang" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="nipKepalaBidang">
              NIP Kepala Bidang<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.nipKepalaBidang ? data.nipKepalaBidang : ""} onChange={(e) => inputHandler(e)} id="nipKepalaBidang" className="p-2" placeholder="Enter NIP" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="noRekening">
              No Rekening<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.noRekening ? data.noRekening : ""} onChange={(e) => inputHandler(e)} id="noRekening" className="p-2" placeholder="Enter Nomor Rekening" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="paketPekerjaan">
              Paket Pekerjaan<span className="text-danger">*</span>
            </label>
            <input value={data.paketPekerjaan ? data.paketPekerjaan : ""} onChange={(e) => inputHandler(e)} id="paketPekerjaan" className="p-2" placeholder="Enter paket pekerjaan" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="namaKepalaSeksi">
              Kepala Seksi<span className="text-danger">*</span>
            </label>
            <input value={data.namaKepalaSeksi ? data.namaKepalaSeksi : ""} onChange={(e) => inputHandler(e)} id="namaKepalaSeksi" className="p-2" placeholder="Enter nama kepala seksi" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="nipKepalaSeksi">
              NIP Kepala Seksi<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.nipKepalaSeksi ? data.nipKepalaSeksi : ""} onChange={(e) => inputHandler(e)} id="nipKepalaSeksi" className="p-2" placeholder="Enter NIP" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="nilaiDitagih">
              Nilai yang ditagih<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.nilaiDitagih ? data.nilaiDitagih : ""} onChange={(e) => inputHandler(e)} id="nilaiDitagih" className="p-2" placeholder="Enter nilai yang ditagih" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="diAjukanOleh">
              Diajukan Oleh<span className="text-danger">*</span>
            </label>
            <input value={data.diAjukanOleh ? data.diAjukanOleh : ""} onChange={(e) => inputHandler(e)} id="diAjukanOleh" className="p-2" placeholder="Diajukan oleh" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="namaProgram">
              Nama Program<span className="text-danger">*</span>
            </label>
            <input value={data.namaProgram ? data.namaProgram : ""} onChange={(e) => inputHandler(e)} id="namaProgram" className="p-2" placeholder="Enter nama program" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="kodeProgram">
              Kode Program<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.kodeProgram ? data.kodeProgram : ""} onChange={(e) => inputHandler(e)} id="kodeProgram" className="p-2" placeholder="Enter kode program" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="tahunAnggaran">
              Tahun Anggaran<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.tahunAnggaran ? data.tahunAnggaran : ""} onChange={(e) => inputHandler(e)} id="tahunAnggaran" className="p-2" placeholder="Enter tahun anggaran" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="totalDanaDisetujui">
              Total Dana yang di Setujui<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.totalDanaDisetujui ? data.totalDanaDisetujui : ""} onChange={(e) => inputHandler(e)} id="totalDanaDisetujui" className="p-2" placeholder="Enter total dana yang disetujui" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="namaSubKegiatan">
              Nama Sub Kegiatan<span className="text-danger">*</span>
            </label>
            <input value={data.namaSubKegiatan ? data.namaSubKegiatan : ""} onChange={(e) => inputHandler(e)} id="namaSubKegiatan" className="p-2" placeholder="Enter nama sub kegiatan" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="kodeSubKegiatan">
              Kode Sub Kegiatan<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.kodeSubKegiatan ? data.kodeSubKegiatan : ""} onChange={(e) => inputHandler(e)} id="kodeSubKegiatan" className="p-2" placeholder="Enter kode sub kegiatan" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="kodeRincianSubKegiatan">
              Kode Rincian Sub Kegiatan<span className="text-danger">*</span>
            </label>
            <input type="number" value={data.kodeRincianSubKegiatan ? data.kodeRincianSubKegiatan : ""} onChange={(e) => inputHandler(e)} id="kodeRincianSubKegiatan" className="p-2" placeholder="Enter kode rincian sub kegiatan" />
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="fw-bold" htmlFor="rincianSubKegiatan">
              Rincian Sub Kegiatan<span className="text-danger">*</span>
            </label>
            <input value={data.rincianSubKegiatan ? data.rincianSubKegiatan : ""} onChange={(e) => inputHandler(e)} id="rincianSubKegiatan" className="p-2" placeholder="Enter rincian sub kegiatan" />
          </div>
        </div>
        <div className="px-3 py-2 d-flex gap-2 justify-content-end">
          <button onClick={() => setModal(false)} style={{ border: "none" }} className="text-primary p-2 rounded px-5">
            Cancel
          </button>
          <button onClick={() => sendForm()} style={{ backgroundColor: "#1F4690" }} className="p-2 border text-white rounded px-5">
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
                <span>Submit</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pengajuan;
