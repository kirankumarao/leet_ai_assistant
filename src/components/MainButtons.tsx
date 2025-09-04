import React from 'react';

interface MainButtonsProps {
  activeSection: string | null;
  onSectionChange: (section: 'hints' | 'reveal' | 'chat' | 'revise' | null) => void;
}

const MainButtons: React.FC<MainButtonsProps> = ({ activeSection, onSectionChange }) => {
  const getButtonClass = (section: string) => {
    return `main-button ${activeSection === section ? 'active' : ''}`;
  };

  return (
    <div className="main-buttons-container">
      <div className="button-row">
        <button className={getButtonClass('hints')} onClick={() => onSectionChange('hints')}>Hints</button>
        <button className={getButtonClass('reveal')} onClick={() => onSectionChange('reveal')}>Reveal Answer</button>
      </div>
      <div className="button-row">
        <button className={getButtonClass('chat')} onClick={() => onSectionChange('chat')}>Chat</button>
        <button className={getButtonClass('revise')} onClick={() => onSectionChange('revise')}>Revise</button>
      </div>
    </div>
  );
};

export default MainButtons;