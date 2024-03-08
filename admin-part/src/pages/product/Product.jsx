import { Link, useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import { useSelector, useDispatch } from "react-redux";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../requsetMethods";
import { updateProducts } from "../../redux/apiCalls";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default function Product() {

    //DISPLAY PART
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setpStats] = useState([]);

    const product = useSelector(state => 
        state.product.products.find((product) => product._id === productId)
    );
    

    //UPDATE PART
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
    
    console.log(inputs, cat, color, size);

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
                const product = { ...inputs, img: downloadURL, categories: cat, color: color, size: size };
                updateProducts(productId, product, dispatch);
                /* updateProducts() */
                /* const product = ({ ...inputs, img: downloadURL, categories: cat, color: color, size: size });
                updateProducts(productId, product, dispatch); */
              });
            }
        );
    };



    const MONTHS = useMemo(
        () => [
          "JAN", 
          "FEB",
          "MART",
          "APR",
          "MAJ",
          "JUN",
          "JUL",
          "AVG",
          "SEP",
          "OKT",
          "NOV",
          "DEC"
        ],[]
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get(`orders/income?pid=${productId}`);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) => 
                    setpStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id-1], "Broj prodatih artikala": item.total }
                    ]))
            }
            catch(err) {
                console.log(err);
            }
        }
  
        getStats();
      }, [MONTHS, productId]);

  return (
    <div className="product">

        <div className="productTitleContainer">
            <h1 className="productTitle">Artikal</h1>
            <Link to="/newproduct" style={{textDecoration: "none"}}>
                <button className="productButton"> <FontAwesomeIcon icon={faPlusSquare}/> Kreiraj novi!</button>
            </Link>
        </div>

        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey="Broj prodatih artikala" title="Statistika prodaje"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">sales:</span>
                        <span className="productInfoValue">-</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">in stock:</span>
                        <span className="productInfoValue">{ product.inStock }</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">

                    <label>Naziv</label>
                    <input onChange={handleChange} 
                            name="title"
                            /* defaultValue={product.title} */ 
                            className="Input" 
                            type="text" 
                            placeholder={product.title} />
                    
                    <label>Opis</label>
                    <input onChange={handleChange} 
                            name="desc" 
                            /* defaultValue={product.desc} */ 
                            className="Input" 
                            type="text" 
                            placeholder={product.desc} />

                    <label>Cena</label>
                    <input onChange={handleChange}
                            name="price" 
                            /* defaultValue={product.price} */ 
                            className="Input" 
                            type="number" 
                            placeholder={product.price} />

                    <label>Kategorije</label>
                    <input onChange={handleCat} className="Input" type="text" placeholder={product.categories} />

                    <label>Boja</label>
                    <input onChange={handleColor} className="Input" type="text" placeholder={product.color} />

                    <label>Veličina</label>
                    <input onChange={handleSize} className="Input" type="text" placeholder={product.size} />

                    <label>Dostupnost</label>
                    <select onClick={handleChange} name="inStock" id="idStock">
                        <option value="true">Da</option>
                        <option value="false">Ne</option>
                    </select>
                </div>
                <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                        <Link to="/products" style={{textDecoration: "none"}}>
                            <button onClick={handleClick} className="productButton">Ažuriraj</button>
                        </Link>
                </div>
            </form>
        </div>
    </div>
  );
}
