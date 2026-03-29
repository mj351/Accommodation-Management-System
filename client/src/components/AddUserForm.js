import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import UserList from "./UserList";
import { useEffect } from "react";

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const ROLE = [
    {
      label: "admin",
      value: "admin",
    },
    {
      label: "staff",
      value: "staff",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("/api/users/register", {
        username,
        password,
        role: role.value,
      });
      toast.success("User added successfully");
      setUsername("");
      setPassword("");
      setRole("");
      setLoading(false);
      await fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error.response);
      setLoading(false);
      toast.error("Error adding user");
    }
  };

  return (
    <>
      <Row>
        <Col lg={7} sm={12}>
          <Card bg="light" text="dark" className="mb-2 shadow-bottom-right">
            <Card.Header className="py-4 px-5">Users</Card.Header>
            <Card.Body
              style={{
                padding: "20px 70px 0 50px",
              }}
            >
              <Card.Title className="p-3">Users List</Card.Title>
              {loading && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              {!loading && (
                <UserList users={users} setUsers={setUsers} ROLE={ROLE} />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} sm={12}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>UserName:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <Select
                  id="userId"
                  value={role}
                  onChange={setRole}
                  options={ROLE}
                  required={true}
                  placeholder={
                    <div>
                      <span style={{ marginLeft: "10px", color: "black" }}>
                        Select Role
                      </span>
                    </div>
                  }
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: "40px",
                      borderColor: "#ced4da",
                      "&:hover": { borderColor: "#80bdff" },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#80bdff" : "white",
                      color: state.isFocused ? "white" : "black",
                    }),
                  }}
                  isSearchable={false}
                />
              </div>
              <button
                type="submit"
                className="d-block mx-auto btn btn-secondary"
              >
                Add User
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddUserForm;
