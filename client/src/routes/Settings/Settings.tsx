import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { Role, User } from "../../models/user.types";
import { getAllUsers, updateUserRole } from "../../services/api/usersApi";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { isAdmin } from "../../utils/users.utils";

export const Settings: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      await reloadUsers();
    };

    fetchData();
  }, []);

  const reloadUsers = async () => {
    const allUsers = await getAllUsers();

    setUsers(allUsers.data);
    setLoading(false);
  };

  const handleChangeAdminRole = (user: User) => {
    if (user._id && window.confirm("Chcete změnit roli?")) {
      const newRole = isAdmin(user.role)
        ? user.role.filter((r) => r !== Role.ADMIN)
        : [...user.role, Role.ADMIN];

      updateUserRole(user._id, newRole).then(() => reloadUsers());
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Nastavení</h1>

      <TableContainer component={Paper}>
        <Table aria-label="Seznam uživatelů">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Jméno</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Akce</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={`${user._id}`}>
                <StyledTableCell scope="row">{user.name}</StyledTableCell>
                <StyledTableCell scope="row">{user.email}</StyledTableCell>
                <StyledTableCell scope="row">
                  {user.role.join(", ")}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {isAdmin(user.role) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleChangeAdminRole(user)}
                      startIcon={<SupervisorAccountIcon />}
                    >
                      Odebrat ADMIN roli
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleChangeAdminRole(user)}
                      startIcon={<SupervisorAccountIcon />}
                    >
                      Přidat ADMIN roli
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
