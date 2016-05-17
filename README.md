# Gulp Boilerplate

This is a very basic boilerplate to get started with. It includes a specific **folder structure** with some **predefined HTML/SCSS** and runs on **Git** and **Gulp**.

## Development

### Folder Structure

The `src` folder is for **development** only, where you can find all of the SCSS code, uncompressed JavaScript and uncompressed images or placeholders used for development.

The `dist` folder is the one you upload on a server when **deploying** your project. Here are all minified and compressed files and images, automatically created by Gulp. This folder is empty by default - the minified files will be created by Gulp.

### Installing Gulp

1. Install gulp globally for all projects: `npm install -g gulp`

2. Install gulp dev dependencies: `npm install`

3. Install postcss plugins: `npm install gulp-postcss pixrem autoprefixer cssnano`

### Enabling Sourcemaps in Chrome

1. Open DevTools with `Ctrl+Shift+I`

2. Open the settings in the upper right corner (or press `F1`)

3. Make sure `Enable CSS source maps` and `Auto-reload generated CSS` are enabled

4. Go to `Workspace` and add your local project folder

5. Restart DevTools

## Deployment

### Use minified CSS

* Use the minified CSS file by changing your input `style.css` to `style.min.css` in your HTML files. (If you don't want to use sourcemaps you can do this in development stage)