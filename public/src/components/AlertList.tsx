import { Link } from "react-router-dom";
import type { Alert } from "../types/alert";

interface AlertListProps {
  alerts: Alert[];
  canDelete: boolean;
  onDelete: (id: string) => void;
}

export default function AlertList({
  alerts,
  canDelete,
  onDelete,
}: AlertListProps) {
  if (alerts.length === 0) return <p>No alerts yet...</p>;

  return (
    <table className="alerts-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Arena</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr key={alert.id}>
            <td>
              <Link to={`/alerts/${alert.id}`}>{alert.displayName}</Link>
            </td>
            <td>{alert.arena}</td>
            <td>{alert.priority}</td>
            <td>{alert.status}</td>
            <td className="actions">
              <Link to={`/alerts/${alert.id}/edit`}>Edit</Link>
              {canDelete && (
                <button type="button" onClick={() => onDelete(alert.id)}>
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
