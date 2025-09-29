# AURA - Autonomous User-side Robotic Assistant

![AURA Logo](assets/aura-logo.png)

## 🎯 Project Overview

AURA (Autonomous User-side Robotic Assistant) is an intelligent AI-powered desktop assistant that combines computer vision, natural language processing, and automation to help users interact with their computers through voice commands and visual understanding. The system can see what's on your screen, understand your voice commands, and perform automated actions to assist with various tasks.

## 🎥 Demo

**Watch AURA in Action:** [YouTube Demo](https://youtu.be/PZizPGygSSk)

## 📂 Repository

**GitHub Repository:** [https://github.com/prats-2311/aura.git](https://github.com/prats-2311/aura.git)

## ✨ Key Features

- **🎤 Voice Activation**: Wake word detection using Porcupine for hands-free interaction
- **👁️ Computer Vision**: Real-time screen analysis and visual understanding
- **🧠 AI Reasoning**: Advanced language model integration for intelligent responses
- **🤖 Automation**: Cross-platform GUI automation and control
- **♿ Accessibility**: macOS Accessibility API integration for enhanced interaction
- **🔊 Audio Feedback**: Text-to-speech responses and audio notifications
- **📊 Performance Monitoring**: Real-time performance tracking and optimization
- **🌐 Web Integration**: Browser automation and web accessibility features

## 🏗️ Architecture

AURA follows a modular architecture with clear separation of concerns:

```
AURA/
├── modules/           # Core functionality modules
│   ├── vision.py      # Computer vision and screen analysis
│   ├── reasoning.py   # AI language model integration
│   ├── audio.py       # Voice processing and TTS
│   ├── automation.py  # GUI automation and control
│   ├── accessibility.py # macOS Accessibility API
│   └── feedback.py    # User feedback and notifications
├── handlers/          # Command and intent handlers
├── orchestrator.py    # Central coordination system
├── main.py           # Application entry point
└── config.py         # Configuration management
```

## 🛠️ Tech Stack

### Core Technologies

- **Python 3.11** - Primary programming language
- **PyTorch** - Machine learning framework
- **Transformers** - Hugging Face model integration
- **OpenAI Whisper** - Speech recognition
- **Porcupine** - Wake word detection

### Computer Vision & Automation

- **OpenCV** - Computer vision processing
- **Pillow (PIL)** - Image manipulation
- **PyAutoGUI** - Cross-platform GUI automation
- **MSS** - Fast screen capture
- **cliclick** - macOS automation (primary method)

### macOS Integration

- **PyObjC** - Complete macOS framework bindings
  - Cocoa, AppKit, ApplicationServices
  - Accessibility, CoreFoundation, CoreServices
  - Vision, Speech, AVFoundation frameworks

### Audio Processing

- **SoundDevice** - Audio I/O operations
- **PyDub** - Audio file manipulation
- **pyttsx3** - Text-to-speech synthesis

### Web & API

- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **Requests/HTTPX** - HTTP client libraries
- **WebSockets** - Real-time communication

### Data & Analysis

- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **SciPy** - Scientific computing

### Development Tools

- **pytest** - Testing framework
- **Black** - Code formatting
- **Flake8** - Code linting
- **MyPy** - Static type checking

## 🚀 Installation

### Prerequisites

- macOS (primary support)
- Python 3.11
- Conda package manager
- Homebrew (for cliclick)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prats-2311/aura.git
   cd aura
   ```

2. **Create and activate Conda environment:**

   ```bash
   conda create --name aura python=3.11 -y
   conda activate aura
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Install cliclick (macOS automation tool):**

   ```bash
   brew install cliclick
   ```

5. **Configure API keys:**

   - Set up your API keys in `config.py`
   - Configure Porcupine API key for wake word detection
   - Set up reasoning model API endpoints

6. **Run the application:**
   ```bash
   python main.py
   ```

## 🎮 Usage

1. **Start AURA:** Run `python main.py` to start the assistant
2. **Wake Word:** Say the wake word to activate voice commands
3. **Voice Commands:** Speak naturally to interact with your computer
4. **Visual Tasks:** AURA can see and interact with screen elements
5. **Automation:** Perform complex multi-step tasks through voice

### Example Commands

- "Click on the search button"
- "What's on my screen?"
- "Open the settings menu"
- "Fill out this form"
- "Read me the text on the page"

## 📋 Configuration

Key configuration options in `config.py`:

- **API Keys**: Porcupine, reasoning models
- **Audio Settings**: Microphone, speaker configuration
- **Vision Models**: Local LM Studio integration
- **Performance**: Optimization and monitoring settings
- **Accessibility**: macOS permissions and features

## 🧪 Testing

Run the test suite:

```bash
pytest tests/
```

Performance testing:

```bash
python -m pytest tests/performance/
```

## 📊 Performance Monitoring

AURA includes comprehensive performance monitoring:

- Real-time latency tracking
- Resource usage monitoring
- Performance dashboard
- Optimization recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Picovoice for Porcupine wake word detection
- Hugging Face for transformer models
- OpenAI for Whisper speech recognition
- Apple for macOS Accessibility APIs

## 📞 Support

For questions, issues, or contributions:

- **GitHub Issues**: [Report bugs or request features](https://github.com/prats-2311/aura/issues)
- **Discussions**: [Join the community discussion](https://github.com/prats-2311/aura/discussions)
- **Demo Video**: [Watch the YouTube demo](https://youtu.be/PZizPGygSSk)

---

**AURA** - Making human-computer interaction more natural and accessible through AI.
