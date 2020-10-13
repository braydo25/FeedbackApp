import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, LayoutAnimation, Keyboard, StyleSheet } from 'react-native';
import FieldLabel from './FieldLabel';
import Image from './Image';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default class SelectField extends Component {
  state = {
    open: false,
  }

  _toggle = () => {
    Keyboard.dismiss();

    LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'));

    this.setState({ open: !this.state.open });
  }

  _onOptionPress = option => {
    const { onOptionPress } = this.props;

    this._toggle();

    if (onOptionPress) {
      onOptionPress(option);
    }
  }

  render() {
    const { label, labelPrefix, labelPostfix, info, options, selectedOption, style } = this.props;
    const { open } = this.state;

    return (
      <View style={[ styles.container, style ]}>
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

        <View style={(open) ? styles.inputContainerFocused : null}>
          <TouchableOpacity
            onPress={this._toggle}
            style={[
              styles.field,
              (open) ? styles.fieldOpen : null,
            ]}
          >
            <Text style={[
              styles.selectedOptionText,
              (!selectedOption) ? styles.selectedOptionTextPlaceholder : null,
            ]}>
              {(selectedOption) ? options.find(option => option.value === selectedOption).text : 'Select a genre'}
            </Text>

            <Image source={require('../assets/images/caret-down.png')} style={styles.caretIcon} />
          </TouchableOpacity>

          {open && (
            <ScrollView
              nestedScrollEnabled
              style={styles.optionsScrollview}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  onPress={() => this._onOptionPress(option)}
                  key={index}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{option.text}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  caretIcon: {
    height: 11,
    width: 15,
  },
  container: {
    width: '100%',
  },
  field: {
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 22,
  },
  fieldLabelContainer: {
    marginBottom: 16,
  },
  fieldOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    borderColor: '#7C4BCE',
    borderWidth: 2,
    padding: 16,
  },
  inputContainerFocused: {
    borderColor: 'rgba(124, 75, 206, 0.2)',
    borderRadius: 19,
    borderWidth: 4,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  optionText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
  optionsScrollview: {
    backgroundColor: '#F6F6F6',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: '#7C4BCE',
    borderWidth: 2,
    height: 250,
  },
  selectedOptionText: {
    color: '#000000',
    flex: 1,
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
  selectedOptionTextPlaceholder: {
    color: '#4D4D4D',
    fontFamily: 'SFProDisplay-Regular',
  },
});
