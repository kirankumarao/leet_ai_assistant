import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface HintItemProps {
  hintNumber: number;
  content: string;
}

const HintItem: React.FC<HintItemProps> = ({ hintNumber, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="hint-item">
      <div className="hint-header" onClick={() => setIsExpanded(!isExpanded)}>
        <strong>Hint {hintNumber}</strong>
        <span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isExpanded && (
        <div className="hint-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default HintItem;