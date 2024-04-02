import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminProjectGalleryPage from '@/pages/admin/project-gallery';

describe('AdminProjectGalleryPage', () => {
  it('renders the project gallery page with project cards', () => {
    render(<AdminProjectGalleryPage />);
    expect(screen.getByText('Admin Project Gallery')).toBeInTheDocument();

    const projectTitles = ['Boat', 'Cup Holder', 'Dinosaur'];
    projectTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    expect(screen.getByText('Add Print')).toBeInTheDocument();
  });
});
