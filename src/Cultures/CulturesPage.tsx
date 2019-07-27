import React from 'react';
import { connect } from 'react-redux';
import { deleteCulture, loadCultures, setCultureToDelete, toggleCulturesDeleting } from './CulturesRedux';
import { AppState } from '../store';
import { Culture } from '../Flow/FlowRedux';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import CulturesRow from './CulturesRow';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-navi';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Modal from 'react-bootstrap/Modal';
import LoadableButton from '../LoadableButton';

interface CulturesPageProps {
    cultureToDelete?: Culture
    cultures: Culture[]
    isDeleting: boolean
    isLoading: boolean

    deleteCulture(culture?: Culture): void
    loadCultures(): void;
    setCultureToDelete(culture: Culture): void
    toggleCulturesDeleting(): void
}

class CulturesPage extends React.Component<CulturesPageProps> {
    componentDidMount(): void {
        this.props.loadCultures();
    }

    onClickDelete = () => {
        this.props.deleteCulture(this.props.cultureToDelete);
    };

    onToggleDelete = () => {
        this.props.toggleCulturesDeleting();
    };

    onTriggerDelete = (culture: Culture) => {
        this.props.setCultureToDelete(culture);
    };

    render() {
        const { cultureToDelete, isDeleting, isLoading } = this.props;

        if (isLoading) {
            return (
                <div style={ { marginTop: '4rem', textAlign: 'center' } }>
                    <Spinner animation="border" />
                </div>
            )
        }

        const cultures = this.props.cultures.sort((a, b) => a.developerName.localeCompare(b.developerName)).map((culture: Culture) => (
            <CulturesRow culture={ culture } onClickDelete={ this.onTriggerDelete } />
        ));

        return (
            <div>
                <Modal show={ !!cultureToDelete } onHide={ this.onToggleDelete }>
                    <ModalHeader closeButton>
                        <ModalTitle>Delete Culture</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        <p>Are you sure you want to delete the culture <strong>{ cultureToDelete && cultureToDelete.developerName }</strong>?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary">Cancel</Button>

                        <LoadableButton onClick={ this.onClickDelete } isLoading={ isDeleting } variant="danger">
                            Delete
                        </LoadableButton>
                    </ModalFooter>
                </Modal>

                <Row className="mb-3">
                    <Col lg={ 10 }>
                        <h2 className="mb-0">Cultures</h2>
                    </Col>

                    <Col lg={ 2 } className="text-right">
                        <Button as={ Link } href="/cultures/new">
                            <IoMdAdd /> New Culture
                        </Button>
                    </Col>
                </Row>

                <Table>
                    <tbody>
                    { cultures }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    cultureToDelete: state.cultures.cultureToDelete,
    cultures: state.cultures.cultures,
    isDeleting: state.cultures.isDeleting,
    isLoading: state.cultures.isLoading
});

const mapDispatchToProps = ({
    deleteCulture,
    loadCultures,
    setCultureToDelete,
    toggleCulturesDeleting
});

export default connect(mapStateToProps, mapDispatchToProps)(CulturesPage);
