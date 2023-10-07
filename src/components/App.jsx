import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { useState } from 'react';

import { StyledApp } from './App.styled';

export const App = () => {
  const [searchedImageName, setSearchedImageName] = useState('');
  // const [prevImageName, setPrevImageName] = useState('');
  // const [setCurrentPage] = useState(1);
  // const [setImages] = useState(null);
  // const [setTotalImagesPerPage] = useState(null);
  // const [setError] = useState(null);

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
