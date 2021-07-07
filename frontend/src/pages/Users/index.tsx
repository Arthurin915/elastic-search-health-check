import { Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/services/user";
import DeleteUserDialog from "../../components/DeleteUser";
import InsertUserDialog from "../../components/RegisterUser";
import UpdateUserDialog from "../../components/UpdateUser";
import { IUser } from "../../models";
const Users: React.FC = () => {
  const [users, setUsers] = useState([] as IUser[]);

  const getAllUsersFromServer = async () => {
    setUsers(await getAllUsers());
  };

  useEffect(() => {
    getAllUsersFromServer();
  }, []);

  return (
    <div>
      <Grid
        container
        justifyContent="flex-end"
        spacing={3}
        style={{ marginBottom: 20 }}
      >
        <Grid item xs={2}>
          <Paper>
            <Grid container justifyContent="center">
              <Grid item>
                <InsertUserDialog onAdd={getAllUsersFromServer} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        {users.map((user, index) => (
          <Grid item xs={12} key={index} style={{ marginBottom: 15 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Paper style={{ padding: 15 }}>
                  {user.email} | {user.access_level}
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <UpdateUserDialog
                        userInfo={user}
                        onUpdate={getAllUsersFromServer}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <DeleteUserDialog onDelete={getAllUsersFromServer} userId={user.id} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Users;
