import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminResourcesPage from '@/pages/admin/resources';

describe('AdminResourcesPage', () => {
  it('renders the resources page with resource cards', () => {
    render(<AdminResourcesPage />);
    expect(screen.getByText('Admin Resources')).toBeInTheDocument();

    const resourceTitles = ['Resource 1', 'Resource 2', 'Resource 3'];
    resourceTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    expect(screen.getByText('Add Resource')).toBeInTheDocument();
  });
});
