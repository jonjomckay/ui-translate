import { Element } from './FlowRedux';
import React from 'react';
import FlowElementButton from './FlowElementButton';

interface FlowElementRowProps {
    element: Element
    flow: string
    kind: string
}

const FlowElementRow: React.FC<FlowElementRowProps> = ({ element, flow, kind }) => (
    <tr key={ element.id }>
        <td className="col-lg-10" style={{ verticalAlign: 'middle' }}>
            { element.developerName }
        </td>
        <td className="col-lg-2">
            <FlowElementButton flow={ flow } kind={ kind } element={ element } />
        </td>
    </tr>
);

export default FlowElementRow;
