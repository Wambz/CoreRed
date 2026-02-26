import React from 'react';

interface MpesaTillBadgeProps {
  className?: string;
}

const MpesaTillBadge: React.FC<MpesaTillBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`mpesa-badge-wrapper ${className}`}>
      <div className="mpesa-badge">
        {/* Lipa Na M-Pesa Header */}
        <div className="mpesa-badge-header">
          <span className="mpesa-lipa-text">LIPA NA</span>
          <svg viewBox="0 0 120 32" className="mpesa-logo-svg" aria-label="M-Pesa logo">
            <rect x="0" y="0" width="120" height="32" rx="4" fill="transparent" />
            <text x="4" y="23" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="white">m</text>
            <rect x="18" y="6" width="14" height="20" rx="2" fill="white" opacity="0.3" />
            <rect x="20" y="8" width="10" height="16" rx="1" fill="white" opacity="0.2" />
            <path d="M22 14 L26 10 L30 14" stroke="#DC143C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <text x="36" y="23" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="white">pesa</text>
          </svg>
        </div>
        {/* Till Info */}
        <div className="mpesa-badge-body">
          <span className="mpesa-till-label">BUY GOODS TILL NUMBER</span>
          <span className="mpesa-till-number">4262280</span>
        </div>
      </div>

      <style>{`
        .mpesa-badge-wrapper {
          display: inline-block;
        }

        .mpesa-badge {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(76, 175, 80, 0.25), 0 0 0 1px rgba(76, 175, 80, 0.15);
          animation: mpesaGlow 2.5s ease-in-out infinite;
          min-width: 200px;
          max-width: 240px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .mpesa-badge:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 32px rgba(76, 175, 80, 0.4), 0 0 0 2px rgba(76, 175, 80, 0.3);
        }

        .mpesa-badge-header {
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
        }

        .mpesa-lipa-text {
          color: white;
          font-weight: 900;
          font-size: 14px;
          letter-spacing: 1.5px;
          font-family: Arial, sans-serif;
        }

        .mpesa-logo-svg {
          height: 26px;
          width: auto;
        }

        .mpesa-badge-body {
          background: white;
          padding: 12px 16px 14px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mpesa-till-label {
          font-size: 9px;
          font-weight: 700;
          color: #333;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: Arial, sans-serif;
        }

        .mpesa-till-number {
          font-size: 32px;
          font-weight: 900;
          color: #111;
          letter-spacing: 3px;
          font-family: 'Arial Black', Arial, sans-serif;
          line-height: 1.1;
        }

        @keyframes mpesaGlow {
          0%, 100% {
            box-shadow: 0 4px 24px rgba(76, 175, 80, 0.25), 0 0 0 1px rgba(76, 175, 80, 0.15);
          }
          50% {
            box-shadow: 0 4px 36px rgba(76, 175, 80, 0.5), 0 0 16px rgba(76, 175, 80, 0.3), 0 0 0 2px rgba(76, 175, 80, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default MpesaTillBadge;
