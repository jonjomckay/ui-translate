import React from 'react';
import Table from 'react-bootstrap/Table';

interface FlowElementTableProps {
    elements: React.ReactNode[]
    title: string
}

const FlowElementTable: React.FC<FlowElementTableProps> = ({ elements, title }) => (
    <div>
        <h5>{ title }</h5>

        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Translations</th>
            </tr>
            </thead>

            <tbody>
            { elements }
            </tbody>
        </Table>
    </div>
);

export default FlowElementTable;
