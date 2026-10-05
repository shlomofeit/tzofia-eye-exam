import { useAlertsStore } from "../store/alertsStore";
import type { ArenaFilter, PriorityFilter } from "../types/alert";

export default function AlertFilters() {
  const search = useAlertsStore((state) => state.search);
  const arena = useAlertsStore((state) => state.arena);
  const priority = useAlertsStore((state) => state.priority);
  const setSearch = useAlertsStore((state) => state.setSearch);
  const setArena = useAlertsStore((state) => state.setArena);
  const setPriority = useAlertsStore((state) => state.setPriority);

  const arenas = ["North", "South", "Center"];
  const priorities = ["Low", "Medium", "High", "Critical"];

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Enter alertt name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={arena}
        onChange={(e) => setArena(e.target.value as ArenaFilter)}
      >
        <option value="All">All arenas</option>
        {arenas.map((selected) => (
          <option key={selected} value={selected}>
            {selected}
          </option>
        ))}
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as PriorityFilter)}
      >
        <option value="All">All priorities</option>
        {priorities.map((selected) => (
          <option key={selected} value={selected}>
            {selected}
          </option>
        ))}
      </select>
    </div>
  );
}
