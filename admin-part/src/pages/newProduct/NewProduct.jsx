import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProducts } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function NewProduct() {
    const [inputs, setInputs] = useState({});
    
    const [cat, setCat] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    const handleCat = (e) => {
        setCat(e.target.value.split(", "));
    };

    const handleColor = (e) => {
      setColor(e.target.value.split(", "));
    };

    const handleSize = (e) => {
      setSize(e.target.value.split(", "));
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
                const product = ({ ...inputs, img: downloadURL, categories: cat, color: color, size: size });
                addProducts(product, dispatch);
              });
            }
        );
    };
    


  return (
    <div className="newProduct">
        <div className="newProductTitleContainer">
            <h1 className="productTitle">Artikal</h1>
            <Link to="/products">
            <button className="newProductButton-back"> <FontAwesomeIcon icon={faArrowCircleLeft} /> </button>
            </Link>
        </div>

        <div className="productBottom">
            <form className="addProductForm">
                <div className="addProductItemContainer">

                    <div className="addProductItem">
                        <label>Slika</label>
                        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0]) }/>
                    </div>

                    <div className="addProductItem">
                        <label>Naziv</label>
                        <input type="text" name="title" placeholder="MAJICA 4" onChange={handleChange}/>
                    </div>

                    <div className="addProductItem">
                        <label>Opis</label>
                        <input type="text" name="desc" placeholder="Opis..." onChange={handleChange}/>
                    </div>

                    <div className="addProductItem">
                        <label>Cena</label>
                        <input type="number" name="price" placeholder="$20" onChange={handleChange}/>
                    </div>
                
                </div>

                <div className="addProductItemContainer">

                    <div className="addProductItem">
                        <label>Kategorije</label>
                        <input type="text" placeholder="winter, popculture, shirt..." onChange={handleCat}/>
                    </div>

                    <div className="addProductItem">
                        <label>Boja</label>
                        <input type="text" placeholder="white, black, blue..." onChange={handleColor}/>
                    </div>

                    <div className="addProductItem">
                        <label>Veličina</label>
                        <input type="text" placeholder="XS, S, M..." onChange={handleSize}/>
                    </div>

                    <div className="addProductItem">
                        <label>Na stanju</label>
                        <select name="inStock" onClick={handleChange}>
                        <option value="true">Da</option>
                        <option value="false">Ne</option>
                        </select>
                    </div>

                </div>
            </form>
        </div>
      
        <span className="napomena-span"> U kategorije dodati 'all', kao i svaku od boja.</span>
        <button className="newProductButton-create" onClick={handleClick}>Kreiraj</button>
    </div>
  );
}
