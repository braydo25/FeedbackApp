import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FieldLabel from './FieldLabel';

export default class MultiSelectField extends Component {
  render() {
    const { onSelectablePress, selectables, selected, label, labelPrefix, labelPostfix, info, style } = this.props;

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
          {!!selectables && selectables.map((item, index) => (
            <TouchableOpacity
              onPress={() => onSelectablePress(item)}
              style={[
                styles.selectable,
                (selected && selected.includes(item.value)) ? styles.selectedSelectable : null,
              ]}
              key={index}
            >
              <Text
                style={[
                  styles.selectableText,
                  (selected && selected.includes(item.value)) ? styles.selectedSelectableText : null,
                ]}
              >
                {item.text}
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
    fontSize: 16,
  },
  selectedSelectable: {
    backgroundColor: '#FFFFFF',
    borderColor: '#7C4BCE',
    borderWidth: 2,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  selectedSelectableText: {
    color: '#7C4BCE',
    fontFamily: 'SFProDisplay-Medium',
  },
});
