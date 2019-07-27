import { Element } from './FlowRedux';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-navi';

interface FlowElementButtonProps {
    flow: string
    element: Element
    kind: string
}

const FlowElementButton: React.FunctionComponent<FlowElementButtonProps> = ({ flow, element, kind }) => {
    return (
        <Button as={ Link } href={ `/flow/${ flow }/${ kind }/${ element.id }` }>
            Translate
        </Button>
    )
};

export default FlowElementButton;
