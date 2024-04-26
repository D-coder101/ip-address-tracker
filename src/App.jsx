import { useEffect, useState } from "react";
import arrow from "../src/assets/images/icon-arrow.svg";
import Map from "./Map";
import useIp from "./hooks/useIp";

function App() {
  const { fetchIp } = useIp();
  const [query, setQuery] = useState("");

  const [data, setData] = useState({
    ip: "",
    timezone: "",
    isp: "",
    postalcode: "",
    latitude: 0,
    longitude: 0,
    city: "",
    region: "",
    country: "",
  });

  useEffect(() => {
    async function init() {
      const res = await fetchIp();
      if (res?.ip) {
        setData(res);
      }
    }
    init();
  }, []);

  const handleQuery = async (ip) => {
    const res = await fetchIp(ip);
    if (res?.ip) {
      setData(res);
      setQuery("");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleQuery(query);
  }

  return (
    <div className="App">
      <div className="Layout">
        <p className="header">IP Address Tracker</p>

        <div className="search-wrap">
          <div className="search-bar">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="search-input small-screen"
                name="ip"
                placeholder="Search for any IP address"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <input
                type="text"
                className="search-input large-screen"
                placeholder="Search for any IP address or domain"
                name="ip"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn">
                <img src={arrow} alt="arrow" />
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="ip-details">
            <div>
              <h6>IP ADDRESS</h6>
              <p>{data?.ip}</p>
            </div>
            <div>
              <h6>LOCATION</h6>
              <p>
                {data?.city},{data?.region},{data?.country}
                {data?.postalcode}
              </p>
            </div>
            <div>
              <h6>TIMEZONE</h6>
              <p>UTC&nbsp;{data?.timezone}</p>
            </div>
            <div>
              <h6>ISP</h6>
              <p>{data?.isp}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="map-Layout">
        <Map data={data} />
      </div>
    </div>
  );
}

export default App;
