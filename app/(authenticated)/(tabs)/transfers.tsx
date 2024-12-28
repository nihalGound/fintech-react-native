import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
// import { ArrowLeftRight, Globe, Bell, Wallet, Building2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type FeatureItemProps = {
  title: string;
  subtitle: string;
  index: number;
};

// Define available feature types
type FeatureType = {
  title: string;
  subtitle: string;
};

// Predefined features
const TRANSFER_FEATURES: FeatureType[] = [
  {
    title: "International Transfers",
    subtitle: "Send money to 100+ countries"
  },
  {
    title: "Bank Transfers",
    subtitle: "Direct to bank accounts worldwide"
  },
  {
    title: "Instant Transfers",
    subtitle: "Between crypto & fiat currencies"
  }
];

const Transfer = () => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const featureAnims = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  useEffect(() => {
    // Main content animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Staggered feature animations
    Animated.stagger(200, [
      ...featureAnims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ]).start();
  }, []);

  const FeatureItem: React.FC<FeatureItemProps> = ({title, subtitle, index }) => (
    <Animated.View
      style={[
        styles.featureItem,
        {
          opacity: featureAnims[index],
          transform: [{
            translateX: featureAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            })
          }]
        }
      ]}
    >
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={['#1a1f25', '#111827']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >

        <Text style={styles.title}>Money Transfers Coming Soon</Text>
        <Text style={styles.description}>
          Send money globally with zero fees, real-time tracking, and competitive exchange rates
        </Text>

        {/* Upcoming Features */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            title="International Transfers"
            subtitle="Send money to 100+ countries"
            index={0}
          />
          <FeatureItem
            title="Bank Transfers"
            subtitle="Direct to bank accounts worldwide"
            index={1}
          />
          <FeatureItem
            title="Instant Transfers"
            subtitle="Between crypto & fiat currencies"
            index={2}
          />
        </View>

        {/* Launch Timeline */}
        <View style={styles.timelineContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Launch Progress</Text>
            <Text style={styles.progressText}>80%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Notification Button */}
        <TouchableOpacity style={styles.notifyButton}>
          <Text style={styles.buttonText}>Notify Me at Launch</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Background Elements */}
      <View style={[styles.blob, styles.blob1]} />
      <View style={[styles.blob, styles.blob2]} />
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    padding: 20,
    borderRadius: 30,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 65, 85, 0.4)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
  },
  timelineContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  blob: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    opacity: 0.1,
  },
  blob1: {
    backgroundColor: '#3B82F6',
    top: -width * 0.2,
    right: -width * 0.2,
  },
  blob2: {
    backgroundColor: '#8B5CF6',
    bottom: -width * 0.2,
    left: -width * 0.2,
  },
});

export default Transfer;