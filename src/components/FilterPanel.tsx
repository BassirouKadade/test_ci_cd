import React from "react";
import { Button } from "./ui/button";

interface FilterPanelProps {
  setFilter: (filter: "all" | "completed" | "pending") => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ setFilter }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <Button variant="outline" onClick={() => setFilter("all")}>
        Toutes
      </Button>
      <Button variant="outline" onClick={() => setFilter("completed")}>
        Terminées
      </Button>
      <Button variant="outline" onClick={() => setFilter("pending")}>
        En attente
      </Button>
    </div>
  );
};

export default FilterPanel;