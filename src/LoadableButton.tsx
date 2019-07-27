import * as React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface LoadableButtonProps {
    onClick(...args: any[]): void

    isLoading: boolean
}

const LoadableButton: React.FunctionComponent<LoadableButtonProps & ButtonProps> = ({ children, isLoading, onClick, ...props }) => {
    let spinner;
    if (isLoading) {
        spinner = <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
    }

    return (
        <Button disabled={ isLoading } onClick={ onClick } { ...props }>
            { spinner || children }
        </Button>
    );
};

export default LoadableButton;
