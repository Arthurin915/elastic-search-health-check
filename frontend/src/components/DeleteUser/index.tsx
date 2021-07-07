import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FormEvent, useState } from "react";
import { deleteUser } from "../../api/services/user";
import DeleteUserProps from "./interfaces";

const DeleteUserDialog: React.FC<DeleteUserProps> = ({ onDelete, userId }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await deleteUser(userId);
      onDelete();
      handleClose();
    } catch (err) {
      alert(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wanna delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUserDialog;
