import { Element } from './FlowRedux';
import React from 'react';
import FlowElementButton from './FlowElementButton';

interface FlowElementRowProps {
    element: Element
    flow: string
    kind: string
    setCurrentElement(element: Element, kind: string): void
}

const FlowElementRow: React.FC<FlowElementRowProps> = ({ element, flow, kind, setCurrentElement }) => (
    <tr key={ element.id }>
        <td className="col-lg-10" style={{ verticalAlign: 'middle' }}>
            { element.developerName }
        </td>
        <td className="col-lg-2">
            <FlowElementButton flow={ flow } kind={ kind } element={ element } setCurrentElement={ setCurrentElement } />
        </td>
    </tr>
);

export default FlowElementRow;
