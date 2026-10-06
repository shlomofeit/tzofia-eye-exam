import { useEffect } from "react";
import UserAddForm from "../components/UserAddForm";
import { useAuthStore } from "../store/authStore";

const AdminPage = () => {
  const setUsers = useAuthStore((state) => state.setUsers);
  const setNewUser = useAuthStore((state) => state.setNewUser);

  useEffect(() => {
    setUsers();
  }, [setUsers]);
  return (
    <>
      <UserAddForm onSubmit={setNewUser} />
    </>
  );
};

export default AdminPage;
