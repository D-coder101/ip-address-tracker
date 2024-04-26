const apiKey = import.meta.env.VITE_IPIFY_API_KEY;

function useIp() {
  const fetchIp = async (ip) => {
    try {
      const url = ip
        ? `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
        : `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;


      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      const responseObj = {
        ip: data?.ip,
        timezone: data?.location?.timezone,
        isp: data?.isp,
        latitude: data?.location?.lat,
        longitude: data?.location?.lng,
        city: data?.location?.city,
        region: data?.location?.region,
        postalcode: data?.location?.postalCode,
        country: data?.location?.country,
      };

      return responseObj;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { fetchIp };
}

export default useIp;
// https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_IPIFY_API_KEY}&ipAddress=8.8.8.8
// https://geo.ipify.org/api/v2/country?apiKey=at_LXyG2ppbA4xJ0Su4H82WFYB5oXk89&ipAddress=8.8.8.8
// https://geo.ipify.org/api/v2/country,city?apiKey=at_LXyG2ppbA4xJ0Su4H82WFYB5oXk89&ipAddress=8.8.8.8
// city and country API
