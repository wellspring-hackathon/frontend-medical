import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Search } from "lucide-react";


const SearchButton = () => {
  return (
    <Button variant="outline" size="lg" asChild  className="text-lg">
      <Link href="/search">
        Find Doctors
        <Search className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
};

export default SearchButton;
