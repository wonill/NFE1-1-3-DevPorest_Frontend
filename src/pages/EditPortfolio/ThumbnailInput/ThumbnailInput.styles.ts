import styled from "@emotion/styled";

export const ThumbnailInputWrapper = styled.div`
  label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  img {
    width: 1.5rem;
    object-fit: cover;
  }
  input[type="file"] {
    display: none;
  }
`;
