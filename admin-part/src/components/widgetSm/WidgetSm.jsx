import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from "../../requsetMethods";

export default function WidgetSm() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users?new=true");
        setUsers(res.data);
      }
      catch(err) {}
    };

    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Novi korisnici</span>
      
      <ul className="widgetSmList">
        
        { users.map((user) => (

          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.img || "https://i.ibb.co/N1GDxHV/no-avatar.gif"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername"> {user.username} </span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>

        ))}        
      </ul>

    </div>
  );
}
