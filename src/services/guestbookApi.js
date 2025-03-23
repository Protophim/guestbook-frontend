const API = import.meta.env.VITE_API_BASE_URL + '/api/guestbook';

export async function getEntries() {
  const res = await fetch(API);
  return res.ok ? res.json() : [];
}

export async function createEntry(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.ok ? res.json() : null;
}

export async function updateEntry(id, data) {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Fehler beim Aktualisieren des Eintrags');
  }

  return response.json();
}
