import React from 'react';
import { Culture } from '../Flow/FlowRedux';
import { Link } from 'react-navi';
import Button from 'react-bootstrap/Button';

interface CulturesRowProps {
    culture: Culture
    onClickDelete(culture: Culture): void
}

const CulturesRow: React.FC<CulturesRowProps> = ({ culture, onClickDelete }) => (
    <tr key={ culture.id }>
        <td className="col-lg-10" style={{ verticalAlign: 'middle' }}>
            { culture.developerName }
        </td>
        <td className="col-lg-2 text-right">
            <Button as={ Link } href={ `/cultures/${ culture.id }` } className="mr-2">
                Edit
            </Button>
            <Button as={ Link } onClick={ () => onClickDelete(culture) } variant="danger">
                Delete
            </Button>
        </td>
    </tr>
);

export default CulturesRow;
