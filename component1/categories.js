import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated,{ FadeInDown} from 'react-native-reanimated';
import { CatchImage } from '../helpers/image'; 


export default function Categories({categories,activeCategory,setActiveCategory}) {

    return (
        <Animated.View entering={FadeInDown.duration(600).springify()}>
       
            <FlatList
                className="flex space-y-1 mx-4"
                data={categories}
                keyExtractor={(item) => item.idCategory}
                renderItem={({ item }) => {
                       let isActive = item.strCategory == activeCategory;
                       let activeButtonClass = isActive? 'bg-amber-400':'bg-black/10'
                    return(
                    <TouchableOpacity onPress={() => setActiveCategory(item.strCategory)} className="space-y-1">
                        <View style={{alignItems:'center',marginRight:10}} className=" p-[6px]">
                           <View className={` rounded-full p-[6px]  + ${activeButtonClass}`}>
                         {/*  <Image
                                source={{ uri: item.strCategoryThumb }}
                                style={{ width: hp(6),height:hp(6), borderRadius: 50 }}
                                

                            /> */}
                            < CatchImage
                                uri={item.strCategoryThumb }
                                style={{ width: hp(6),height:hp(6), borderRadius: 50 }}
                            />
                           </View>
                           <Text className="text-neutral-600 mt-2">{item.strCategory}</Text>
                        </View>
                        
                       </TouchableOpacity>
                  );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            </Animated.View>

      
    )
}