import { Element } from './FlowRedux';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-navi';

interface FlowElementButtonProps {
    flow: string
    element: Element
    kind: string
    setCurrentElement(element: Element, kind: string): void
}

// Extract
const FlowElementButton: React.FunctionComponent<FlowElementButtonProps> = ({ flow, element, setCurrentElement, kind }) => {
    const onClick = () => {
        setCurrentElement(element, kind);
    };

    return (
        <Button as={ Link } href={ `/flow/${ flow }/${ kind }/${ element.id }` } onClick={ onClick }>
            Translate
        </Button>
    )
};

export default FlowElementButton;
