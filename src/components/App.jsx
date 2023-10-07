import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

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
