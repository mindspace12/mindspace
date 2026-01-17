import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spacing } from '../../constants/theme';

const DailyAffirmationsScreen = ({ navigation }) => {
    const [affirmationText, setAffirmationText] = useState('');
    const [savedAffirmations, setSavedAffirmations] = useState([]);

    useEffect(() => {
        loadAffirmations();
    }, []);

    const loadAffirmations = async () => {
        try {
            const stored = await AsyncStorage.getItem('counsellor_affirmations');
            if (stored) {
                setSavedAffirmations(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading affirmations:', error);
        }
    };

    const handleSaveAffirmation = async () => {
        if (!affirmationText.trim()) {
            Alert.alert('Error', 'Please enter an affirmation');
            return;
        }

        const newAffirmation = {
            id: Date.now().toString(),
            text: affirmationText.trim(),
            date: new Date().toISOString(),
        };

        const updated = [newAffirmation, ...savedAffirmations];
        setSavedAffirmations(updated);
        setAffirmationText('');

        try {
            await AsyncStorage.setItem('counsellor_affirmations', JSON.stringify(updated));
            Alert.alert('Success', 'Affirmation saved successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to save affirmation');
        }
    };

    const handleDeleteAffirmation = async (id) => {
        Alert.alert(
            'Delete Affirmation',
            'Are you sure you want to delete this affirmation?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updated = savedAffirmations.filter(item => item.id !== id);
                        setSavedAffirmations(updated);
                        try {
                            await AsyncStorage.setItem('counsellor_affirmations', JSON.stringify(updated));
                        } catch (error) {
                            console.error('Error deleting affirmation:', error);
                        }
                    }
                }
            ]
        );
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="chevron-left" size={28} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Daily Affirmations</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.container}>
                {/* Input Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Create Today's Affirmation</Text>
                    <RNTextInput
                        style={styles.textInput}
                        value={affirmationText}
                        onChangeText={setAffirmationText}
                        placeholder="Write an inspiring affirmation for students..."
                        placeholderTextColor="#999999"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSaveAffirmation}
                    >
                        <Icon name="check" size={20} color="#FFFFFF" />
                        <Text style={styles.saveButtonText}>Save Affirmation</Text>
                    </TouchableOpacity>
                </View>

                {/* Saved Affirmations */}
                <View style={styles.affirmationsSection}>
                    <Text style={styles.sectionTitle}>Saved Affirmations</Text>
                    {savedAffirmations.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Icon name="lightbulb-outline" size={64} color="#CCCCCC" />
                            <Text style={styles.emptyText}>No affirmations yet</Text>
                            <Text style={styles.emptySubtext}>Create your first affirmation above</Text>
                        </View>
                    ) : (
                        savedAffirmations.map((affirmation) => (
                            <Card key={affirmation.id} style={styles.affirmationCard}>
                                <Card.Content>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.dateText}>{formatDate(affirmation.date)}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteAffirmation(affirmation.id)}>
                                            <Icon name="delete-outline" size={24} color="#FF6B6B" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.affirmationText}>{affirmation.text}</Text>
                                </Card.Content>
                            </Card>
                        ))
                    )}
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: 0.3,
    },
    headerSpacer: {
        width: 40,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    inputSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 12,
        letterSpacing: 0.2,
    },
    textInput: {
        backgroundColor: '#FFF4EC',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#000000',
        minHeight: 100,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    saveButton: {
        backgroundColor: '#F5A962',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        elevation: 2,
        shadowColor: '#F5A962',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
        letterSpacing: 0.3,
    },
    affirmationsSection: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 16,
        letterSpacing: 0.2,
    },
    affirmationCard: {
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#999999',
        letterSpacing: 0.2,
    },
    affirmationText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000000',
        lineHeight: 22,
        letterSpacing: 0.2,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#999999',
        marginTop: 16,
        letterSpacing: 0.2,
    },
    emptySubtext: {
        fontSize: 14,
        fontWeight: '400',
        color: '#CCCCCC',
        marginTop: 8,
        letterSpacing: 0.2,
    },
});

export default DailyAffirmationsScreen;
