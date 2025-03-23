import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center text-center">
                <Col md={8}>
                    <h1 className="display-4 mb-4">Willkommen im Gästebuch</h1>
                    <p className="lead mb-5">
                        Hinterlasse einen freundlichen Gruss oder eine Nachricht.
                        Du kannst neue Einträge verfassen und bestehende Beiträge ansehen.
                    </p>
                    <Link to="/entries">
                        <Button variant="primary" size="lg">Zu den Einträgen</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
