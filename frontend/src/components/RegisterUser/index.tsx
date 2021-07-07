import React, { FormEvent, useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import { Select, MenuItem } from "@material-ui/core";
import { IUserForm } from "../../models";
import { ChangeEvent } from "react";
import { registerUser } from "../../api/services/user";
import RegisterUserProps from "./interfaces";
const initialState = {
  email: "",
  access_level: "admin",
  password: "",
} as IUserForm;

const InsertUserDialog: React.FC<RegisterUserProps> = ({onAdd}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const isFormValid = checkFormIsValid();
      if (isFormValid) {
        await registerUser(form);
        onAdd();
        alert("User inserted successfully");
      }
    } catch (err) {
      alert(err);
    }
    setForm(initialState);
  };

  const checkFormIsValid = () => {
    return Object.values(form).every((value) => !!value);
  };

  const handleFormInput = useCallback(
    (event: ChangeEvent<any>) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    },
    [form]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <PersonAddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form bellow to add a new user.
          </DialogContentText>
          <form id="register-user-form" onSubmit={onSubmitForm}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={form?.email}
              onChange={handleFormInput}
            />
            <Select
              value={form.access_level}
              onChange={handleFormInput}
              id="access_level"
              name="access_level"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              value={form?.password}
              onChange={handleFormInput}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button form="register-user-form" type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InsertUserDialog;
