import React from 'react';
import UploadForm from './UploadForm';
import VoteBoard from './VoteBoard';

const challengeList = [
  { id: 'upcycle', title: 'Upcycled Fashion' },
  { id: 'nature', title: 'Nature Walk Pic' },
  { id: 'zerowaste', title: 'Zero Waste Day' }
];

export default function Challenges() {
  return (
    <div className="container">
      <h1>Challenges</h1>
      {challengeList.map(c => (
        <div key={c.id} className="card">
          <h3>{c.title}</h3>
          <UploadForm challengeId={c.id} />
          <VoteBoard challengeId={c.id} />
        </div>
      ))}
    </div>
  );
}
