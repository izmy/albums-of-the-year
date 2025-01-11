import * as React from "react";
import { IconButton, Popover } from "@material-ui/core";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Result } from "../../models/results.types";
import { UserContext } from "../../services/UserContext";
import { isAdmin } from "../../utils/users.utils";
import { Vote } from "../../models/votes.types";
import { UserList } from "../../models/user.types";
import { RankBullet } from "../../components/RankBullet";
import { updateVote } from "../../services/api/votesApi";

const UsersList = styled.ul`
  margin: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UsersListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const UsersListItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type SetWriterProps = {
  result: Result;
  currentVotes: Vote[];
  users: UserList;
  onUpdateData?: (newVote: Vote) => void;
};

export const SetWriter = ({
  result,
  currentVotes,
  users,
  onUpdateData,
}: SetWriterProps) => {
  const { userData } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const showEditForm = userData?.user && isAdmin(userData?.user?.role);

  const handleSelectWriter = (vote: Vote) => {
    if (vote._id) {
      const newVote = { ...vote, write: !vote.write };
      updateVote(vote._id, newVote);

      if (onUpdateData) {
        onUpdateData(newVote);
      }
    }

    handleClose();
  };

  if (!showEditForm) {
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const votes = currentVotes.filter(
    (vote) => vote.artist === result.artist && vote.album === result.album
  );

  return (
    <>
      <IconButton size="small" color="primary" onClick={handleClick}>
        <EditIcon fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <UsersList>
          {votes.map((vote) => {
            return (
              <UsersListItem key={vote._id}>
                <UsersListItemName>
                  <RankBullet value={vote.rank} size={30} />
                  {vote.userId && users[vote.userId]?.name}
                </UsersListItemName>
                {vote.write ? (
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleSelectWriter(vote)}
                  >
                    <CheckBoxIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleSelectWriter(vote)}
                  >
                    <CheckBoxOutlineBlankIcon fontSize="small" />
                  </IconButton>
                )}
              </UsersListItem>
            );
          })}
        </UsersList>
      </Popover>
    </>
  );
};
