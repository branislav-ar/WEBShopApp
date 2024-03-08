import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to="/" style={{textDecoration: "none"}}>
                        <span className="logo">SHOPAPP. admin</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarAvatarContainer">
                        <img src="https://i.ibb.co/Xj01zwb/admin-pfp-2.png" alt="" className="topAvatar" />
                    </div>
                </div>
            </div>
        </div>
    );
}
