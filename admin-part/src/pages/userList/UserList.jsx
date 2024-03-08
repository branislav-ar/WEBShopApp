import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/apiCalls";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default function UserList() {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    
    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);
    
    const handleDelete = (id) => {
        deleteUser(id, dispatch);
    };
    
    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
        field: "user",
        headerName: "Korisnik",
        width: 300,
        renderCell: (params) => {
            return (
            <div className="userListUser">
                <img className="userListImg" src={params.row.img} alt="" />
                <span> [{params.row.username}] </span>
                <span> {params.row.name} {params.row.surname} </span>
            </div>
            );
        },
        },
        { field: "email", headerName: "Email", width: 165 },
        { field: "phoneNumber", headerName: "Broj tel.", width: 130 },
        { field: "isAdmin", headerName: "Admin", width: 115,
        },
        {
        field: "action",
        headerName: "Akcija",
        width: 112,
        renderCell: (params) => {
            return (
            <>
                <Link to={"/user/" + params.row._id}>
                    <button className="UserListButton-edit">Izmeni</button>
                </Link>
                <DeleteOutline
                    className="userListDelete"
                    onClick={() => handleDelete(params.row._id)}
                />
            </>
            );
        },
        },
    ];

    return (
        <div className="userList">
            <div className="ProductListTitleContainer">
                <h1>Lista korisnika</h1>
                <Link to="/newUser" style={{ textDecoration: "none" }}>
                    <button className="UserListButton-create"> <FontAwesomeIcon icon={faPlusSquare}/> Kreiraj novog! </button>
                </Link>
            </div>
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                getRowId={row=>row._id}
                pageSize={7}
                checkboxSelection
            />
        </div>
    );
}
