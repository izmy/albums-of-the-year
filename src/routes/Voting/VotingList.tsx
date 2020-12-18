import * as React from "react";
import { VotingLine } from "./VotingLine";
import styled from "styled-components";
import { Vote } from "../../models/votes.types";

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

const OrderList = styled.ol`
  padding: 0;
  margin-bottom: 50px;
`;

const OrderListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 10px;
`;

interface VotingListProps {
  heading: string;
  items: Vote[];
  onSetVotingList: (vote: Vote) => void;
}

export const VotingList: React.FC<VotingListProps> = ({
  heading,
  items,
  onSetVotingList,
}) => {
  return (
    <div>
      <Title>{heading}</Title>
      <OrderList>
        {items.map((vote) => (
          <OrderListItem key={vote.rank}>
            <VotingLine vote={vote} onSetVote={onSetVotingList} />
          </OrderListItem>
        ))}
      </OrderList>
    </div>
  );
};
