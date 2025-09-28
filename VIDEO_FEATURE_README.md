# Video Play Button Feature

## Overview

Added an interactive video play button overlay to featured project cards that appears on hover and plays YouTube videos directly within the project card layout.

## Features

### 🎥 Hover Animation

- Play button appears with smooth animation when hovering over project images
- Only shows for projects that have a `videoUrl` property
- Elegant white circular button with play icon

### 🎬 Inline Video Player

- Video plays directly within the project card, replacing the image
- Auto-play enabled for seamless experience
- Smooth transition animation between image and video
- Close button to return to the original image view
- Press Escape key to close video and return to image

### ♿ Accessibility

- Keyboard navigation support (Escape key to close video)
- ARIA labels for screen readers
- Focus management for close button
- Proper semantic HTML structure

## Implementation

### 1. Updated Types

Added `videoUrl?: string` to both `Project` and `ProjectCardProps` interfaces in `types/index.ts`.

### 2. Enhanced ProjectCard Component

- Added hover overlay with play button animation
- Integrated inline YouTube video player within the card layout
- Added smooth transition animations between image and video states
- Added keyboard event handling for accessibility
- Smooth animations using Framer Motion

### 3. Updated Project Data

Added example `videoUrl` fields to featured projects in `lib/data/projects.ts`.

### 4. Updated Projects Section

Modified `components/sections/projects.tsx` to pass the `videoUrl` prop to ProjectCard components.

## Usage

To add a video to any project, simply include the `videoUrl` property in the project data:

```typescript
{
  title: "My Awesome Project",
  description: "Project description...",
  // ... other properties
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // Add this line
}
```

The component automatically:

- Extracts the YouTube video ID from various URL formats
- Shows the play button overlay on hover
- Opens the video in a modal when clicked

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- And other common YouTube URL variations

## Technical Details

### Animation States

- **Initial**: Play button is hidden (opacity: 0)
- **Hover**: Play button fades in with scale animation
- **Click**: Button scales down slightly for tactile feedback
- **Video Transition**: Smooth fade and scale animation between image and video

### Inline Video Features

- Video replaces the project image within the same card layout
- Auto-play video when play button is clicked
- Modest branding for cleaner appearance
- Maintains aspect ratio within the card
- Close button overlay to return to image view
- Smooth enter/exit animations using AnimatePresence

### Performance Considerations

- Lazy loading of video content (only loads when play button is clicked)
- Efficient YouTube embed parameters
- Minimal DOM manipulation with AnimatePresence
- Optimized animations using Framer Motion
- No background scroll prevention needed (video stays within card)

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- JavaScript enabled for interactive features
- YouTube iframe embed support

## Future Enhancements

- Support for other video platforms (Vimeo, etc.)
- Video thumbnail previews
- Playlist support for multiple videos per project
- Video progress tracking
