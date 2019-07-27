import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface LoadableButtonProps {
    onClick(...args: any[]): void

    isLoading: boolean
}

const LoadableButton: React.FunctionComponent<LoadableButtonProps> = ({ children, isLoading, onClick }) => {
    let spinner;
    if (isLoading) {
        spinner = <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
    }

    return (
        <Button disabled={ isLoading } onClick={ onClick }>
            { spinner || children }
        </Button>
    );
};

export default LoadableButton;
