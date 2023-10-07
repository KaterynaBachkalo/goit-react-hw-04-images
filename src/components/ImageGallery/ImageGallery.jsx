import { StyledImageGallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { useState, useEffect } from 'react';
import { findImagesByName } from '../../services/api';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ searchedImageName }) => {
  const [images, setImages] = useState(null);
  const [totalImages] = useState(500);
  const [totalImagesPerPage, setTotalImagesPerPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [prevImageName, setPrevImageName] = useState('');

  function resetState() {
    setCurrentPage(1);
    setImages(null);
    setTotalImagesPerPage(null);
    setError(null);
  }

  useEffect(() => {
    if (searchedImageName && prevImageName === searchedImageName) {
      fetchImagesByName(searchedImageName, currentPage);
    } else {
      resetState();
    }

    async function fetchImagesByName(searchedImageName, currentPage) {
      try {
        setIsLoading(true);
        const response = await findImagesByName(searchedImageName, currentPage);

        if (response.total !== 0) {
          setImages(prevImages =>
            currentPage !== 1
              ? [...prevImages, ...response.hits]
              : response.hits
          );
          setTotalImagesPerPage(prevState => prevState + response.hits.length);
          setErrorMessage(null);
        } else {
          setImages(null);
          setErrorMessage('Sorry, there are no images...');
          setCurrentPage(1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    setPrevImageName(searchedImageName);
  }, [searchedImageName, currentPage, prevImageName]);

  //---Modal----

  const onOpenModal = (largeImageURL, tags) => {
    setIsOpen(true);
    setModalImageURL(largeImageURL);
    setTags(tags);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setModalImageURL(null);
    setTags(null);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {images && (
        <StyledImageGallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              src={webformatURL}
              alt={tags}
              onOpenModal={() => onOpenModal(largeImageURL, tags)}
            />
          ))}
        </StyledImageGallery>
      )}

      {images && totalImagesPerPage <= totalImages && !isLoading && (
        <Button onClick={loadMore} />
      )}

      {isLoading && <Loader />}

      {isOpen && (
        <Modal
          imageUrl={modalImageURL}
          alt={tags}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};
