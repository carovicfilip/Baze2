import UserCard from "../components/UserCard";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarGlavniUrednik from "../components/navbars/NavbarGlavniUrednik";
import { Container } from "react-bootstrap";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/user/all");
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };
  console.log(JSON.stringify(users));

  return (
    <div>
      {users.length != 0 ? (
        <>
          <NavbarGlavniUrednik />
          <Container
            fluid="lg"
            className="rounded p-5 mt-5 mb-2 bg-dark shadow "
            style={{ width: "60rem" }}
          >
            <h1 style={{ color: "white" }}>Svi korisnici</h1>
            {Array.isArray(users) &&
              users.map((user) => <UserCard key={user.id} {...user} />)}
          </Container>
        </>
      ) : (
        <>
          <NavbarGlavniUrednik />
          <p>Korisnici ne postoje. Kreirajte novinare ili urednike!</p>
        </>
      )}
    </div>
  );
};

export default AllUsers;
