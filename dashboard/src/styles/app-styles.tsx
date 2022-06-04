import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    flex-grow: 1;

    display: flex;

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;

      @media (min-width: 576px) {
        max-width: calc(100% - (576px * 0.1));
      }

      @media (min-width: 768px) {
        max-width: calc(100% - (768px * 0.2));
      }

      @media (min-width: 992px) {
        max-width: calc(100% - 992px * 0.25);
      }

      @media (min-width: 1200px) {
        max-width: calc(100% - 1200px * 0.35);
      }

      @media (min-width: 1904px) {
        max-width: calc(100% - 1904px * 0.4);
      }
    }
  }

  a {
    color: ${({ theme }) => theme.text};
    transition: color 0.25s ease-in-out;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }

    &.btn {
      background-color: ${({ theme }) => theme.secondary};
      border: none;
    }
  }

  /* Bootstrap Button overrides */
  .btn {
    &.btn-primary {
      color: ${({ theme }) => theme.text};
      background-color: ${({ theme }) => theme.primary};
      border-color: ${({ theme }) => theme.primary};

      &:focus {
        box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.primary}1a;
      }
    }

    &.btn-secondary {
      color: ${({ theme }) => theme.text};
      background-color: ${({ theme }) => theme.secondary};
      border-color: ${({ theme }) => theme.secondary};

      &:focus {
        box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.secondary}1a;
      }
    }
  }
`;