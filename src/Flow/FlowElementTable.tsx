import React from 'react';
import Table from 'react-bootstrap/Table';

interface FlowElementTableProps {
    elements: React.ReactNode[]
    title: string
}

const FlowElementTable: React.FC<FlowElementTableProps> = ({ elements, title }) => (
    <div>
        <h4 className="mb-3">{ title }</h4>

        <Table>
            <tbody>
            { elements }
            </tbody>
        </Table>
    </div>
);

export default FlowElementTable;
