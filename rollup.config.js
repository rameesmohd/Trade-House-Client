import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  // ...other configuration options...
  plugins: [
    resolve(), // Resolve node_modules dependencies
    commonjs(), // Convert CommonJS modules to ES modules
  ],
};
