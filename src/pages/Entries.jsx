const isAdmin = window.location.hostname === 'localhost';
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

import { useState, useEffect } from 'react';
import { Container, Alert, Spinner, Card, Button, Form } from 'react-bootstrap';
import GuestbookForm from '../components/GuestbookForm.jsx';
import { getEntries, createEntry, updateEntry } from '../services/guestbookApi.js';
import formatDate from '../utils/formatDate.js';

const Entries = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: '', message: '' });

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const data = await getEntries();
            setEntries(data);
            setError(null);
        } catch (err) {
            setError('Fehler beim Laden der Einträge. Bitte später erneut versuchen.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEntry = async (entryData) => {
        try {
            const newEntry = await createEntry(entryData);
            if (newEntry) {
                setEntries(prev => [newEntry, ...prev]);
            }
        } catch (err) {
            setError('Fehler beim Speichern des Eintrags: ' + err.message);
            console.error(err);
        }
    };

    const handleStartEdit = (entry) => {
        setEditingId(entry._id);
        setEditData({ name: entry.name, message: entry.message });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({ name: '', message: '' });
    };

    const handleSaveEdit = async (id) => {
        try {
            const updated = await updateEntry(id, editData);
            if (updated) {
                setEntries(prev =>
                    prev.map(e => (e._id === id ? { ...e, ...updated } : e))
                );
                handleCancelEdit();
            }
        } catch (err) {
            setError('Fehler beim Aktualisieren des Eintrags.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Diesen Eintrag wirklich löschen?')) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/guestbook/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-key': ADMIN_KEY
                }
            });

            if (!res.ok) throw new Error('Fehler beim Löschen');

            setEntries(prev => prev.filter(e => e._id !== id));
        } catch (err) {
            setError('Fehler beim Löschen: ' + err.message);
            console.error(err);
        }
    };

    const isEditable = (dateStr) => {
        const created = new Date(dateStr);
        const now = new Date();
        const diffMinutes = (now - created) / (1000 * 60);
        return diffMinutes < 60;
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Gästebuch</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <GuestbookForm onSubmit={handleCreateEntry} />

            <h2 className="mt-5 mb-3">Einträge</h2>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Lade Einträge...</span>
                    </Spinner>
                </div>
            ) : entries.length > 0 ? (
                entries.map(entry => (
                    <Card key={entry._id} className="mb-3">
                        <Card.Body>
                            {editingId === entry._id ? (
                                <>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editData.name}
                                            onChange={e => setEditData({ ...editData, name: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Nachricht</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={editData.message}
                                            onChange={e => setEditData({ ...editData, message: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleSaveEdit(entry._id)}
                                    >
                                        Speichern
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                                        Abbrechen
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Card.Title>{entry.name}</Card.Title>
                                    <Card.Text>{entry.message}</Card.Text>
                                    <Card.Footer className="text-muted">
                                        Eingetragen am {formatDate(entry.createdAt)}
                                    </Card.Footer>
                                    {isEditable(entry.createdAt) && (
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => handleStartEdit(entry)}
                                        >
                                            Bearbeiten
                                        </Button>
                                    )}
                                    {isAdmin && (
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="mt-2 ms-2"
                                            onClick={() => handleDelete(entry._id)}
                                        >
                                            Löschen
                                        </Button>
                                    )}

                                </>
                            )}
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <Alert variant="info">Noch keine Einträge vorhanden.</Alert>
            )}
        </Container>
    );
};

export default Entries;
