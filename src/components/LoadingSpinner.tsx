import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const FullscreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 40px);
`;

const Container = styled.div`
  margin: 20px 0;
  text-align: center;
`;

interface LoadingSpinnerProps {
  fullscreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullscreen,
}) => {
  if (fullscreen) {
    return (
      <FullscreenContainer>
        <CircularProgress size={80} />
      </FullscreenContainer>
    );
  } else {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
};
