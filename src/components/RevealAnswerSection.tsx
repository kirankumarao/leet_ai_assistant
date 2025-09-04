import React, { useState } from 'react';
import { fetchSolution } from '../services/geminiApi';
import { trackUsage } from '../services/reviseTracker';
import type { ProblemDetails } from '../utils/leetcodePageParser';
import { FaSpinner } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface RevealAnswerSectionProps {
  problemDetails: ProblemDetails;
}

const RevealAnswerSection: React.FC<RevealAnswerSectionProps> = ({ problemDetails }) => {
  const [solution, setSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRevealSolution = async () => {
    if (window.confirm("Are you sure? This will reveal the complete solution.")) {
      setLoading(true);
      setError(null);
      try {
        const generatedSolution = await fetchSolution(problemDetails.title, problemDetails.description);
        setSolution(generatedSolution);
        trackUsage(problemDetails.title, 'solution');
      } catch (err) {
        setError('Failed to fetch the solution. Check your API key and network connection.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="extension-section">
      <h3>Reveal Answer</h3>
      <p>Request a complete code solution for the current problem. Use this as a last resort.</p>
      <button onClick={handleRevealSolution} disabled={loading}>
        {loading ? <FaSpinner className="spinner" /> : 'Reveal Solution'}
      </button>
      {error && <div className="error">{error}</div>}
      {solution && (
        <div className="solution-container">
          <h4>Solution:</h4>
          <SyntaxHighlighter language="python" style={vscDarkPlus}>
            {solution}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default RevealAnswerSection;