import React, { useState, useEffect } from 'react';
import MainButtons from './MainButtons';
import HintsSection from './HintsSection';
import RevealAnswerSection from './RevealAnswerSection';
import ChatSection from './ChatSection';
import ReviseSection from './ReviseSection';
import { getProblemDetails } from '../utils/leetcodePageParser';
import { FaSpinner } from 'react-icons/fa';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [problemDetails, setProblemDetails] = useState(getProblemDetails());
  const [loadingProblem, setLoadingProblem] = useState(false);

  useEffect(() => {
    const handleUrlChange = () => {
      setLoadingProblem(true);
      const newDetails = getProblemDetails();
      if (newDetails && newDetails.title !== problemDetails?.title) {
        setProblemDetails(newDetails);
        setActiveSection(null);
      }
      setLoadingProblem(false);
    };

    const observer = new MutationObserver(handleUrlChange);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [problemDetails]);

  if (loadingProblem) {
    return (
      <div className="extension-section">
        <FaSpinner className="spinner" /> Loading problem details...
      </div>
    );
  }

  if (!problemDetails) {
    return <div className="extension-section">Could not detect a LeetCode problem.</div>;
  }

  return (
    <div className="leetcode-extension-app">
      <MainButtons activeSection={activeSection} onSectionChange={setActiveSection} />
      {activeSection === 'hints' && (
        <HintsSection problemDetails={problemDetails} />
      )}
      {activeSection === 'reveal' && (
        <RevealAnswerSection problemDetails={problemDetails} />
      )}
      {activeSection === 'chat' && (
        <ChatSection problemTitle={problemDetails.title} />
      )}
      {activeSection === 'revise' && (
        <ReviseSection />
      )}
    </div>
  );
};

export default App;