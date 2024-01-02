import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import PaymentScreen from './PaymentScreen';

const CartScreen = ({ navigation, route }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.navigate('payment', { amount: CartPrice });
  };
  

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollViewFlex, { marginBottom: tabBarHeight }]}
      >
        <View style={styles.itemContainer}>
          <HeaderBar title="Cart" />

          {CartList.length === 0 ? (
            <EmptyListAnimation title="Cart is Empty" />
          ) : (
            <View style={styles.listItemContainer}>
              {CartList.map((data: any) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}
                  key={data.id}
                >
                  <CartItem
                    id={data.id}
                    name={data.name}
                    imagelink_square={data.imagelink_square}
                    special_ingredient={data.special_ingredient}
                    roasted={data.roasted}
                    prices={data.prices}
                    type={data.type}
                    incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                    decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {CartList.length !== 0 && (
          <PaymentFooter
            buttonPressHandler={buttonPressHandler}
            buttonTitle="Pay"
            price={{ price: CartPrice, currency: '$' }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
