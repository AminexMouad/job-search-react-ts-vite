import { render, screen } from '@testing-library/react';
import Tag from '../../components/Tag';

describe('Tag', () => {
  it('should render component correctly', () => {
    render(<Tag name='Tag name' value='Tag value' />);

    const tagNameText = screen.getByText((content: string, element) => {
      element = element as Element;
      return (
        element.tagName.toLowerCase() === 'p' && content.includes('Tag name')
      );
    });
    const tagValueText = screen.getByText('Tag value');

    expect(tagNameText).toBeInTheDocument();
    expect(tagValueText).toBeInTheDocument();
  });
});
