import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class AlertDismissable extends React.Component {
  state = {
    show: true,
  };

  handleDismiss = () => {
    this.setState({ show: false });
    this.props.canShow(false);
  }

  render () {
    const { text, showAlert } = this.props;
    if (showAlert && this.state.show) {
      return (
        <Alert bsStyle="warning">
          <Button onClick={this.handleDismiss}>Hide Alert</Button>
          { text }
        </Alert>
      );
    } else {
      return (<div></div>);
    }
  }
}

export default AlertDismissable;
