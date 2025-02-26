import MoviesTable from "./MoviesTable";

export default function Home() {
  return (
    <>
      <div className="my-2">
        <h1 className="text-2xl">Movies List</h1>
        <MoviesTable />
      </div>
    </>
  );
}
