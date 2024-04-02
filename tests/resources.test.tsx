import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResourcesPage from '@/pages/resources';
import { ChakraProvider } from '@chakra-ui/react';

describe('ResourcesPage', () => {
  const renderResourcesPage = () => {
    render(
      <ChakraProvider>
        <ResourcesPage />
      </ChakraProvider>
    );
  };

  it('renders the resources page with resource cards', () => {
    renderResourcesPage();
    expect(screen.getByText('Resources')).toBeInTheDocument();

    const resourceTitles = ['Resource 1', 'Resource 2', 'Resource 3'];
    resourceTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const resourceDescriptions = [
      'Description of Resource 1',
      'Description of Resource 2',
      'Description of Resource 3',
    ];
    resourceDescriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('checks that resource links are correct and external', () => {
    renderResourcesPage();

    const resourceLinks = [
      'https://www.example.com/resource1',
      'https://www.example.com/resource2',
      'https://www.example.com/resource3',
    ];
    resourceLinks.forEach(link => {
      const linkElement = screen.getByRole('link', { name: link });
      expect(linkElement).toHaveAttribute('href', link);
      expect(linkElement).toHaveAttribute('target', '_blank');
    });
  });
});
