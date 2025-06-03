# Sign & Verify Demo

**Languages**: [English](README.md) | [中文](README.ZH.md)

A React Native Web-based digital signature and verification demo application supporting Ed25519 signature algorithm and SHA-256 hashing.

## 📱 Features

### Core Features
- **Digital Signing**: Input messages for SHA-256 hashing and Ed25519 signing
- **Signature Verification**: Verify the validity of messages, public keys, and signatures
- **Result Display**: Clear display of hash values, signatures, and public keys (with one-click copy)
- **Profile Interface**: Beautiful user information and statistics interface with smooth animations

### Technical Features
- ✅ **Cross-platform**: Supports Web, iOS, and Android
- ✅ **TypeScript**: Complete type safety
- ✅ **Modern UI**: Based on NativeWind and Gluestack UI
- ✅ **State Management**: Atomic state management using Jotai
- ✅ **Animation Effects**: Smooth animations with React Native Reanimated
- ✅ **Responsive Design**: Adapts to various screen sizes

## 🚀 Quick Start

### Requirements

- Node.js >= 18
- npm or yarn
- Expo CLI

### Install Dependencies

```bash
npm install
```

### Development

```bash
# Start Web development server
npm run web

# Start iOS simulator
npm run ios

# Start Android simulator
npm run android

# Start development server (choose platform)
npm start
```

### Build & Deploy

```bash
# Build Web version (Metro bundler)
npx expo export -p web

# Serve locally for testing
npx expo serve

# Build for all platforms
npx expo export
```

## 🔐 Cryptographic Algorithms

### Ed25519 Digital Signature
- **Algorithm**: Ed25519 elliptic curve digital signature
- **Library**: `@noble/ed25519`
- **Features**: High performance, high security, quantum-resistant

### SHA-256 Hash
- **Algorithm**: SHA-256 secure hash algorithm
- **Library**: `js-sha256`
- **Purpose**: Message integrity verification

## 📖 Usage Guide

### 1. Digital Signing

1. Enter the message to be signed in the "Sign" tab
2. Click the "Hash + Sign" button
3. The system will display:
   - SHA-256 hash value (hexadecimal)
   - Ed25519 signature (Base64)
   - Public key (Base64)
4. One-click copy any result to clipboard

### 2. Signature Verification

1. Enter in the "Verify" tab:
   - Original message
   - Public key (Base64 format)
   - Signature (Base64 format)
2. Click the "Verify Signature" button
3. The system will display verification result (valid/invalid)

### 3. Profile Feature

- Click the "Profile" button in the top-right corner of the homepage
- View user information and signing statistics
- Experience smooth entry/exit animations

## 🛠 Tech Stack

### Frontend Framework
- **React Native**: 0.79.2
- **Expo**: ~53.0.7
- **React**: 19.0.0

### UI Components
- **NativeWind**: ^4.1.23 (Tailwind CSS for React Native)
- **Gluestack UI**: On-demand component library
- **React Native Reanimated**: ~3.17.4 (animations)

### State Management
- **Jotai**: ^2.12.5 (atomic state management)

### Cryptographic Libraries
- **@noble/ed25519**: Ed25519 digital signature
- **js-sha256**: SHA-256 hash algorithm

### Development Tools
- **TypeScript**: ~5.8.3
- **ESLint**: ^9.25.0
- **Expo Router**: ~5.0.5 (file system routing)

## 📁 Project Structure

```
├── app/                    # Page routing
│   ├── (tabs)/            # Tab routing
│   │   ├── index.tsx      # Sign page
│   │   ├── verify.tsx     # Verify page
│   │   └── _layout.tsx    # Tab layout
│   └── _layout.tsx        # Root layout
├── components/            # Components
│   ├── ui/                # UI base components
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   └── ...
│   ├── navigation/        # Navigation components
│   └── ProfileModal.tsx   # Profile modal
├── store/                 # State management
│   └── atomState.ts       # Jotai state atoms
├── utils/                 # Utility functions
│   └── crypto.ts          # Crypto-related functions
├── hooks/                 # Custom hooks
├── constants/             # Constants definition
└── assets/                # Static assets
```

## 🎨 Design System

### Color Theme
- Supports automatic light/dark theme switching
- Follows system theme settings

### Component Design
- Card-based layout
- Consistent spacing and border radius
- Clear hierarchy
- Friendly interaction feedback

### Animation Effects
- Profile modal: Elastic entry + gradient background
- Button states: Loading state indication
- Result display: Smooth show/hide

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🧪 Testing & QA Deployment

### For QA Teams Using Expo Go

If you want QA testers to test your project using Expo Go, here are the recommended deployment strategies:

#### Option 1: EAS Update + Internal Distribution (Recommended)

1. **Setup EAS Update**:
```bash
# Install EAS CLI globally
npm install --global eas-cli

# Login to your Expo account
eas login

# Configure EAS Update
eas update:configure
```

2. **Configure channels in `eas.json`**:
```json
{
  "build": {
    "preview": {
      "channel": "preview",
      "distribution": "internal"
    },
    "staging": {
      "channel": "staging", 
      "distribution": "internal"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

3. **Create test builds**:
```bash
# Create preview build for internal testing
eas build --profile preview --platform all

# Create staging build 
eas build --profile staging --platform all
```

4. **Share with testers**:
   - Send the build URLs to testers
   - Testers install via Expo Go or download directly
   - You can push instant updates without rebuilding

5. **Deploy updates to testers**:
```bash
# Publish update to preview channel
eas update --channel preview --message "Fixed login bug"

# Publish update to staging channel
eas update --channel staging --message "Added new feature"
```

#### Option 2: Development Build + QR Code Sharing

1. **Create development build**:
```bash
# Install expo-dev-client
npx expo install expo-dev-client

# Create development build
eas build --profile development --platform all
```

2. **Start development server**:
```bash
npx expo start --dev-client
```

3. **Share QR code**:
   - Testers scan QR code with development build
   - Instant updates without rebuild
   - Real-time testing during development

#### Option 3: Expo Development Build + EAS Update

Best of both worlds for comprehensive testing:

1. **Setup both services**:
```bash
# Configure for development builds
eas build:configure

# Configure for updates  
eas update:configure
```

2. **Create development builds for different environments**:
```bash
# Development build for testing updates
eas build --profile development

# Preview build for stakeholder review
eas build --profile preview
```

3. **Testing workflow**:
   - Developers use development builds for real-time testing
   - QA uses preview builds with EAS Update for stable testing
   - Stakeholders use production-like builds

### Testing Commands

```bash
# Publish update to specific channel
eas update --channel [channel-name] --message "[description]"

# Check update status
eas update:list --channel [channel-name]

# Rollback if needed
eas update:rollback

# View channel information
eas channel:view [channel-name]
```

### QA Testing Best Practices

1. **Channel Strategy**:
   - `preview`: Early testing and feature validation
   - `staging`: Pre-production testing with production-like data
   - `production`: Live app updates

2. **Version Management**:
   - Use semantic versioning for runtime versions
   - Test updates on same runtime version as production
   - Maintain separate channels for different test phases

3. **Rollout Strategy**:
   - Start with small percentage rollouts
   - Monitor crash reports and user feedback
   - Gradually increase rollout percentage

4. **Testing Checklist**:
   - ✅ Test on both iOS and Android
   - ✅ Test with different runtime versions
   - ✅ Verify update download and application
   - ✅ Test offline/online scenarios
   - ✅ Validate rollback procedures

### Troubleshooting Common Issues

- **Update not applying**: Check runtime version compatibility
- **Channel mismatch**: Verify channel configuration in build
- **Network issues**: Test with different network conditions
- **Cache problems**: Clear app data or reinstall build

## 📝 Development Notes

### Adding New Pages
1. Create new `.tsx` files in the `app/` directory
2. Use Expo Router's file system routing

### Adding New Components
1. Create component directories under `components/ui/`
2. Export components and related types

### State Management
- Use Jotai atomic state management
- Define new state atoms in `store/atomState.ts`

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 🙋‍♂️ Contact

For questions or suggestions, please create an Issue or contact the developer.

---

**Technical Highlights**
- 🔒 Military-grade encryption algorithms
- 📱 Cross-platform native experience  
- 🎨 Modern UI design
- ⚡ High-performance animation effects
- 🧪 Complete TypeScript support