import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FieldLabel from './FieldLabel';

export default class TextField extends Component {
  state = {
    focused: false,
  }

  _onFocus = () => {
    const { onFocus } = this.props;

    this.setState({ focused: true });

    if (onFocus) {
      onFocus();
    }
  }

  _onBlur = () => {
    const { onBlur } = this.props;

    this.setState({ focused: false });

    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { focused } = this.state;
    const { label, labelPrefix, labelPostfix, inputPrefix, info, error, value, onFocus, onBlur, containerStyle, style, ...props } = this.props;

    return (
      <View style={[ styles.container, containerStyle ]}>
        {label && (
          <FieldLabel
            info={info}
            prefix={labelPrefix}
            postfix={labelPostfix}
            containerStyle={styles.fieldLabelContainer}
          >
            {label}
          </FieldLabel>
        )}

        <View
          style={[
            styles.textInputContainer,
            (focused) ? styles.textInputContainerFocused : null,
          ]}
        >
          <View
            style={[
              styles.textInputInnerContainer,
              (focused) ? styles.textInputInnerContainerFocused : null,
            ]}
          >
            {!!inputPrefix && (
              <View style={(focused) ? styles.inputPrefixFocused : null}>
                {inputPrefix}
              </View>
            )}

            <TextInput
              onFocus={this._onFocus}
              onBlur={this._onBlur}
              placeholderTextColor={'#4D4D4D'}
              style={[
                styles.textInput,
                (focused) ? styles.textInputFocused : null,
                (!value) ? styles.textInputPlaceholder : null,
                style,
              ]}
              value={value}
              ref={component => this.textInputComponent = component}
              {...props}
            />
          </View>
        </View>

        {!!error && (
          <Text style={[ styles.subtext, styles.errorText ]}>{error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  errorText: {
    color: '#F53333',
  },
  fieldLabelContainer: {
    marginBottom: 16,
  },
  inputPrefixFocused: {
    marginLeft: -6,
  },
  textInput: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 16,
    padding: 22,
    paddingBottom: 22, // multiline fix
    paddingTop: 22, // multiline fix
    width: '100%',
  },
  textInputContainer: {
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    flexDirection: 'row',
  },
  textInputContainerFocused: {
    borderColor: 'rgba(124, 75, 206, 0.2)',
    borderWidth: 4,
  },
  textInputFocused: {
    paddingBottom: 16, // multiline fix
    paddingRight: 16,
    paddingTop: 16, // multiline fix
  },
  textInputInnerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  textInputInnerContainerFocused: {
    borderColor: '#7C4BCE',
    borderRadius: 13,
    borderWidth: 2,
  },
  textInputPlaceholder: {
    fontFamily: 'SFProDisplay-Regular',
  },
});
