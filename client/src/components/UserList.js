import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Modal, Table, Button } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import Select from "react-select";

const UserList = ({ users, ROLE, setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setUserId] = useState("");

  const handleShowEditModal = (user) => {
    setUserId(user._id);
    setUsername(user.username);
    setShowEditModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    handleCloseEditModal();

    try {
      if (!password || !role.value) {
        toast.error("Username, password, and role are required");
        return;
      }
      const updatedUser = { username, password, role: role.value };
      const { data } = await api.put(`/api/users/${userId}`, updatedUser);
      setUsers(users.map((user) => (user._id === userId ? data : user)));
      setUserId(null);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete user");
    }
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  return (
    <>
      <Table bordered={false} className="bg-transparent">
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        {users.map((user, i) => (
          <tbody key={user._id}>
            <tr>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <MdOutlineModeEditOutline
                  style={{ marginRight: "5px", cursor: "pointer" }}
                  onClick={() => handleShowEditModal(user)}
                />
                <RiDeleteBin2Line
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseEditModal}>
            Close
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleUpdate}
            type="submit"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
