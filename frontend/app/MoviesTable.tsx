"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import useApi from "@/lib/useApi";
import Image from "next/image";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Movie {
  imdb_id: string;
  title: string;
  director: string | null;
  plot: string | null;
  year: number;
  poster_url: string | null;
  created_at: string;
}

const MoviesTable = () => {
  const api = useApi();

  const [rowData, setRowData] = useState<Movie[]>([]);
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "S.no",
      valueGetter: "node.rowIndex + 1",
    },
    { headerName: "IMDB ID", field: "imdb_id" },
    {
      headerName: "Poster",
      cellRenderer: (params: { data?: Movie }) => {
        return params?.data?.poster_url ? (
          <Image
            src={params?.data?.poster_url}
            alt=""
            width={100}
            height={100}
          />
        ) : null;
      },
    },
    { headerName: "Title", field: "title" },
    { headerName: "Director", field: "director" },
    { headerName: "Plot", field: "plot" },
  ]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const response = await api.callApi({
      url: BE_ROUTES.GET_MOVIES,
      method: HttpMethod.GET,
    });
    setRowData(response?.data);
  };

  const [defaultColDef] = useState<ColDef>({
    resizable: true,
    filter: true,
  });
  return (
    <div className="w-[90%] h-[80vh] m-auto">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowNumbers={true}
        pagination={true}
      />
    </div>
  );
};

export default MoviesTable;
