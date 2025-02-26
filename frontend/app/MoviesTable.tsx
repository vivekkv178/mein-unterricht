"use client";
import React, { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, IGetRowsParams } from "ag-grid-community";
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

  const [loading, setLoading] = useState(false);
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
          <div style={{ width: "50px", height: "50px", position: "relative" }}>
            <Image
              src={params.data.poster_url}
              alt={params.data.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null;
      },
    },
    { headerName: "Title", field: "title" },
    { headerName: "Director", field: "director" },
    { headerName: "Plot", field: "plot" },
  ]);

  const getServerSideDatasource = () => {
    return {
      getRows: async (params: IGetRowsParams) => {
        const { startRow, endRow } = params;

        try {
          setLoading(true);

          const response = await api.callApi({
            url: BE_ROUTES.GET_MOVIES,
            method: HttpMethod.GET,
            params: {
              startRow,
              endRow,
            },
          });

          setLoading(false);

          params.successCallback(response.data, response?.totalRecords);
        } catch (error) {
          console.log("Error while fecthing data", error);
          params.failCallback();
        }
      },
    };
  };

  const onGridReady = useCallback((params: any) => {
    const datasource = getServerSideDatasource();
    params.api.setGridOption("datasource", datasource);
  }, []);

  const getRowId = useCallback(function (params: any) {
    return params.data.imdb_id;
  }, []);

  const [defaultColDef] = useState<ColDef>({
    resizable: true,
    filter: true,
  });
  return (
    <div className="w-[90%] h-[80vh] m-auto">
      <AgGridReact
        columnDefs={columnDefs}
        rowModelType={"infinite"}
        defaultColDef={defaultColDef}
        pagination={true}
        onGridReady={onGridReady}
        cacheBlockSize={10}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        maxConcurrentDatasourceRequests={1}
        getRowId={getRowId}
        loading={loading}
      />
    </div>
  );
};

export default MoviesTable;
