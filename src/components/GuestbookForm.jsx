import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const GuestbookForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        if (name === 'name') {
            if (!value || value.trim().length < 3) {
                newErrors.name = 'Der Name muss mindestens 3 Zeichen lang sein';
            } else {
                delete newErrors.name;
            }
        }

        if (name === 'message') {
            if (!value || value.trim().length < 3) {
                newErrors.message = 'Die Nachricht muss mindestens 3 Zeichen lang sein';
            } else if (value.trim().length > 500) {
                newErrors.message = 'Die Nachricht darf maximal 500 Zeichen lang sein';
            } else {
                delete newErrors.message;
            }
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.name || formData.name.trim().length < 3) {
            newErrors.name = 'Der Name muss mindestens 3 Zeichen lang sein';
            isValid = false;
        }

        if (!formData.message || formData.message.trim().length < 3) {
            newErrors.message = 'Die Nachricht muss mindestens 3 Zeichen lang sein';
            isValid = false;
        } else if (formData.message.trim().length > 500) {
            newErrors.message = 'Die Nachricht darf maximal 500 Zeichen lang sein';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);

        if (!validateForm()) return;

        onSubmit({
            name: formData.name.trim(),
            message: formData.message.trim()
        });

        setFormData({ name: '', message: '' });
        setValidated(false);
    };

    const messageLength = formData.message.length;

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="guestName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    required
                    minLength={3}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name || 'Bitte gib deinen Namen ein (mind. 3 Zeichen).'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="guestMessage">
                <Form.Label>Nachricht</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    required
                    minLength={3}
                    maxLength={500}
                />
                <div className="d-flex justify-content-between mt-1">
                    <Form.Control.Feedback type="invalid">
                        {errors.message || 'Bitte gib eine gültige Nachricht ein (3–500 Zeichen).'}
                    </Form.Control.Feedback>
                    <small className={messageLength > 500 ? 'text-danger' : 'text-muted'}>
                        {messageLength}/500 Zeichen
                    </small>
                </div>
            </Form.Group>

            <Row>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Eintragen
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default GuestbookForm;
