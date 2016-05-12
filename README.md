# Gulp Boilerplate

This is a very basic boilerplate to get started with. It includes a specific **folder structure** with some predefined HTML/SCSS and uses **Git** and **Gulp**.

## Folder Structure

The `src` folder is for **development** only, where you can find all of the SCSS code, uncompressed JavaScript and uncompressed images or placeholders used for development.

The `dist` folder is the one you upload on a server when **deploying** your project. Here are all minified and compressed files and images, automatically created by Gulp.

## Steps for installing Gulp

1. Install gulp globally for all projects:
```npm install -g gulp```

2. Install gulp dev dependencies:
```npm install```

3. Install postcss plugins:
```npm install gulp-postcss pixrem autoprefixer cssnano```