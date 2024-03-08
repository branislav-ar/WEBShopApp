import "./newUser.css";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function NewUser() {

    const [inputs, setInputs] = useState({});

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

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
                const user = ({ ...inputs, img: downloadURL });
                addUser(user, dispatch);
              });
            }
        );
    };



    return (
        <div className="newUser">
        <div className="newUserTitleContainer">
            <h1 className="productTitle">Korisnik</h1>
            <Link to="/users">
                <button className="newUserButton-back"> <FontAwesomeIcon icon={faArrowCircleLeft} /> </button>
            </Link>
        </div>

        <div className="userBottom">
            <form className="addUserForm">

                <div className="addUserItemContainer">

                    <div className="addUserItem">
                        <label>Slika</label>
                        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0]) }/>
                    </div>

                    <div className="addUserItem">
                        <label>Ime</label>
                        <input type="text" name="name" placeholder="Petar" onChange={handleChange}/>
                    </div>

                    <div className="addUserItem">
                        <label>Prezime</label>
                        <input type="text" name="surname" placeholder="Petrović" onChange={handleChange}/>
                    </div>

                    <div className="addUserItem">
                        <label>Korisničko ime</label>
                        <input type="text" name="username" placeholder="pera123" onChange={handleChange}/>
                    </div>
                    
                </div>

                <div className="addUserItemContainer">

                    <div className="addUserItem">
                        <label>E-mail</label>
                    <input type="text" name="email" placeholder="petar123@gmail.com" onChange={handleChange}/>
                    </div>

                    <div className="addUserItem">
                        <label>Broj telefona</label>
                        <input type="number" name="phoneNumber" placeholder="381601234567" onChange={handleChange}/>
                    </div>

                    <div className="addUserItem">
                        <label>Šifra</label>
                        <input type="text" name="password" placeholder="peraPassword123" onChange={handleChange}/>
                    </div>

                    <div className="addUserItem">
                        <label>Admin</label>
                        <select name="isAdmin" onClick={handleChange}>
                            <option value="true">Da</option>
                            <option value="false">Ne</option>
                        </select>
                    </div>

                </div>
            </form>
        </div>
        
        <span className="napomena-span"> Molimo vas da postavite jaku šifru koristeći brojeve, slova i druge karaktere. </span>
        <button className="newProductButton-create" onClick={handleClick}>Kreiraj</button>
        </div>
    );
}