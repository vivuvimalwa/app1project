import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from './categories';
import Recipes from './recipes';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network status updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    getCategories();

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      if (isConnected) {
        setLoading(true);  // Start loading before fetching meals
        getMeals();
      } else {
        setLoading(true);  // Ensure loading is true when there's no connection
      }
    }
  }, [activeCategory, isConnected]);

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
        if (response.data.categories.length > 0) {
          setActiveCategory(response.data.categories[0].strCategory);
        }
      }
    } catch (error) {
      console.log('Error fetching categories:', error.message);
    }
  };

  const getMeals = async () => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log('Error fetching meals:', error.message);
    } finally {
      if (isConnected) {
        setLoading(false);  // Stop loading after meals are fetched if connected
      }
    }
  };

  return (
   
      <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-6"
      >
        <View className="flex-row mx-4 mb-2 justify-between items-center">
          <Image source={require('../assets/fonts/man.png')} style={{ height: hp(4.5), width: hp(5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2" style={{ marginBottom: hp(-2) }}>
          <Text style={{ fontSize: hp(1.7) }}>Hello, Noman!</Text>
        </View>

        <View className="mx-4 relative">
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold">
            Make your own food, stay at <Text className="text-amber-500">home</Text>
          </Text>
        </View>

        <View className="mx-4 bg-black/5 flex-row rounded-full items-center p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-2">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              categories={categories}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>

        <View>
          <Recipes categories={categories} meals={meals} loading={loading} />
        </View>
      </ScrollView>
    </View>

    
  );
}

export default HomeScreen;
