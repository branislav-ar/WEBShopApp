import Chart from "../../components/chart/Chart";
/* import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"; */
import "./home.css";
/* import { userData } from "../../dummyData"; */
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../requsetMethods";

export default function Home() {

  const [userStats, setUserStats] = useState([]);
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
    ],
    []
  );

  useEffect(() => {
      const getStats = async () => {
          try {
              const res = await userRequest.get("/users/stats");
              res.data.map((item) => 
                  setUserStats((prev) => [
                      ...prev,
                      { name: MONTHS[item._id-1], "Aktivni korisnici": item.total }
                  ])
              )
          }
          catch(err) {
            console.log(err);
          }
      }
      getStats();
  }, [MONTHS]);


  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userStats} title="Statika korisnika" grid dataKey="Aktivni korisnici"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
