import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Alert, Button, Text, View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';

function ManualControlScreen(props) {
    return (
        <View style={styles.contentWrapper}>
            <Text style={styles.Placeholder} >This is manual control screen (Placeholder)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
contentWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#1E1E1E'
},
Placeholder: {
    color: '#FFFFFF'
}
});

export default ManualControlScreen;