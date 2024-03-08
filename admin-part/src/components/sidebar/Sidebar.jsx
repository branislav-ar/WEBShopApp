import "./sidebar.css";
import {
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    Report,
} from "@material-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faDoorOpen, faUserGroup, faUserPlus, faShirt, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">

                    <h3 className="sidebarTitle">Komandna tabla</h3>
                
                    <ul className="sidebarList">

                        <Link to="/" className="link">
                        <li className="sidebarListItem">
                            <span> Početna </span>
                            <FontAwesomeIcon icon={ faHouse }/>
                        </li>
                        </Link>
                        
                        <Link to="/login" className="link">
                        <li className="sidebarListItem">
                            <span> Login </span>
                            <FontAwesomeIcon icon={ faDoorOpen }/>
                        </li>
                        </Link>

                    </ul>
                </div>

                <div className="sidebarMenu">

                <h3 className="sidebarTitle">Prečice</h3>

                <ul className="sidebarList">

                    <Link to="/users" className="link">
                    <li className="sidebarListItem">
                        <span>Svi korisnici</span>
                        <FontAwesomeIcon icon={ faUserGroup }/>
                    </li>
                    </Link>

                    <Link to="/newUser" className="link">
                    <li className="sidebarListItem">
                        <span>Dodaj korisnika</span>
                        <FontAwesomeIcon icon={ faUserPlus }/>
                    </li>
                    </Link>

                    <Link to="/products" className="link">
                    <li className="sidebarListItem">
                        <span>Svi artikli</span>
                        <FontAwesomeIcon icon={ faShirt }/>
                    </li>
                    </Link>

                    <Link to="/newproduct" className="link">
                    <li className="sidebarListItem group">
                        <span>Dodaj artikal</span>
                        <div className="icons-group">
                        <div className="small1"> <FontAwesomeIcon icon={ faShirt }/> </div>
                        <div className="small2"> <FontAwesomeIcon icon={ faPlus }/> </div>
                        </div>
                    </li>
                    </Link>

                </ul>
            </div>

            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifikacije</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                    E-mail
                    <MailOutline className="sidebarIcon" />
                    </li>
                    <li className="sidebarListItem">
                    Feedback
                    <DynamicFeed className="sidebarIcon" />
                    </li>
                    <li className="sidebarListItem">
                    Poruke
                    <ChatBubbleOutline className="sidebarIcon" />
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Za zaposlene</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        Prijave
                        <Report className="sidebarIcon" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
}