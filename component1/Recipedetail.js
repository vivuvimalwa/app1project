import React, { useEffect, useState, useCallback } from 'react'
import { Button, FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View, Alert } from 'react-native'
import { CatchImage } from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function RecipeDetail(props) {
    let item = props.route.params;
    let itemId = item.idMeal;
    const [isfavorite, setIsfavorite] = useState(true);
    const [meald, setMealdetails] = useState({});
    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);

    const getYoutubeVideoId = url => {
        if (!url) return null; // Handle undefined or null URLs
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("Video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying(prev => !prev);
    }, []);

    useEffect(() => {
        getMealsDetails();
    }, [itemId]);

    const ingredientIndex = (meald) => {
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meald['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getMealsDetails = async () => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`);
            if (response && response.data) {
                setMealdetails(response.data.meals[0]);
            }
        } catch (error) {
            console.log('Error fetching meals:', error.message);
        }
    };

    return (
        <ScrollView className="mb-5">
            <StatusBar style={"light"} />
            <View className="flex-row justify-center">
                <CatchImage
                    uri={meald.strMealThumb}
                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: 23,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        marginTop: 2
                        
                    }}
                   
                />
            </View>
            <View className="w-full flex-row justify-between items-center absolute pt-14">
                <TouchableOpacity className="bg-white rounded-full p-2 ml-5" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-full p-1 mr-5" onPress={() => setIsfavorite(!isfavorite)}>
                    <HeartIcon size={hp(5)} fill={isfavorite ? "gray" : "red"} />
                </TouchableOpacity>
            </View>
            <View className="px-4">
                <Text className="font-bold py-4 text-neutral-700" style={{ fontSize: hp(3.5) }}>{meald.strMeal}</Text>
                <Text className="text-neutral-600 font-semibold" style={{ fontSize: hp(2) }}>{meald.strArea}</Text>
            </View>

            <View className="justify-around items-center flex flex-row mx-4 space-y-1 pt-2">
                <View className="bg-amber-400 p-4 rounded-full">
                    <View className="items-center justify-center bg-white rounded-full" style={{ width: hp(5.5), height: hp(5.5) }}>
                        <ClockIcon size={hp(3.5)} strokeWidth={2.5} color="#000" />
                    </View>
                    <View className="items-center space-y-1 py-2">
                        <Text style={{ fontSize: hp(1.9) }} className="text-neutral-800 font-bold">35</Text>
                        <Text style={{ fontSize: hp(1.4) }} className="text-neutral-800 font-bold">Mins</Text>
                    </View>
                </View>
                <View className="bg-amber-400 p-4 rounded-full">
                    <View className="items-center justify-center bg-white rounded-full" style={{ width: hp(5.5), height: hp(5.5) }}>
                        <UsersIcon size={hp(3.5)} strokeWidth={2.5} fill="#000" />
                    </View>
                    <View className="items-center space-y-1 py-2">
                        <Text style={{ fontSize: hp(1.9) }} className="text-neutral-800 font-bold">03</Text>
                        <Text style={{ fontSize: hp(1.4) }} className="text-neutral-800 font-bold">Servings</Text>
                    </View>
                </View>

                <View className="bg-amber-400 p-4 rounded-full">
                    <View className="items-center justify-center bg-white rounded-full" style={{ width: hp(5.5), height: hp(5.5) }}>
                        <FireIcon size={hp(3.5)} strokeWidth={2.5} color="#000" />
                    </View>
                    <View className="items-center space-y-1 py-2">
                        <Text style={{ fontSize: hp(1.9) }} className="text-neutral-800 font-bold">103</Text>
                        <Text style={{ fontSize: hp(1.4) }} className="text-neutral-800 font-bold">Call</Text>
                    </View>
                </View>

                <View className="bg-amber-400 p-4 rounded-full">
                    <View className="items-center justify-center bg-white rounded-full" style={{ width: hp(5.5), height: hp(5.5) }}>
                        <Square3Stack3DIcon size={hp(3.5)} strokeWidth={2.5} color="#000" />
                    </View>
                    <View className="items-center space-y-1 py-2">
                        <Text style={{ fontSize: hp(1.9) }} className="text-neutral-800 font-bold"></Text>
                        <Text style={{ fontSize: hp(1.4) }} className="text-neutral-800 font-bold">Easy</Text>
                    </View>
                </View>
            </View>
            <View className="mx-4 space-y-1 pt-2">
                <Text className="font-bold text-neutral-700 pb-2" style={{ fontSize: hp(3.2) }}>Ingredients</Text>
                {ingredientIndex(meald).map((i) => (
                    <View key={i} className="flex-row space-x-4 mx-4 ">
                        <View className="bg-amber-400 rounded-full" style={{ height: hp(1.5), width: hp(1.5) }}></View>
                        <View className="flex-row space-x-2">
                            <Text className="font-extrabold text-neutral-700" style={{ fontSize: hp(1.7) }}>{meald['strMeasure' + i]}</Text>
                            <Text className="font-medium text-neutral-700" style={{ fontSize: hp(1.7) }}>{meald['strIngredient' + i]}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View className="space-y-4 p-4">
                <Text className="font-bold text-neutral-700" style={{ fontSize: hp(3.2) }}>Instructions</Text>
                <Text className="tracking-tight font-medium text-neutral-600 italic">{meald.strInstructions}</Text>
            </View>
            <View className="p-4 space-y-2">
                <Text className="font-bold text-neutral-700" style={{ fontSize: hp(3.2) }}>Recipe Video</Text>
                <View>
                    <YoutubeIframe
                        videoId={getYoutubeVideoId(meald.strYoutube)}
                        play={playing}
                        height={hp(30)}
                        onChangeState={onStateChange}
                    />
                    
      {/*<Button title={playing ? "pause" : "play"} onPress={togglePlaying} />*/}
                </View>
                
            </View>
        </ScrollView>
    )
}
