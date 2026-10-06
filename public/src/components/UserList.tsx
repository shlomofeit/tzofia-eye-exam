import type { User } from "../types/user";

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserList = ({ users, onDelete }: UserListProps) => {
  if (users.length === 0) return <p>No users yet...</p>;

  return (
    <table className="alerts-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Arena</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.assignedArena}</td>
            <td className="actions">
              <button type="button" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
