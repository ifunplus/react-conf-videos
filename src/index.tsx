import './polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from 'App';
import { ScrollToTop } from 'components';

import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

export const render = () => {
  ReactDOM.render(
    <Router>
      <RecoilRoot>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </RecoilRoot>
    </Router>,
    document.getElementById('app__container')
  );
};

render();

if (module.hot) {
  module.hot.accept('./App.tsx', () => {
    render();
  });
}
