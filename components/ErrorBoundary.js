import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
  }

  // This is ErrorBoundary lifecycle to safely catch errors in the application whithout breaking the app, this lifecycle takes in error as an args
  componentDidCatch(error) {
    console.log(error);
    this.setState({ error: true });
  }

  render() {
    // This only fires when component catches an error
    if (this.state.error) {
      return <p>Something went wrong!</p>;
    }

    // Error boundary component used to wrap error prone components hence we return this.props.children to enable child componentsto render.
    return this.props.children;
  }
}
