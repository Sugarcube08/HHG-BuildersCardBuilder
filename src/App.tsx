'use client';

import React from 'react';
import { useBuilder } from './context/BuilderContext';
import { PageShell } from './components/layout/PageShell';
import { StepLanding } from './components/flow/StepLanding';
import { StepUpload } from './components/flow/StepUpload';
import { StepDetails } from './components/flow/StepDetails';
import { StepPreview } from './components/flow/StepPreview';
import { StepVerify } from './components/flow/StepVerify';

const FlowRenderer: React.FC = () => {
  const { currentStep } = useBuilder();

  switch (currentStep) {
    case 'LANDING':
      return <StepLanding />;
    case 'UPLOAD':
      return <StepUpload />;
    case 'DETAILS':
      return <StepDetails />;
    case 'PREVIEW':
    case 'DOWNLOAD':
    case 'SHARE':
      return <StepPreview />;
    case 'VERIFY':
      return <StepVerify />;
    default:
      return <StepLanding />;
  }
};

export function App() {
  return (
    <PageShell>
      <FlowRenderer />
    </PageShell>
  );
}

export default App;
