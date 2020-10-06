import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Image from './Image';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;

export default class Header extends Component {
  render() {
    const { scene } = this.props;
    const { descriptor } = scene;
    const { options } = descriptor;
    const params = scene.route.params || {};
    const title = options.title || params.title;
    const { rightButtonTitle, rightButtonComponent, showRightLoading, onRightButtonPress, backEnabled, closeEnabled } = Object.assign({}, options, params);

    return (
      <SafeAreaView>
        <BlurView intensity={50} tint={'light'} style={styles.container}>
          <View style={styles.headerLeft}>
            {(backEnabled || closeEnabled) && (
              <TouchableOpacity onPress={() => navigationHelper.pop()} style={styles.backButton}>
                {closeEnabled && (
                  <Image
                    source={require('../assets/images/close.png')}
                    resizeMode={'contain'}
                    style={styles.closeIcon}
                  />
                )}

                {!closeEnabled && (
                  <Image
                    source={require('../assets/images/back.png')}
                    resizeMode={'contain'}
                    style={styles.backIcon}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.headerCenter}>
            {!!title && typeof title === 'string' && (
              <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
            )}

            {React.isValidElement(title) && title}
          </View>

          <View style={styles.headerRight}>
            {(!!rightButtonTitle || !!rightButtonComponent) && (
              <TouchableOpacity disabled={showRightLoading} onPress={onRightButtonPress}>
                {!showRightLoading && !rightButtonComponent && (
                  <Text style={styles.rightButtonText}>{rightButtonTitle}</Text>
                )}

                {!showRightLoading && !!rightButtonComponent && (
                  rightButtonComponent
                )}

                {showRightLoading && (
                  <ActivityIndicator color={'#000000'} />
                )}
              </TouchableOpacity>
            )}
          </View>
        </BlurView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
  },
  backIcon: {
    height: 16,
    width: 12,
  },
  closeIcon: {
    height: 18,
    width: 18,
  },
  container: {
    alignItems: 'center',
    // TODO: lets do an expo blurview.
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 3,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingVertical: 10,
  },
  headerLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 100,
  },
  headerRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 100,
  },
  rightButtonText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 20,
  },
  titleText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
});
