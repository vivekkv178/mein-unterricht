"use client";
import { useState } from "react";
import MoviesTable from "./MoviesTable";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";

export default function Home() {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePollMovies = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await api.callApi({
        url: BE_ROUTES.POLL_MOVIES,
        method: HttpMethod.GET,
      });

      if (response.data) {
        setMessage(
          "Polling movies initiated successfully! Please refresh the page and check for movies loaded."
        );
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while polling movies.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Row with title and poll button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Movies List</h1>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
          onClick={handlePollMovies}
          disabled={isLoading}
        >
          {isLoading ? "Polling..." : "Poll Movies"}
        </button>
      </div>

      {/* Success or error message */}
      {message && (
        <div
          className={`text-center p-2 mt-4 ${
            message.includes("success") ? "text-green-900" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {/* Movies Table */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <MoviesTable />
        </div>
      </div>
    </div>
  );
}
