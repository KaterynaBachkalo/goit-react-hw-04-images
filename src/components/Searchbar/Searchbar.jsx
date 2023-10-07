import { useState } from 'react';
import { StyledSearchbar, StyledInput } from './Searchbar.styled';

export const Searchbar = ({ handleSearchSubmit }) => {
  const [searchedImageName, setSearchedImageName] = useState('');

  const handleChange = event => {
    setSearchedImageName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    handleSearchSubmit(searchedImageName);

    event.currentTarget.reset();
  };

  return (
    <StyledSearchbar>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <StyledInput
          className="input"
          name="searchedImageName"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </StyledSearchbar>
  );
};
