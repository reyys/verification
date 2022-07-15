import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getDocs, collection, query, limit, orderBy, addDoc } from "firebase/firestore";
import { db } from "../../config";

const LetterList = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const bendaharaCollection = collection(db, "bendahara");
  const letterCollection = collection(db, "letter");
  const [dataLetter, setDataLetter] = useState([]);

  const [spm, setSpm] = useState("");
  const [sp2d, setSp2d] = useState("");

  useEffect(() => {
    const getList = async () => {
      let dataArray = [];
      const queryList = query(letterCollection, limit(20), orderBy("createdAt", "desc"));
      const data = await getDocs(queryList);
      data.docs.map((doc) => dataArray.push({ ...doc.data(), id: doc.id }));

      setDataLetter(dataArray);
    };

    getList();
  }, []);

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

  console.log(dataLetter);

  return (
    <div className="d-flex w-100 flex-column align-items-center">
      <div className="d-flex my-4">
        <h2>List Pengajuan</h2>
      </div>
      <div className="col-11 col-md-6 mt-3">
        <table className="w-100">
          <tbody>
            <tr className="border-bottom">
              <td>Kode ID</td>
              <td>Status</td>
              <td>Action</td>
              <td>Diajukan Oleh</td>
            </tr>

            {dataLetter.length > 0 ? (
              dataLetter.map((list) => {
                return (
                  //   <div className="row mx-0 w-100" style={{ color: "gray" }}>
                  //     <div className="col-4 text-truncate">
                  //       <span>{list.id}</span>
                  //     </div>
                  //     <div className="col-4">
                  //       <span>{list.isVerify === true ? "Setuju" : list.isVerify === "waiting" ? "Menungu" : "Ditolak"}</span>
                  //     </div>
                  //     <div className="col-4 px-0">
                  //       <Link to={`review/${list.id}`} className="text-decoration-none" style={{ color: "gray" }}>
                  //         Lihat detail &nbsp;
                  //         <FontAwesomeIcon icon={faArrowRight} />
                  //       </Link>
                  //     </div>
                  //   </div>
                  <tr>
                    <td>{list.id}</td>
                    <td>{list.isVerify === true ? "Setuju" : list.isVerify === "waiting" ? "Menungu" : "Ditolak"}</td>
                    <td>
                      {" "}
                      <Link to={`review/${list.id}`} className="text-decoration-none" style={{ color: "gray" }}>
                        Lihat detail &nbsp;
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </td>
                    <td>Bendahara</td>
                  </tr>
                );
              })
            ) : (
              <div className="d-flex justify-content-center my-3">
                <span>Data belum tersedia.</span>
              </div>
            )}
          </tbody>
        </table>
        <div className="w-100 mt-3 d-flex flex-column gap-3">
          <input onChange={(e) => setSpm(e.target.value)} className="w-100" type="number" placeholder="Masukkan Nomor SPM" value={spm}></input>
          <input onChange={(e) => setSp2d(e.target.value)} className="w-100" type="number" placeholder="Masukkan Nomor SP2D" value={sp2d}></input>
          <div className="d-flex my-4">
            <button className="btn btn-primary w-100 p-2" onClick={() => sendForm()}>
              <div className="d-flex justify-content-center align-items-center">
                {loading === true ? (
                  <div className="d-flex mx-2">
                    <div className="spinner-border text-light spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex mx-2">
                    <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                  </div>
                )}
                <div className="d-flex">
                  <span>Kirim</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterList;
