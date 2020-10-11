import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FieldLabel from './FieldLabel';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default class MultiSelectField extends Component {
  render() {
    const { onOptionPress, options, selectedOptions, label, labelPrefix, labelPostfix, info, style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        {!!label && (
          <FieldLabel
            info={info}
            prefix={labelPrefix}
            postfix={labelPostfix}
            containerStyle={styles.fieldLabelContainer}
          >
            {label}
          </FieldLabel>
        )}

        <View style={styles.multiSelectContainer}>
          {!!options && options.map((option, index) => (
            <TouchableOpacity
              onPress={() => onOptionPress(option)}
              style={[
                styles.selectable,
                (selectedOptions && selectedOptions.includes(option.value)) ? styles.selectedOption : null,
              ]}
              key={index}
            >
              <Text
                style={[
                  styles.selectableText,
                  (selectedOptions && selectedOptions.includes(option.value)) ? styles.selectedOptionText : null,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  fieldLabelContainer: {
    marginBottom: 16,
  },
  multiSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectable: {
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  selectableText: {
    color: '#4D4D4D',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
  selectedOption: {
    backgroundColor: '#FFFFFF',
    borderColor: '#7C4BCE',
    borderWidth: 2,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  selectedOptionText: {
    color: '#7C4BCE',
    fontFamily: 'SFProDisplay-Medium',
  },
});
