import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { decode } from 'html-entities';
import { DropdownBlack, EyeOff, EyeOn } from '../assets/images';
import RNText from './RNText';
import { COLORS } from '../Themes/Themes';


const RNInput = ({
  InputLabel,
  inputStyle,
  onChangeText,
  secureText,
  value,
  error,
  keyboardType,
  dropdown,
  containerStyle,
  dropdownPosition,
  disabled,
  dropdownHeight,
  placeholder,
  searchPlaceholder,
  onFocus,
  items,
  onChange,
  ...props
}) => {

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [pickerItems, setPickerItems] = useState([])
  const [focus, setFocused] = useState(false)

  useEffect(() => {
    if (items && items.length > 0) {
      setPickerItems(items.map((i) => ({ label: i.label?.length > 300 ? decode(`${i.label?.substring(0, 300).trim()}...`) : decode(i.label), value: i.value || i.business_name, icon: i.icon })))
    }
  }, [items])

  useEffect(() => {
    onFocus && onFocus(focus)
  }, [focus])

  if (dropdown) {
    return (
      <View style={containerStyle}>
        {(InputLabel !== '' && InputLabel !== undefined) && (
          <RNText style={{ marginBottom: 5, fontSize: 18, color: COLORS.headerColor, ...labelStyle }}>{InputLabel}</RNText>
        )}
        <Dropdown
          style={[{
            height: 56,
            borderColor: error ? COLORS.red : COLORS.gray4,
            borderWidth: 1,
            borderRadius: 15,
            paddingHorizontal: 10,
          }, focus && { borderColor: COLORS.primary }, disabled && { opacity: 0.5 }, { backgroundColor: COLORS.white, ...inputStyle }]}
          placeholderStyle={{
            color: props.placeholderTextColor ? props.placeholderTextColor : COLORS.textLight,
            fontFamily: 'Poppins-Regular',
          }}
          selectedTextStyle={[{
            fontFamily: 'Poppins-Regular',
            textAlign: 'left',
            color: COLORS.black,
          }]}
          autoScroll={false}
          renderRightIcon={() => (
            <View style={{ paddingHorizontal: 5 }}>
              <DropdownBlack />
            </View>
          )}
          dropdownPosition={dropdownPosition || 'auto'}
          selectedTextProps={{ numberOfLines: 1 }}
          containerStyle={[{ marginTop: Platform.OS == 'android' ? -20 : 0, backgroundColor: COLORS.white, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 15, paddingVertical: 8 }]}
          itemTextStyle={{ fontFamily: 'Poppins-Regular', color: COLORS.black, textAlign: 'left' }}
          activeColor={COLORS.white}
          renderItem={(item, selected) => (
            <View style={{ backgroundColor: selected ? COLORS.primary : COLORS.white, paddingHorizontal: 15, paddingVertical: 10, }}>
              <RNText numberOfLines={2} style={[{ fontFamily: 'Poppins-Regular', textAlign: 'left', color: selected ? COLORS.white : COLORS.black }]}>{item.label}</RNText>
            </View>
          )}
          inputSearchStyle={{ height: 40, fontFamily: 'Poppins-Regular' }}
          iconStyle={{ height: 30, width: 30 }}
          disable={disabled}

          data={(pickerItems || []).map(i => ({ label: decode(i?.label), value: i?.value }))}
          statusBarIsTranslucent={!Platform.OS === 'android'}
          {...(dropdownHeight) && { maxHeight: dropdownHeight }}
          labelField="label"
          valueField="value"
          placeholder={placeholder}

          searchPlaceholder={searchPlaceholder}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={item => {
            onChange(item);
            setFocused(false);
          }}
          {...props}
        />
        {error !== undefined && !showNoErrorMsg && (
          <View style={{ marginBottom: 0, marginTop: 2 }}>
            <RNText style={{ fontSize: 14, color: COLORS.red }}>
              {error}
            </RNText>
          </View>
        )}
      </View>
    )
  }

  if (secureText) {
    return (
      <View>
        <RNText
          style={{
            marginBottom: 10,
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
          }}>
          {InputLabel}
        </RNText>
        <TextInput
          style={[
            {
              borderWidth: 1,
              borderRightWidth: Platform.OS === 'ios' ? 1.5 : 1,
              borderColor: error ? COLORS.red : COLORS.black,
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 20,
              paddingRight: 50,
              fontSize: 18,
              marginBottom: 30,
              fontFamily: 'Poppins-Medium',
            },
            inputStyle,
          ]}
          keyboardType={keyboardType}
          secureTextEntry={passwordVisible}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={{ position: 'absolute', top: 62, right: 10 }}>
          {passwordVisible ? <EyeOff /> : <EyeOn />}
        </TouchableOpacity>
        {error !== undefined && (
          <View>
            <RNText style={{ fontSize: 14, color: COLORS.red }}>
              {error}
            </RNText>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <>
        <RNText
          style={{
            marginBottom: 10,
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
          }}>
          {InputLabel}
        </RNText>
        <TextInput
          {...props}
          style={[
            {
              borderWidth: 1,
              borderRightWidth: Platform.OS === 'ios' ? 1.5 : 1,
              borderColor: error ? COLORS.red : COLORS.black,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 15,
              paddingRight: 50,
              fontSize: 18,
              marginBottom: 30,
              fontFamily: 'Poppins-Medium',
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        {error !== undefined && (
          <View>
            <RNText style={{ fontSize: 14, color: COLORS.red }}>
              {error}
            </RNText>
          </View>
        )}
      </>
    );
  }
};

export default RNInput;