import axios from "axios";
import { useEffect, useState } from "react";
import "./../css/Profile.css";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [phoneNum, setPhoneNumber] = useState("");
  const [kyc, setKYC] = useState("");
  const [PANNum, setPANNum] = useState("");
  const [addressProof, setAddressProof] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      var urlParams = {};
      urlParams.userId = props.userId;
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/get-user-by-id`, {
          params: urlParams,
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then(
          (res) => {
            setName(res?.data?.user?.name);
            setGender(res?.data?.user?.gender);
            var date = new Date(res?.data?.user?.DOB);
            if (date) date = dateFormat(date, "yyyy-MM-dd");
            setDOB(date);
            setPhoneNumber(res?.data?.user?.phoneNum);
            setKYC(res?.data?.user?.kyc);
            setPANNum(res?.data?.user?.kyc?.documents?.PANNum);
            setAddressProof(res?.data?.user?.kyc?.documents?.addressProof);
            setPhoto(res?.data?.user?.photo);
          },
          (err) => {}
        );
    };
    fetchData();
  }, []);

  const dateFormat = (inputDate, format) => {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  };

  return (
    <div>
      {props.userId === "" ? (
        <div className="container web-align wrapper">
          <h3>No information available! Please login to view your profile!</h3>
        </div>
      ) : (
        <div className="flex-container">
          <div className="profile-card">
            <div>
              <img className="profile-pic" alt="Groww" src={photo} />
            </div>
            <div className="profile-user-name">{name ?? ""}</div>
          </div>
          <div className="form-container">
            <form>
              <div className="profile-form-control">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="profile-form-control">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={gender ?? ""}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="profile-form-control">
                <label htmlFor="DOB">Date of Birth</label>
                <input
                  type="Date"
                  id="DOB"
                  defaultValue={DOB ?? ""}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
              <div className="profile-form-control">
                <label htmlFor="phoneNum">Phone Number</label>
                <input
                  type="text"
                  id="phoneNum"
                  value={phoneNum ?? ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="profile-form-control">
                <label htmlFor="kyc">KYC Status</label>
                <input
                  type="text"
                  id="kyc"
                  value={kyc?.status ?? "Not Complete"}
                  onChange={(e) => setKYC(e.target.value)}
                  disabled
                />
              </div>
              <div className="profile-form-control">
                <label htmlFor="PANNum">PAN-card Number</label>
                <input
                  type="text"
                  id="PANNum"
                  value={PANNum ?? ""}
                  onChange={(e) => setPANNum(e.target.value)}
                />
              </div>
              <div className="profile-form-control">
                <label htmlFor="addressProof">Address Proof</label>
                <input
                  type="text"
                  id="addressProof"
                  value={addressProof ?? ""}
                  onChange={(e) => setAddressProof(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
