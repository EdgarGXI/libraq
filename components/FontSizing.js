import React, { Component } from 'react';
import { Text, AppRegistry } from 'react-native';
import normalize from './FontNormalize';

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
      <Text style={[{fontSize: normalize(30), fontWeight: 700}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

//AppRegistry.registerComponent('NormalText', () => NormalText);