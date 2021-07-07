import { MenuItem, Select } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { registerUser, updateUser } from "../../api/services/user";
import { IUser } from "../../models";
import UpdateUserProps from "./interfaces";

const initialState = {
  email: "",
  access_level: "",
  password: "",
} as IUser;

const UpdateUserDialog: React.FC<UpdateUserProps> = ({onUpdate, userInfo}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(userInfo);

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const isFormValid = checkFormIsValid();
      if (isFormValid) {
        await updateUser(form);
        onUpdate();
        handleClose();
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
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the infos bellow to update the user.
          </DialogContentText>
          <form id="update-user-form" onSubmit={onSubmitForm}>
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
          <Button form="update-user-form" type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateUserDialog;
