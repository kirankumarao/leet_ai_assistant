import React, { useState, useEffect } from 'react';
import { getRevisionList, markProblemAsDone } from '../services/reviseTracker';

const ReviseSection: React.FC = () => {
  const [revisions, setRevisions] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const list = getRevisionList();
    setRevisions(list);
  }, []);

  const handleMarkAsDone = (problemTitle: string) => {
    markProblemAsDone(problemTitle);
    setRevisions(revisions.filter(title => title !== problemTitle));
    setMessage(`'${problemTitle}' marked as done.`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="extension-section">
      <h3>Problems to Revise</h3>
      {message && <div className="info-message">{message}</div>}
      {revisions.length === 0 ? (
        <p>No problems to revise yet. Start solving!</p>
      ) : (
        <ul className="revise-list">
          {revisions.map((title, index) => (
            <li key={index} className="revise-item">
              <a href={`https://leetcode.com/problems/${title.replace(/\s+/g, '-').toLowerCase()}`} target="_blank" rel="noopener noreferrer" className="problem-link">
                {title}
              </a>
              <button onClick={() => handleMarkAsDone(title)}>Done</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviseSection;