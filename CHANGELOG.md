# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.1] - 2026-05-27

### Added

- **QR Timeout Event** (`WebhookEventType.QR_TIMEOUT` / `"QRTimeout"`)
  - New webhook event type fired when the QR code scan window expires without being scanned
  - Includes `QRTimeoutWebhookEvent` interface and `QRTimeoutWebhookPayload` type
  - Added to `WebhookEventMap` and `SpecificWebhookPayload` union for type-safe handling

## [1.9.0] - 2026-02-01

### Added

#### New Modules
- **Status Module** (`client.status`)
  - `setStatusText(body)` - Set WhatsApp status text message

- **Call Module** (`client.call`)
  - `rejectCall(callFrom, callId)` - Reject an incoming call

#### Admin Module
- `getUser(id)` - Get a specific user by ID
- `updateUser(id, data)` - Update/edit user settings

#### Session Module
- `configureHmac(hmacKey)` - Configure HMAC key for webhook signing
- `getHmacConfig()` - Get HMAC configuration status
- `deleteHmacConfig()` - Delete HMAC configuration

#### Chat Module
- `requestUnavailableMessage(chat, sender, messageId)` - Request a copy of a message that couldn't be decrypted
- `archiveChat(jid, archive)` - Archive or unarchive a chat
- `downloadSticker(request)` - Download sticker media from a message

#### User Module
- `getLid(phone)` - Get LID (Linked ID) from phone number or JID

### Changed
- Updated README with documentation for all new methods
- Added new type definitions for all new endpoints

## [1.8.5] - Previous Release

### Features
- Chat History endpoint
- Phone Pairing (alternative to QR code login)
- Interactive Messages (buttons, lists, polls)
- Message Management (edit and delete)
- Advanced Group Management
- Newsletter Support
- Enhanced Webhooks (update and delete)
- Proxy Support
- History Sync

## [1.7.0] - Earlier Release

### Features
- Full TypeScript support
- Modular architecture
- Promise-based async/await
- Comprehensive error handling
- Tree shakable imports
- S3 storage configuration
- Webhook event types and utilities

---

For more details, see the [README](README.md).
