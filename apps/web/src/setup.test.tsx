import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Web App Verification', () => {
    it('sets up the test environment correctly', () => {
        expect(true).toBe(true);
    });

    it('can render a dummy element', () => {
        render(<div data-testid="test">Hello World</div>);
        expect(screen.getByTestId('test')).toHaveTextContent('Hello World');
    });
});
