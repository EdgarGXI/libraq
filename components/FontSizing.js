import React, { Component } from 'react';
import { Text } from 'react-native';
import normalize from './FontNormalize';

export class MiniText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text style={[{fontSize: normalize(12)}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

export class NormalText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text style={[{fontSize: normalize(14)}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

export class TitleText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text style={[{fontSize: normalize(26), fontWeight: 700}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
