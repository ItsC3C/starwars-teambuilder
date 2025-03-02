# Star Wars Teambuilder

A web application that allows users to create and customize their own Star Wars character teams.

## Overview

Star Wars Teambuilder is an interactive web application that lets fans of the Star Wars universe create, customize, and share their ideal teams of characters. Whether you're assembling a squad of bounty hunters, a Jedi council, or a mix of heroes and villains from across the galaxy, this tool provides an intuitive interface to bring your team to life.

## Features

- **Character Selection**: Choose from a comprehensive database of Star Wars characters spanning all movies, TV shows, and canonical material
- **Team Building**: Create balanced teams with customizable roles and positions
- **Stat Tracking**: View character statistics and team synergy ratings
- **Save & Share**: Export your team compositions or share them directly with other fans
- **Responsive Design**: Fully functional on desktop and mobile devices

## Note on Mobile Experience

While the application is responsive, the mobile CSS could be improved in future updates. Due to time constraints and prioritizing meeting the project deadline, the mobile experience may not be as polished as the desktop version. Additionally, I intentionally challenged myself with an ambitious design that pushed my technical capabilities, leading to some complexity in the responsive implementation.

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v7.0.0 or higher)

### Building for Production

To create a production build:

```
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
star-wars-teambuilder/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # React components
│   ├── css/            # Stylesheets
│   ├── data/           # Character and team data
│   ├── utils/          # Utility functions
│   └── App.jsx         # Main application component
├── index.html          # Entry HTML file
└── package.json        # Project dependencies and scripts
```

## Technologies Used

- React.js - Frontend framework
- Vite - Build tool and development server
- CSS3 - Styling
- [Any other libraries or technologies used]

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Lucasfilm and Disney for the Star Wars universe
- [Any APIs or data sources used]
- All contributors and Star Wars fans who provide feedback

## Contact

Project Link: [https://github.com/yourusername/star-wars-teambuilder](https://github.com/yourusername/star-wars-teambuilder)
