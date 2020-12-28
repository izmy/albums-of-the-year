import * as React from "react";
import styled, { css } from "styled-components";

type StyledSvgProps = {
  maxWidth: number;
  animation: boolean;
};

const StyledSvg = styled.svg<StyledSvgProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;

  @media (max-width: ${({ maxWidth }) => maxWidth + 40}px) {
    max-width: calc(100% - 40px);
    margin: 0 20px;
  }

  #text {
    fill: white;
  }

  #icons {
    stroke: white;
    stroke-width: 2;
  }

  &:hover {
    ${({ animation }) =>
      animation
        ? css`
            #text {
              animation: discoText 3s infinite alternate;
            }

            #icons {
              animation: discoIcons 3s infinite alternate;
            }
          `
        : null}
  }

  @keyframes discoText {
    0% {
      fill: white;
    }
    50% {
      fill: #eaff0d;
    }
    100% {
      fill: #33fff1;
    }
  }

  @keyframes discoIcons {
    0% {
      stroke: white;
    }
    50% {
      stroke: #33fff1;
    }
    100% {
      stroke: #ffbf48;
    }
  }
`;

interface LogoProps {
  maxWidth?: number;
  animation?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  maxWidth = 550,
  animation = true,
}) => {
  return (
    <StyledSvg viewBox="0 0 301 39" maxWidth={maxWidth} animation={animation}>
      <g fill="none" fillRule="evenodd">
        <path
          id="text"
          d="M24.61 9.342h4.75v2.673c1.679-2.032 3.683-3.048 6.012-3.048 1.238 0 2.31.257 3.217.769.907.513 1.655 1.288 2.244 2.325.845-1.037 1.759-1.812 2.741-2.325.98-.512 2.029-.769 3.145-.769 1.41 0 2.606.292 3.587.875.981.584 1.717 1.439 2.208 2.568.356.836.533 2.187.533 4.052v12.505h-5.125V17.772c0-1.941-.177-3.195-.532-3.761-.466-.738-1.188-1.107-2.167-1.107-.722 0-1.395.222-2.019.664-.625.444-1.078 1.092-1.36 1.947-.281.854-.422 2.203-.422 4.046v9.406h-5.125V18.233c0-1.905-.089-3.134-.267-3.687-.178-.553-.458-.965-.839-1.236-.381-.27-.903-.406-1.566-.406-.788 0-1.497.216-2.129.646-.633.43-1.085 1.052-1.356 1.863-.27.812-.405 2.157-.405 4.038v9.516H24.61V9.342M70.976 28.967v-2.931c-.715 1.045-1.648 1.878-2.799 2.499-1.152.62-2.362.932-3.63.932-1.306 0-2.476-.291-3.51-.871-1.034-.58-1.782-1.396-2.244-2.447-.462-1.049-.692-2.501-.692-4.354V9.342h5.125V18.4c0 2.774.091 4.472.277 5.097.185.625.526 1.119 1.025 1.484.499.366 1.131.548 1.895.548.887 0 1.676-.244 2.366-.733.69-.488 1.164-1.095 1.423-1.819.259-.724.389-2.496.389-5.319V9.342h5.125v19.625h-4.75M79.144 23.467l5.125-.813c.209 1.003.65 1.764 1.32 2.283.671.52 1.61.78 2.817.78 1.33 0 2.327-.248 2.992-.745.455-.347.684-.812.684-1.396 0-.396-.123-.725-.37-.987-.258-.248-.831-.478-1.715-.689-4.133-.93-6.752-1.776-7.86-2.537-1.537-1.054-2.305-2.52-2.305-4.397 0-1.694.662-3.116 1.986-4.27 1.324-1.152 3.373-1.729 6.145-1.729 2.65 0 4.616.431 5.897 1.295 1.281.863 2.168 2.14 2.659 3.83l-4.812.875c-.209-.767-.602-1.355-1.179-1.763-.577-.408-1.4-.612-2.467-.612-1.351 0-2.314.192-2.891.577-.392.273-.588.627-.588 1.061 0 .373.171.69.516.95.467.347 2.064.838 4.789 1.47 2.726.633 4.63 1.408 5.714 2.324 1.07.929 1.606 2.223 1.606 3.881 0 1.808-.742 3.362-2.222 4.662-1.481 1.3-3.671 1.95-6.57 1.95-2.63 0-4.716-.538-6.258-1.614-1.542-1.077-2.546-2.538-3.013-4.386M101.647 6.717h5.125V1.904h-5.125v4.813zm0 22.25h5.125V9.342h-5.125v19.625zM128.951 15.154l-5.062.938c-.172-1.015-.56-1.778-1.161-2.292-.603-.514-1.383-.771-2.342-.771-1.266 0-2.28.447-3.042 1.339-.762.893-1.143 2.386-1.143 4.478 0 2.327.386 3.97 1.157 4.93.772.961 1.801 1.441 3.087 1.441.968 0 1.761-.282 2.38-.845.618-.562 1.056-1.531 1.314-2.905l5.062.875c-.529 2.35-1.534 4.126-3.014 5.325-1.481 1.2-3.462 1.8-5.945 1.8-2.84 0-5.097-.905-6.775-2.715-1.678-1.81-2.516-4.316-2.516-7.517 0-3.238.842-5.758 2.527-7.562 1.684-1.804 3.965-2.706 6.842-2.706 2.361 0 4.236.51 5.625 1.529 1.389 1.02 2.391 2.572 3.006 4.658M131.266 23.029l3.25-.437c.172 1.311.675 2.316 1.509 3.014.834.7 1.992 1.048 3.477 1.048 1.507 0 2.626-.309 3.356-.928.73-.62 1.095-1.346 1.095-2.18 0-.748-.323-1.336-.968-1.766-.438-.294-1.549-.668-3.332-1.122-2.383-.615-4.043-1.148-4.979-1.598-.936-.45-1.644-1.072-2.125-1.867-.48-.795-.72-1.672-.72-2.633 0-.875.198-1.685.596-2.431.399-.745.934-1.364 1.608-1.857.502-.381 1.193-.705 2.075-.97.882-.265 1.825-.398 2.829-.398 1.506 0 2.832.222 3.976.665 1.145.444 1.99 1.043 2.535 1.799.545.757.921 1.769 1.13 3.036l-3.187.438c-.147-1.001-.569-1.782-1.265-2.345-.696-.562-1.673-.843-2.931-.843-1.504 0-2.576.252-3.217.754-.642.503-.962 1.091-.962 1.765 0 .429.134.815.403 1.158.269.355.684.65 1.247.883.33.123 1.289.404 2.877.846 2.308.629 3.921 1.142 4.839 1.543.917.4 1.638.983 2.161 1.747.523.763.785 1.713.785 2.845 0 1.11-.317 2.154-.95 3.133-.633.98-1.552 1.737-2.757 2.273-1.205.535-2.569.803-4.093.803-2.508 0-4.423-.535-5.744-1.607-1.323-1.072-2.161-2.661-2.518-4.768M164.511 22.654l3.365.438c-.528 2-1.517 3.552-2.966 4.656-1.449 1.104-3.292 1.656-5.526 1.656-2.838 0-5.082-.882-6.734-2.65-1.652-1.767-2.477-4.244-2.477-7.434 0-3.298.835-5.86 2.505-7.682 1.67-1.823 3.844-2.734 6.521-2.734 2.578 0 4.688.896 6.327 2.685 1.639 1.789 2.459 4.307 2.459 7.552 0 .197-.006.494-.018.888h-14.419c.123 2.142.725 3.781 1.808 4.919 1.083 1.138 2.436 1.706 4.061 1.706 1.193 0 2.217-.317 3.072-.954.856-.635 1.53-1.651 2.022-3.046zm-10.776-5.375h10.813c-.149-1.647-.561-2.882-1.236-3.707-1.046-1.278-2.4-1.918-4.06-1.918-1.514 0-2.783.511-3.811 1.531-1.027 1.021-1.595 2.385-1.706 4.094zM171.988 28.967V9.342h2.938v2.981c.737-1.391 1.421-2.309 2.05-2.753.629-.443 1.318-.666 2.068-.666 1.088 0 2.194.357 3.319 1.068l-1.14 3.042c-.782-.448-1.569-.672-2.362-.672-.697 0-1.326.218-1.884.656-.559.437-.961 1.044-1.205 1.819-.356 1.183-.534 2.476-.534 3.879v10.271h-3.25M189.788 28.967l-7.374-19.625h3.479l4.184 11.753c.457 1.269.872 2.587 1.243 3.954.295-1.034.706-2.279 1.236-3.733l4.298-11.974h3.373l-7.298 19.625h-3.141M216.347 22.654l3.365.438c-.528 2-1.517 3.552-2.966 4.656-1.449 1.104-3.292 1.656-5.526 1.656-2.838 0-5.082-.882-6.734-2.65-1.652-1.767-2.477-4.244-2.477-7.434 0-3.298.835-5.86 2.505-7.682 1.67-1.823 3.843-2.734 6.521-2.734 2.578 0 4.688.896 6.327 2.685 1.639 1.789 2.459 4.307 2.459 7.552 0 .197-.006.494-.018.888h-14.419c.123 2.142.725 3.781 1.808 4.919 1.082 1.138 2.436 1.706 4.061 1.706 1.193 0 2.217-.317 3.072-.954.856-.635 1.53-1.651 2.022-3.046zm-10.776-5.375h10.813c-.149-1.647-.561-2.882-1.236-3.707-1.046-1.278-2.4-1.918-4.06-1.918-1.514 0-2.783.511-3.811 1.531-1.027 1.021-1.595 2.385-1.706 4.094zM223.824 28.967V9.342h2.938v2.981c.737-1.391 1.421-2.309 2.05-2.753.628-.443 1.318-.666 2.068-.666 1.088 0 2.194.357 3.319 1.068l-1.14 3.042c-.782-.448-1.569-.672-2.362-.672-.697 0-1.326.218-1.884.656-.559.437-.961 1.044-1.206 1.819-.355 1.183-.533 2.476-.533 3.879v10.271h-3.25M236.991 28.967h2.984V25.72h-2.984zM258.483 15.827c-.186-2.907-2.014-4.305-5.111-4.305-3.433 0-5.559 3.625-5.559 7.93 0 4.342 2.126 8.004 5.559 8.004 2.91 0 4.925-1.812 5.111-4.417h2.426c-.597 4.342-3.059 6.494-7.313 6.494-5.597 0-8.209-4.871-8.209-10.044 0-5.135 2.799-10.043 8.358-10.043 3.843 0 6.978 2.341 7.164 6.381h-2.426M263.82 26.89l10.933-14.801H263.82v-2.077h13.582v2.077L266.544 26.89h10.858v2.077H263.82V26.89"
        />
        <path
          id="icons"
          d="M16.906 29.658c-2.264-2.593-3.633-5.988-3.633-9.703 0-3.773 1.415-7.219 3.746-9.828m-4.445 24.184c-3.34-3.831-5.364-8.84-5.364-14.325 0-5.574 2.092-10.657 5.532-14.512M8.105 38.196c-4.242-4.861-6.811-11.223-6.811-18.184 0-7.075 2.657-13.532 7.024-18.424m275.647 8.672c2.262 2.593 3.633 5.988 3.633 9.702 0 3.774-1.418 7.22-3.748 9.83m4.445-24.185c3.342 3.829 5.365 8.841 5.365 14.325 0 5.573-2.094 10.658-5.531 14.513m4.635-32.724c4.242 4.862 6.81 11.225 6.81 18.184 0 7.075-2.656 13.531-7.023 18.425"
        />
      </g>
    </StyledSvg>
  );
};
