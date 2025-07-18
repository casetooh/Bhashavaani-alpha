
// BHAशाVAनी Alpha App - Simplified React Native Source Code
// Features: Voice input/output, multi-language translation, shortform detection

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLang, setSelectedLang] = useState('hi'); // default to Hindi

  const expandShortForm = (text) => {
    return text
      .replace(/tm/gi, 'tum')
      .replace(/kha/gi, 'kahan')
      .replace(/r u/gi, 'are you')
      .replace(/h\?/gi, 'ho?');
  };

  const translateText = (text, lang) => {
    if (lang === 'hi') return 'हिंदी अनुवाद: ' + text;
    if (lang === 'id') return 'Terjemahan Indonesia: ' + text;
    if (lang === 'ar') return 'ترجمة عربية: ' + text;
    if (lang === 'ru') return 'Русский перевод: ' + text;
    if (lang === 'tl') return 'Filipino translation: ' + text;
    if (lang === 'ur') return 'اردو ترجمہ: ' + text;
    return 'English: ' + text;
  };

  const handleTranslate = () => {
    const expanded = expandShortForm(inputText);
    const translated = translateText(expanded, selectedLang);
    setTranslatedText(translated);
    Speech.speak(translated, { language: selectedLang });
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>BHAशाVAनी Alpha 🌐</Text>

      <TextInput
        placeholder="Type or paste your message"
        value={inputText}
        onChangeText={setInputText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Select Output Language:</Text>
      <ScrollView horizontal>
        {['hi', 'en', 'id', 'tl', 'ar', 'ur', 'ru'].map((lang) => (
          <Button
            key={lang}
            title={lang.toUpperCase()}
            onPress={() => setSelectedLang(lang)}
            color={selectedLang === lang ? 'green' : 'gray'}
          />
        ))}
      </ScrollView>

      <Button title="🔁 Translate & Speak" onPress={handleTranslate} />

      {translatedText !== '' && (
        <Text style={{ marginTop: 20, fontSize: 18 }}>{translatedText}</Text>
      )}
    </ScrollView>
  );
}
