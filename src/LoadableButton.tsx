import * as React from 'react';
import Button from 'react-bootstrap/Button';

interface LoadableButtonProps {
    onClick(...args: any[]): void

    isLoading: boolean
}

const LoadableButton: React.FunctionComponent<LoadableButtonProps> = ({ children, isLoading, onClick }) => {
    return (
        <Button disabled={ isLoading } onClick={ onClick }>
            { children }
        </Button>
    );
};

export default LoadableButton;
