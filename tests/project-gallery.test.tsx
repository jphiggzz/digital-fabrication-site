import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectGalleryPage from '@/pages/student/project-gallery';
import { ChakraProvider } from '@chakra-ui/react';

describe('ProjectGalleryPage', () => {
  const renderProjectGalleryPage = () => {
    render(
      <ChakraProvider>
        <ProjectGalleryPage />
      </ChakraProvider>
    );
  };

  it('renders the project gallery page with project cards', () => {
    renderProjectGalleryPage();
    expect(screen.getByText('Project Gallery')).toBeInTheDocument();

    const projectTitles = ['Boat', 'Cup Holder', 'Dinosaur'];
    projectTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const downloadLinks = screen.getAllByText('Download this Print');
    expect(downloadLinks.length).toBe(3);
    downloadLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/download');
    });
  });
});
