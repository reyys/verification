import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getDocs, collection, query, limit, orderBy, addDoc } from "firebase/firestore";
import { db } from "../../config";
import Images from "../../assets";

const LetterList = ({ role }) => {
  const tableList = ["ID", "Kepala Bidang", "Kepala Seksi", "Nama Program", "Sub Kegiatan", "Rincian Sub Kegiatan", "No Rekening", "Paket Pekerjaan", "Nilai Ditagih", "Tahun Anggaran"];
  const [loading, setLoading] = useState(false);
  const bendaharaCollection = collection(db, "bendahara");
  const pengajuanCollection = collection(db, "pengajuan");
  const [dataLetter, setDataLetter] = useState([]);

  const [spm, setSpm] = useState("");
  const [sp2d, setSp2d] = useState("");

  useEffect(() => {
    const getList = async () => {
      let dataArray = [];
      const queryList = query(pengajuanCollection);
      const data = await getDocs(queryList);
      data.docs.map((doc) => dataArray.push({ ...doc.data(), id: doc.id }));

      setDataLetter(dataArray);
    };

    getList();
  }, []);

  console.log(dataLetter);
  const sendForm = async () => {
    try {
      if (spm !== "" && sp2d !== "") {
        setLoading(true);
        const postData = {
          createdAt: Date.now(),
          nomorSPM: spm,
          nomorSP2D: sp2d,
        };
        await addDoc(bendaharaCollection, postData);
        alert("data berhasil terkirim");
        setSp2d("");
        setSpm("");
        setLoading(false);
      } else {
        alert("Input field tidak boleh kosong");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="d-flex w-100 p-5 flex-column align-items-center">
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
        {dataLetter.map((x, index) => {
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
      <div className="w-100 mt-5 d-flex flex-column gap-3">
        <input onChange={(e) => setSpm(e.target.value)} className="w-100" type="number" placeholder="Masukkan Nomor SPM" value={spm}></input>
        <input onChange={(e) => setSp2d(e.target.value)} className="w-100" type="number" placeholder="Masukkan Nomor SP2D" value={sp2d}></input>
        <div className="d-flex my-3">
          <button className="btn w-100 p-2 text-white" style={{ background: "#1F4690" }} onClick={() => sendForm()}>
            <div className="d-flex justify-content-center align-items-center">
              {loading === true ? (
                <div className="d-flex mx-2">
                  <div className="spinner-border text-light spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
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
};

export default LetterList;
