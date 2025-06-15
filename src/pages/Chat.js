import React, { useState, useEffect } from 'react';
import { auth, db, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from '../firebase';

export default function Chat() {
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt'));
    return onSnapshot(q, snap => setMsgs(snap.docs.map(d => d.data())));
  }, []);

  const send = () => {
    if (!newMsg.trim() || !auth.currentUser) return alert('Login first');
    addDoc(collection(db, 'chats'), {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      text: newMsg,
      createdAt: serverTimestamp()
    });
    setNewMsg('');
  };

  return (
    <div className="container">
      <h1>Public Chat</h1>
      <div className="card">
        {msgs.map((m, i) => (
          <p key={i}><strong>{m.email}:</strong> {m.text}</p>
        ))}
      </div>
      <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Message..." />
      <button onClick={send}>Send</button>
    </div>
  );
}
