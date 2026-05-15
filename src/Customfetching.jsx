// import { useState, useEffect } from "react";

// export function CustomFetch(url) {
//   const [cities, setCities] = useState([]);
//   const [loading, isLoading] = useState(false);
//   const [error, setError] = useState(false);
//   useEffect(() => {
//     async function fetchCities() {
//       try {
//         isLoading(true);
//         setError(false);
//         const response = await fetch({ url });
//         if (!response.ok) throw new Error("page not Found");

//         const data = await response.json();
//         if (!data) throw new Error("undefind data");
//         setCities(data);
//       } catch (e) {
//         setError(true);
//       } finally {
//         isLoading(false);
//       }
//     }

//     fetchCities();
//   }, [url]);
//   return {
//     cities,
//     loading,
//     error,
//     setCities,
//   };
// }
