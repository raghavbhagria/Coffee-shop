import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { useStore } from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({ navigation, route }: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <CustomIcon
              name="left"
              color="#FFF"
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payments</Text>
          <View style={styles.emptyView} />
        </View>

        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}
          >
            <View
              style={[
                styles.creditCardContainer,
                {
                  borderColor:
                    paymentMode === 'Credit Card' ? '#F37021' : '#707070',
                },
              ]}
            >
              <Text style={styles.creditCardTitle}>Credit Card</Text>
              <View style={styles.creditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linearGradientStyle}
                  colors={['#707070', '#000']}
                >
                  <View style={styles.creditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={40}
                      color="#F37021"
                    />
                    <Image
                      source={require('../assets/app_images/visa.png')}
                      style={styles.visaImage}
                    />
                  </View>
                  <View style={styles.creditCardNumberContainer}>
                    <Text style={styles.creditCardNumber}>3879</Text>
                    <Text style={styles.creditCardNumber}>8923</Text>
                    <Text style={styles.creditCardNumber}>6745</Text>
                    <Text style={styles.creditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardNameContainer}>
                      <Text style={styles.creditCardNameSubtitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.creditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.creditCardNameSubtitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.creditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}
            >
              <View style={styles.paymentMethodContainer}>
                {data.isIcon ? (
                  <CustomIcon name={data.icon} size={24} color="#FFF" />
                ) : (
                  <Image
                    source={data.icon}
                    style={styles.paymentMethodIcon}
                  />
                )}
                <Text
                  style={[
                    styles.paymentMethodName,
                    {
                      color:
                        paymentMode === data.name ? '#F37021' : '#FFF',
                    },
                  ]}
                >
                  {data.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.paymentFooter}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={buttonPressHandler}
        >
          <Text style={styles.payButtonText}>
            Pay with {paymentMode}
          </Text>
          <Text style={styles.payButtonPrice}>
            {route.params.amount}$
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  lottieAnimation: {
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
    padding: 15,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFF',
  },
  emptyView: {
    height: 36,
    width: 36,
  },
  paymentOptionsContainer: {
    padding: 15,
    gap: 15,
  },
  creditCardContainer: {
    padding: 10,
    gap: 10,
    borderRadius: 30,
    borderWidth: 3,
  },
  creditCardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 10,
  },
  creditCardBG: {
    backgroundColor: '#707070',
    borderRadius: 50,
  },
  linearGradientStyle: {
    borderRadius: 50,
    gap: 36,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  creditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditCardNumberContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  creditCardNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: 8,
  },
  creditCardNameSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#B7B7B7',
  },
  creditCardNameTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFF',
  },
  creditCardNameContainer: {
    alignItems: 'flex-start',
  },
  creditCardDateContainer: {
    alignItems: 'flex-end',
  },
  visaImage: {
    width: 50,
    height: 30,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#707070',
    borderRadius: 30,
    padding: 10,
  },
  paymentMethodIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  paymentMethodName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
  paymentFooter: {
    borderTopWidth: 1,
    borderColor: '#707070',
    padding: 15,
  },
  payButton: {
    backgroundColor: '#F37021',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  payButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  payButtonPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
});

export default PaymentScreen;
