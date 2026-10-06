import { useEffect } from "react";
import UserAddForm from "../components/UserAddForm";
import { useAuthStore } from "../store/authStore";
import UserList from "../components/UserList";

const AdminPage = () => {
  const user = useAuthStore((state) => state.user);
  const users = useAuthStore((state) => state.users);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const setUsers = useAuthStore((state) => state.setUsers);
  const setNewUser = useAuthStore((state) => state.setNewUser);
  const removeUser = useAuthStore((state) => state.removeUser);

  useEffect(() => {
    setUsers();
  }, [setUsers]);

  return (
    <>
      <h2>Users ({users.length})</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <UserList
        users={users}
        currentUserId={user ? user.id : ""}
        onDelete={removeUser}
      />
      <h2>Add user</h2>
      <UserAddForm onSubmit={setNewUser} />
    </>
  );
};

export default AdminPage;
