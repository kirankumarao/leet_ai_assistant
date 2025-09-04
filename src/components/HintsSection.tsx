import React, { useState } from 'react';
import { fetchHints } from '../services/geminiApi';
import { trackUsage } from '../services/reviseTracker';
import type { ProblemDetails } from '../utils/leetcodePageParser';
import { FaSpinner } from 'react-icons/fa';
import HintItem from './HintItem.tsx';

interface HintsSectionProps {
  problemDetails: ProblemDetails;
}

const HintsSection: React.FC<HintsSectionProps> = ({ problemDetails }) => {
  const [hints, setHints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchHints = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedHints = await fetchHints(problemDetails.title, problemDetails.description);
      setHints(generatedHints);
      // Track hint usage for each hint generated
      trackUsage(problemDetails.title, 'hint');
    } catch (err) {
      setError('Failed to fetch hints. Check your API key and network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="extension-section">
      <h3>Get Hints</h3>
      <p>Request AI-generated hints to guide you toward the solution without revealing the answer.</p>
      <button onClick={handleFetchHints} disabled={loading}>
        {loading ? <FaSpinner className="spinner" /> : 'Generate Hints'}
      </button>
      {error && <div className="error">{error}</div>}
      {hints.length > 0 && (
        <div className="hints-list">
          {hints.map((hint, index) => (
            <HintItem key={index} hintNumber={index + 1} content={hint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HintsSection;