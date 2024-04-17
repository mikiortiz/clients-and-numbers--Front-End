import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import MyApi from "../services/MyApi";
import User from "../model/UserType";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await MyApi.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item key={user._id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                usuario: {user.username}
              </Typography>
              <Typography variant="body2" component="p">
                Números asociados: {user.numbers.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersList;
