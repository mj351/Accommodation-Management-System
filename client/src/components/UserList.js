import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Modal, Table, Button } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import Select from "react-select";

const UserList = ({ users, ROLE, setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [modal, setModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClose = () => {
    setModal(null);
  };
  const handleShowEditModal = (user) => {
    setUserId(user._id);
    // console.log(user);
    setUsername(user.username);

    setShowEditModal(true);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    handleCloseEditModal();

    try {
      // console.log(role);
      if (!password || !role.value) {
        setModal("username, password, and role are required");
        return;
      }
      const updatedRoom = { username, password, role: role.value };
      // // console.log({ updatedRoom });
      const { data } = await axios.put(
        `${API_BASE_URL}/api/users/${userId}`,
        updatedRoom
      );
      setUsers(users.map((user) => (user._id === userId ? data : user)));
      // toast.success("Room updated successfully");
      setUserId(null);
      setModal("User updated successfully");
    } catch (error) {
      // console.log(error);
      setModal("Failed to update user");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      // toast.success("Room deleted successfully");
      setModal("User deleted successfully");
    } catch (error) {
      setModal("Failed to delete user");
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
      <Modal show={!!modal} onHide={handleClose} variant="secondary">
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                // className="form-control"
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