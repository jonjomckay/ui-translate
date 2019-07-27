import React from 'react';
import { Culture } from '../Flow/FlowRedux';
import { Link } from 'react-navi';
import Button from 'react-bootstrap/Button';

interface CulturesRowProps {
    culture: Culture
}

const CulturesRow: React.FC<CulturesRowProps> = ({ culture }) => (
    <tr key={ culture.id }>
        <td className="col-lg-10" style={{ verticalAlign: 'middle' }}>
            { culture.developerName }
        </td>
        <td className="col-lg-2">
            <Button as={ Link } href={ `/cultures/${ culture.id }` }>
                Edit
            </Button>
        </td>
    </tr>
);

export default CulturesRow;
