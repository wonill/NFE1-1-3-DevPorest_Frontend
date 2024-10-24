import React from 'react';
import { Global, css } from '@emotion/react';
import { global } from './styles/reset';

const App: React.FC = () => {
  return (
    <div>
      <Global
        styles={css`
          ${global}
        `}
      />
    </div>
  );
};

export default App;
