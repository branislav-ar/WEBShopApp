import { Link, useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faPlusSquare, faMailBulk, faMobileAndroid } from "@fortawesome/free-solid-svg-icons";

import "./user.css";

export default function User() {

    //DISPLAY PART
    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    const user = useSelector(state => 
        state.user.users.find((user) => user._id === userId)
    );

    //UPDATE PART
    const [inputs, setInputs] = useState({});
    const [psw, setPsw] = useState([]);

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    const handlePassword = (e) => {

        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(10);
        var hashed_pass = bcrypt.hashSync(e.target.value, salt);

        setPsw(hashed_pass);
    };

    console.log(inputs, psw);

    const handleClick = (e) => {
        e.preventDefault();
        
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                    default:
                }
            }, 
            (error) => {
              // error notification!
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const user = { ...inputs, img: downloadURL, passowrd: psw };
                updateUser(userId, user, dispatch);
              });
            }
        );
    };

    return (
        <div className="user">
            
            <div className="userTitleContainer">
                <h1 className="userTitle">Korisnik</h1>
                <Link to="/newUser" style={{textDecoration: "none"}}>
                    <button className="userButton"> <FontAwesomeIcon icon={faPlusSquare}/> Kreiraj novog!</button>
                </Link>
            </div>

            <div className="userContainer">
                <div className="userContainer-1">
                    <div className="userShow-1">
                        <div className="userShowTop">
                            <img src= {user.img} alt="user_img" className="userShowImg" />
                            <div className="userShowTopTitle">
                                <span className="userShowName"> {user.name} {user.surname} </span>
                                <span className="userShowUsername"> {user.username} </span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">Informacije o korisniku</span>
                            <div className="userShowInfo">
                                <div className="icons"> <FontAwesomeIcon icon={faMobileAndroid}/> </div>
                                <span className="userShowInfoTitle"> +{user.phoneNumber} </span>
                            </div>
                            <div className="userShowInfo">
                                <div className="icons"> <FontAwesomeIcon icon={faMailBulk}/> </div>
                                <span className="userShowInfoTitle"> {user.email} </span>
                            </div>
                            <div className="userShowInfo">
                                <div className="icons"> <FontAwesomeIcon icon={faShield}/> </div>
                                <span className="userShowInfoTitle"> 
                                    {user.isAdmin ? "Korisnik je admin!" : "Korisnik nije admin!"}
                                </span>
                            </div>
                        </div>
                    </div>
                
                    <div className="userShow-2">
                        <span className="userShowTitle">Želite da promenite šifru?</span>
                        <div className="userUpdateItem">
                            <label>Unesite novu šifru</label>
                            <input
                            onChange={handlePassword}
                            type="password"
                            className="userUpdateInput"
                            />
                        </div>
                    </div>

                </div>

                <div className="userUpdate">
                <span className="userUpdateTitle">Izmeni</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Korisničko ime</label>
                            <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            placeholder={user.username}
                            className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Ime</label>
                            <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder= {user.name}
                            className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Prezime</label>
                            <input
                            onChange={handleChange}
                            name="surname"
                            type="text"
                            placeholder= {user.surname}
                            className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input
                            onChange={handleChange}
                            name="email"
                            type="text"
                            placeholder={user.email}
                            className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Broj telefona</label>
                            <input
                            onChange={handleChange}
                            name="phoneNumber"
                            type="text"
                            placeholder={user.phoneNumber}
                            className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Admin</label>
                            <select onChange={handleChange} name="isAdmin" id="isAdmin">
                                <option value="true">Da</option>
                                <option value="false">Ne</option>
                            </select>
                        </div>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={user.img} alt="user_img" className="userUpdateImg" />
                            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                        <Link to="/users" style={{textDecoration: "none"}}>
                            <button onClick={handleClick} className="productButton">Ažuriraj</button>
                        </Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
