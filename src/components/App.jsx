import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { useState } from 'react';

import { StyledApp } from './App.styled';

export const App = () => {
  const [searchedImageName, setSearchedImageName] = useState('');

  const handleSearchSubmit = searchedImageName => {
    setSearchedImageName(searchedImageName);
  };

  return (
    <StyledApp>
      <Searchbar handleSearchSubmit={handleSearchSubmit} />

      <ImageGallery searchedImageName={searchedImageName} />
    </StyledApp>
  );
};
