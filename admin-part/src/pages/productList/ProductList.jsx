import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProducts } from "../../redux/apiCalls";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default function ProductList() {
  
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProducts(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
        field: "product",
        headerName: "Artikal",
        width: 380,
        renderCell: (params) => {
            return (
            <div className="productListItem">
                <img className="productListImg" src={params.row.img} alt="" />
                {params.row.title}
            </div>
            );
        },
        },
        { field: "inStock", headerName: "Na stanju", width: 150 },
        {
        field: "price",
        headerName: "Cena",
        width: 120,
        },
        {
        field: "action",
        headerName: "Akcija",
        width: 150,
        renderCell: (params) => {
            return (
            <>
                <Link to={"/product/" + params.row._id}>
                <button className="ProductListButton-edit">Izmeni</button>
                </Link>
                <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
                />
            </>
            );
        },
        },
    ];

    return (
        <div className="productList">
        <div className="ProductListTitleContainer">
            <h1>Lista artikala</h1>
            <Link to="/newproduct" style={{ textDecoration: "none" }}>
            <button className="ProductListButton-create"> <FontAwesomeIcon icon={faPlusSquare}/> Kreiraj novi! </button>
            </Link>
        </div>
        <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            getRowId={row=>row._id}
            pageSize={7}
            checkboxSelection
        />
        </div>
    );
}
