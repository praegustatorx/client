import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <DateTimePicker
      value={date}
      mode="date"
      display="default"
      onChange={onChange}
      design="material"
      accentColor="green"
    />
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default DatePicker;
