# Forma — Material 3 Studio

A static, frontend-only screen and flow editor. Sketch with 14 component types, connect screens, preview interactions, and export a natural-language coding prompt in English, Spanish, French, or Hindi.

[Open the public app](https://akumukage.github.io/forma-material-studio/)

## GitHub Pages

The `Deploy to GitHub Pages` workflow builds, checks, and publishes the app on every push to `main`. It uses the Pages-provided base path so scripts and styles load under the repository URL. The repository's Pages publishing source is GitHub Actions.

For a matching local export, set `GITHUB_PAGES_BASE_PATH=/forma-material-studio` before running `npm run build`. Without this variable, the app still builds for a root URL. Deploy only `dist/client`, never the source or server build.

## Run

```sh
npm install
npm run dev
```

Open the local URL printed by the server. Run `npm run build` to export the application into `dist/client`. Serve that folder with any static HTTP host. No backend, API key, or runtime database is required.

## Using the editor

- Click a component to add it to the selected screen, or drag it into place. Drag a screen’s name to move its frame.
- Select a component to edit content, geometry, color, and style. Drag its bottom-right handle to resize. Shift-click for multiple selection; use Layers to hide, lock, or select grouped elements.
- Use the connection tool (`C`) to choose a source and destination, then set tap/swipe and transition in Interactions.
- Preview starts at the screen marked Start. Tap connected components or swipe; Back and Restart are in the preview toolbar.
- Change the shared color, shape, type, and motion in Make it your own. Generate prompt includes the entire current design, links, and your additional instructions.
- Undo/redo: Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z. Duplicate: Ctrl/Cmd+D. Group/ungroup: Ctrl/Cmd+G. Fit: F. Pan: H. Select: V. Move: arrow keys; Shift moves 10 px.

Designs save automatically in localStorage in the current browser. Export/import project backups from Help. Image uploads are embedded in the project (2 MB per image limit); browser storage quotas still apply. A failed save is shown in the header. Changing a frame size preserves the component layout; use Layers to find and reposition content outside a smaller frame.

## Verification

```sh
npm run check
npm test
npm run build
```

The runnable checks cover group bounds, mixed phone/desktop layout, deletion cleanup, history snapshot isolation, localized prompt completeness, and malformed project imports. The app’s source and initial HTTP rendering have been checked; automated browser interaction testing is not included. Optional WebMCP prompt export is feature-detected and has not been verified in a supporting browser.

The component sketches are inspired by the official [Material 3 Expressive documentation](https://m3.material.io/). They are editable visual approximations, not Google’s native Material component implementation.
