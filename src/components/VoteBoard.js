import React, { useState, useEffect } from 'react';
import { db, collection, query, where, orderBy, onSnapshot, updateDoc, doc, increment } from '../firebase';

export default function VoteBoard({ challengeId }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'submissions'), where('challengeId', '==', challengeId), orderBy('votes', 'desc'));
    return onSnapshot(q, snap => setSubs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  }, [challengeId]);

  return (
    <div>
      {subs.map(s => (
        <div key={s.id} className="card">
          <img src={s.url} alt="" />
          <p>Votes: {s.votes}</p>
          <button onClick={() => updateDoc(doc(db, 'submissions', s.id), { votes: increment(1) })}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
}
