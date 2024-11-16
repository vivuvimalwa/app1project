import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CatchImage } from '../helpers/image'; 
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ meals, categories, loading }) {
    const navigation = useNavigation()
    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
            <View>
                {loading ? 
                <Loading size="large" color="red" className="mt-20" />
                : (
                    <MasonryList
                        data={meals}
                        keyExtractor={(item) => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, i}) => <RecipeCard index={i} item={item} navigation={navigation} />}
                        onEndReachedThreshold={0.1}
                    />
                )}
            </View>
        </View>
    );
}

const RecipeCard = ({ index, item, navigation }) => {
    const isEven = index % 2 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <View>
                <Pressable
                    style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                    className="flex justify-center mb-4 space-y-1"
                    onPress={()=> navigation.navigate('RecipeDetail',{...item})}
                >
                    
                    <CatchImage
                        uri={item.strMealThumb}
                        style={{
                            width: "100%",
                            height: index % 3 === 0 ? hp(22) : hp(35),
                            borderRadius: 15,
                        }}
                        placeholder={{ uri: 'placeholder_image_url' }} // Provide a placeholder URL
                        resizeMode="cover"
                        className="bg-black/5"
                    />
                    <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">
                        {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + ' ...' : item.strMeal}
                    </Text>
                </Pressable>
            </View>
        </Animated.View>
    );
};
