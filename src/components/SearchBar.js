import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

export default function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function goSearch(event) {
    event.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  }

  return (
    <SearchBarBox>
      <form onSubmit={goSearch}>
        <input
          type="text"
          placeholder="Search products here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <HiSearch
          onClick={() => {
            navigate(`/search/${search}`);
            setSearch("");
          }}
        />
      </form>
    </SearchBarBox>
  );
}

const SearchBarBox = styled.div`
  position: relative;
  border-radius: 6px;
  background-color: #b9b9b9;

  input {
    width: 550px;
    background: none;
    border: 0;
    padding: 10px 15px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-family: "Montserrat";
    }
  }
  svg {
    width: 25px;
    height: 25px;
    color: #3b3b3c;
    top: 3px;
    right: 9px;
    position: absolute;
    cursor: pointer;
  }

  @media (max-width: 890px) {
    input {
      width: 350px;
      font-size: 10px;
    }
  }
  @media (max-width: 680px) {
    input {
      width: 190px;
    }
    svg {
      width: 15px;
      height: 15px;
    }
  }
  @media (max-width: 425px) {
    input {
      width: 100px;
    }
  }
`;
