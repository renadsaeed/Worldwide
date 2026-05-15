import { useState } from "react";
export function useGeolocation(defaultPostion = null) {
  const [isloading, setLoading] = useState(false);
  const [postion, setPostion] = useState(defaultPostion);
  const [error, setError] = useState(null);
  function getPostion() {
    if (!navigator.geolocation)
      return setError("Geolocation is not supported by your browser");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (postion) => {
        setPostion({
          lat: postion.coords.latitude,
          lng: postion.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
    );
  }
  return { isloading, error, postion, getPostion };
}
