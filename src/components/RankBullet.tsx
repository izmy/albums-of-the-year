import React from "react";
import styled from "styled-components";

const StyledRankBullet = styled.span<{ size: number }>`
  background: #007dc5;
  color: white;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 0.9rem;
`;

interface RankBulletProps {
  value: string | number;
  size: number;
}

export const RankBullet: React.FC<RankBulletProps> = ({ value, size }) => (
  <StyledRankBullet size={size}>{value}.</StyledRankBullet>
);
