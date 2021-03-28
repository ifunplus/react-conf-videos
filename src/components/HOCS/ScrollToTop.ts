import * as React from 'react';
import { withRouter } from 'react-router-dom';


class ScrollToTopInner extends React.Component<any> {
  public componentDidUpdate(prevProps: { location: Location }) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter<any, any>(ScrollToTopInner);
