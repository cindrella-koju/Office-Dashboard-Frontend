import React from "react";
import useFetch from "../hooks/useFetch";

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }

const UsersList: React.FC = () => {
  const { data: users, loading, error } = useFetch("http://127.0.0.1:8000/test/createfield?page=event");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
    console.log("Users:",users)
  return (
    <ul>
      {/* {users?.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))} */}
      <h1>fsdfss</h1>
    </ul>
  );
};

export default UsersList;
