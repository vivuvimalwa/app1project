import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';

export const CatchImage = ({ uri, placeholder, style, ...rest }) => {
    const [imageSource, setImageSource] = useState({ uri });

    useEffect(() => {
        if (!uri) return; // Exit if uri is not defined

        const loadImage = async () => {
            try {
                // Try to load image from cache
                const cachedImage = await AsyncStorage.getItem(uri);
                if (cachedImage) {
                    setImageSource({ uri: cachedImage });
                } else {
                    // Set the original image source
                    setImageSource({ uri });
                }
            } catch (error) {
                console.error('Error retrieving image from cache:', error);
            }
        };

        loadImage();
    }, [uri]);

    const handleError = async () => {
        if (!uri || !placeholder?.uri) return; // Exit if uri or placeholder.uri is not defined

        try {
            // On error, use placeholder and save placeholder to cache
            setImageSource(placeholder);
            await AsyncStorage.setItem(uri, placeholder.uri);
        } catch (error) {
            console.error('Error saving placeholder to cache:', error);
        }
    };

    const handleLoad = async () => {
        if (!uri || !imageSource.uri) return; // Exit if uri or imageSource.uri is not defined

        try {
            // On successful load, cache the image
            await AsyncStorage.setItem(uri, imageSource.uri);
        } catch (error) {
            console.error('Error caching image:', error);
        }
    };

    return (
        <Animated.Image
            source={imageSource}
            style={style}
            onError={handleError}
            onLoad={handleLoad}
            {...rest} // Pass any additional props to Image
        />
    );
};
