"use client";

import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import useApi from "@/lib/useApi";
import { useEffect, useState } from "react";

export default function Home() {
  const api = useApi();

  const [movies, setMovies] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await api.callApi({
      url: BE_ROUTES.GET_MOVIES,
      method: HttpMethod.GET,
    });
    setMovies(JSON.stringify(data));
  };

  return <>{movies}</>;
}
