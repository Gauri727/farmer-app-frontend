/**
 * Profile Screen — Farmer Profile
 * Clean farmer info card + editable details + menu sections
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../../theme';
import { Dialog } from '../../components/common/Dialog';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLogout } from '../../hooks/useAuth';
import { ProfileScreenProps } from '../../navigation/types';

/* ─── Farmer Profile Fields ───────────────────────────────────── */
interface FarmerProfile {
  name: string;
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  landSize: string;
  landUnit: string;
  cropType: string;
  farmingType: string;
  soilType: string;
  irrigationType: string;
}

const LAND_UNITS = ['Acres', 'Hectares', 'Bigha', 'Guntha'];
const FARMING_TYPES = ['Rainfed', 'Irrigated', 'Mixed'];
const SOIL_TYPES = ['Black (Kali)', 'Red', 'Sandy', 'Loamy', 'Clay'];
const IRRIGATION_TYPES = ['Drip', 'Sprinkler', 'Flood', 'Canal', 'Borewell', 'None'];

/* ─── Info Row ────────────────────────────────────────────────── */
const InfoRow = ({
  icon,
  label,
  value,
  color = Colors.primary[600],
  isLast = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color?: string;
  isLast?: boolean;
}) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowDivider]}>
    <View style={[styles.infoIcon, { backgroundColor: color + '18' }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <View style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '— Not set'}</Text>
    </View>
  </View>
);

/* ─── Section Card ────────────────────────────────────────────── */
const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
}) => (
  <View style={styles.sectionOuter}>
    <View style={styles.sectionTitleRow}>
      <Ionicons name={icon} size={13} color={Colors.text.tertiary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={[styles.sectionCard, Shadows.card]}>{children}</View>
  </View>
);

/* ─── Menu Row ────────────────────────────────────────────────── */
const MenuRow = ({
  icon,
  label,
  subtitle,
  accent,
  onPress,
  isLast,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  accent: string;
  onPress: () => void;
  isLast: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.menuRow, !isLast && styles.menuDivider]}
  >
    <View style={[styles.menuIconWrap, { backgroundColor: accent + '15' }]}>
      <Ionicons name={icon} size={19} color={accent} />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuLabel}>{label}</Text>
      {subtitle ? <Text style={styles.menuSub}>{subtitle}</Text> : null}
    </View>
    <View style={styles.chevronWrap}>
      <Ionicons name="chevron-forward" size={15} color={Colors.gray[300]} />
    </View>
  </TouchableOpacity>
);

/* ─── Edit Modal (inline fields) ─────────────────────────────── */
const EditField = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
}) => (
  <View style={styles.editField}>
    <Text style={styles.editLabel}>{label}</Text>
    <TextInput
      style={styles.editInput}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder || `Enter ${label}`}
      placeholderTextColor={Colors.text.tertiary}
      keyboardType={keyboardType}
    />
  </View>
);

/* ─── Main Screen ─────────────────────────────────────────────── */
export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthContext();
  const logoutMutation = useLogout();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<FarmerProfile>({
    name: user?.name ?? '',
    mobile: user?.mobile ?? '',
    village: '',
    taluka: '',
    district: user?.district ?? 'Jalgaon',
    state: user?.state ?? 'Maharashtra',
    landSize: '',
    landUnit: 'Acres',
    cropType: '',
    farmingType: '',
    soilType: '',
    irrigationType: '',
  });

  const set = (key: keyof FarmerProfile) => (val: string) =>
    setProfile((p) => ({ ...p, [key]: val }));

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    try { await logoutMutation.mutateAsync(); } catch {}
    await logout();
  };

  const initials = (profile.name || 'F')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── HEADER BAR ──────────────────────────────────────── */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            style={[styles.editToggle, isEditing && styles.editToggleActive]}
            onPress={() => {
              if (isEditing) Alert.alert('Saved', 'Profile details saved successfully.');
              setIsEditing(!isEditing);
            }}
          >
            <Ionicons
              name={isEditing ? 'checkmark-outline' : 'create-outline'}
              size={16}
              color={isEditing ? Colors.white : Colors.primary[600]}
            />
            <Text style={[styles.editToggleText, isEditing && { color: Colors.white }]}>
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── FARMER IDENTITY CARD ────────────────────────────── */}
        <View style={styles.identityCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.identityInfo}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={profile.name}
                onChangeText={set('name')}
                placeholder="Full Name"
                placeholderTextColor={Colors.text.tertiary}
              />
            ) : (
              <Text style={styles.farmerName}>{profile.name || 'Your Name'}</Text>
            )}
            <View style={styles.farmerTagRow}>
              <View style={styles.farmerTag}>
                <Ionicons name="leaf-outline" size={11} color={Colors.primary[600]} />
                <Text style={styles.farmerTagText}>Farmer</Text>
              </View>
              <View style={styles.farmerTag}>
                <Ionicons name="location-outline" size={11} color={Colors.primary[600]} />
                <Text style={styles.farmerTagText}>{profile.district || 'Jalgaon'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── PERSONAL DETAILS ────────────────────────────────── */}
        <SectionCard title="PERSONAL DETAILS" icon="person-outline">
          {isEditing ? (
            <View style={styles.editSection}>
              <EditField label="Mobile Number" value={profile.mobile} onChange={set('mobile')} keyboardType="phone-pad" />
              <EditField label="Village / Town" value={profile.village} onChange={set('village')} />
              <EditField label="Taluka" value={profile.taluka} onChange={set('taluka')} />
              <EditField label="District" value={profile.district} onChange={set('district')} />
              <EditField label="State" value={profile.state} onChange={set('state')} />
            </View>
          ) : (
            <>
              <InfoRow icon="call-outline" label="Mobile" value={profile.mobile || user?.mobile || ''} color="#2563EB" />
              <InfoRow icon="home-outline" label="Village / Town" value={profile.village} color="#7C3AED" />
              <InfoRow icon="map-outline" label="Taluka" value={profile.taluka} color="#059669" />
              <InfoRow icon="location-outline" label="District" value={profile.district} color={Colors.primary[600]} />
              <InfoRow icon="flag-outline" label="State" value={profile.state} color="#D97706" isLast />
            </>
          )}
        </SectionCard>

        {/* ── FARM DETAILS ────────────────────────────────────── */}
        <SectionCard title="FARM DETAILS" icon="leaf-outline">
          {isEditing ? (
            <View style={styles.editSection}>
              <View style={styles.editField}>
                <Text style={styles.editLabel}>Land Size</Text>
                <View style={styles.landRow}>
                  <TextInput
                    style={[styles.editInput, { flex: 1, marginRight: 8 }]}
                    value={profile.landSize}
                    onChangeText={set('landSize')}
                    placeholder="e.g. 2.5"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                  />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexShrink: 0 }}>
                    <View style={styles.chipRow}>
                      {LAND_UNITS.map((u) => (
                        <TouchableOpacity
                          key={u}
                          style={[styles.chip, profile.landUnit === u && styles.chipActive]}
                          onPress={() => set('landUnit')(u)}
                        >
                          <Text style={[styles.chipText, profile.landUnit === u && styles.chipTextActive]}>{u}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              <EditField label="Main Crop(s)" value={profile.cropType} onChange={set('cropType')} placeholder="e.g. Sugarcane, Cotton, Onion" />
              <View style={styles.editField}>
                <Text style={styles.editLabel}>Farming Type</Text>
                <View style={styles.chipRow}>
                  {FARMING_TYPES.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.chip, profile.farmingType === t && styles.chipActive]}
                      onPress={() => set('farmingType')(t)}
                    >
                      <Text style={[styles.chipText, profile.farmingType === t && styles.chipTextActive]}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.editField}>
                <Text style={styles.editLabel}>Soil Type</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chipRow}>
                    {SOIL_TYPES.map((s) => (
                      <TouchableOpacity
                        key={s}
                        style={[styles.chip, profile.soilType === s && styles.chipActive]}
                        onPress={() => set('soilType')(s)}
                      >
                        <Text style={[styles.chipText, profile.soilType === s && styles.chipTextActive]}>{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.editField}>
                <Text style={styles.editLabel}>Irrigation Type</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chipRow}>
                    {IRRIGATION_TYPES.map((ir) => (
                      <TouchableOpacity
                        key={ir}
                        style={[styles.chip, profile.irrigationType === ir && styles.chipActive]}
                        onPress={() => set('irrigationType')(ir)}
                      >
                        <Text style={[styles.chipText, profile.irrigationType === ir && styles.chipTextActive]}>{ir}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : (
            <>
              <InfoRow
                icon="resize-outline"
                label="Land Size"
                value={profile.landSize ? `${profile.landSize} ${profile.landUnit}` : ''}
                color={Colors.primary[600]}
              />
              <InfoRow icon="flower-outline" label="Main Crop(s)" value={profile.cropType} color="#059669" />
              <InfoRow icon="water-outline" label="Farming Type" value={profile.farmingType} color="#2563EB" />
              <InfoRow icon="earth-outline" label="Soil Type" value={profile.soilType} color="#92400E" />
              <InfoRow icon="rainy-outline" label="Irrigation" value={profile.irrigationType} color="#0891B2" isLast />
            </>
          )}
        </SectionCard>

        {/* ── ACCOUNT SECTION ─────────────────────────────────── */}
        <SectionCard title="ACCOUNT" icon="settings-outline">
          <MenuRow
            icon="settings-outline"
            label="Settings"
            subtitle="Preferences & account details"
            accent={Colors.primary[500]}
            onPress={() => navigation.navigate('Settings')}
            isLast={false}
          />
          <MenuRow
            icon="language-outline"
            label="Language"
            subtitle="Change app language"
            accent="#7C3AED"
            onPress={() => navigation.navigate('LanguageSelection')}
            isLast={false}
          />
          <MenuRow
            icon="bookmark-outline"
            label="Bookmarks"
            subtitle="Saved schemes"
            accent="#D97706"
            onPress={() => navigation.navigate('Bookmarks' as any)}
            isLast
          />
        </SectionCard>

        {/* ── HELP & LEGAL ────────────────────────────────────── */}
        <SectionCard title="HELP & LEGAL" icon="shield-outline">
          <MenuRow
            icon="help-circle-outline"
            label="Help & Support"
            subtitle="Get assistance anytime"
            accent="#059669"
            onPress={() => navigation.navigate('Help' as any)}
            isLast={false}
          />
          <MenuRow
            icon="information-circle-outline"
            label="About"
            subtitle="App info & version"
            accent={Colors.gray[400]}
            onPress={() => navigation.navigate('About' as any)}
            isLast={false}
          />
          <MenuRow
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            subtitle="How we handle your data"
            accent="#DC2626"
            onPress={() => navigation.navigate('PrivacyPolicy' as any)}
            isLast={false}
          />
          <MenuRow
            icon="document-text-outline"
            label="Terms & Conditions"
            subtitle="Usage terms"
            accent={Colors.gray[400]}
            onPress={() => navigation.navigate('TermsConditions' as any)}
            isLast
          />
        </SectionCard>

        {/* ── LOGOUT ──────────────────────────────────────────── */}
        <View style={[styles.sectionOuter, { marginBottom: Spacing.xl }]}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setShowLogoutDialog(true)}
            activeOpacity={0.85}
          >
            <View style={styles.logoutIconWrap}>
              <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            </View>
            <Text style={styles.logoutText}>Log Out</Text>
            <Ionicons name="chevron-forward" size={16} color="#FCA5A5" />
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Kisan Saathi · v1.0.0 · Made for Indian Farmers</Text>
      </ScrollView>

      <Dialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Log Out"
        message="Are you sure you want to log out of your account?"
        actions={[
          { label: 'Cancel', onPress: () => setShowLogoutDialog(false) },
          { label: 'Log Out', onPress: handleLogout, variant: 'destructive' },
        ]}
      />
    </View>
  );
};

/* ─── Styles ─────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F7F4' },
  scroll: { paddingBottom: 110 },

  /* Header */
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#F4F7F4',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  editToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.primary[400],
    backgroundColor: Colors.white,
  },
  editToggleActive: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  editToggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary[600],
  },

  /* Identity Card */
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.lg,
    ...Shadows.card,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[500],
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  identityInfo: { flex: 1 },
  farmerName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  nameInput: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.primary,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.primary[400],
    paddingBottom: 4,
    marginBottom: 6,
  },
  farmerTagRow: { flexDirection: 'row', gap: 6 },
  farmerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.full,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  farmerTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary[700],
  },

  /* Section */
  sectionOuter: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    overflow: 'hidden',
  },

  /* Info Row */
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: 13,
    paddingHorizontal: Spacing.md,
  },
  infoRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F1',
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },

  /* Edit fields */
  editSection: { padding: Spacing.md, gap: Spacing.md },
  editField: { gap: 6 },
  editLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text.secondary,
  },
  editInput: {
    backgroundColor: Colors.gray[50],
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text.primary,
  },
  landRow: { flexDirection: 'row', alignItems: 'center' },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  chipTextActive: { color: Colors.white },

  /* Menu Row */
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  menuDivider: { borderBottomWidth: 1, borderBottomColor: '#F1F5F1' },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
  menuSub: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  chevronWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Logout */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: '#FECACA',
    ...Shadows.card,
  },
  logoutIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#DC2626' },

  /* Version */
  version: {
    fontSize: 11,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});
