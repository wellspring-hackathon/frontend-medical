"use client"

import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [fuse, setFuse] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.results);

      const fuseInstance = new Fuse(data.results, {
        keys: ["name", "specialty", "location"],
        threshold: 0.3,
      });
      setFuse(fuseInstance);
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    if (!fuse) return;
    const res = filter === "all"
        //@ts-expect-error ===
      ? fuse.search(query).map((r) => r.item)
      //@ts-expect-error ===
      : fuse.search(query).map((r) => r.item).filter((r) => r.type === filter.slice(0, -1));
    setFilteredResults(res);
  }, [fuse, filter, query]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Search Results for: {query}</h1>
      </div>
      <div className="flex gap-2 mb-4">
        {["all", "doctors", "providers"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1 rounded-full border ${filter === f ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredResults.map((item, i) => (
            <li key={i} className="border p-4 rounded shadow">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-sm">{item.specialty || item.description}</p>
              <span className="text-xs uppercase text-blue-600">{item.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
