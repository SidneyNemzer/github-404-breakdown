# Contributing

## Set up your dev environment

1. Fork this repository and clone

   ```
   git clone git@github.com:[yourname]/github-404-breakdown.git
   ```

2. Install dependencies. [Requires Node/NPM][node]. Recommended: Node 16, NPM 8

   ```
   npm install
   ```

3. Start the dev server and open http://localhost:8080/

   ```
   npm start
   ```

4. Make changes to the code. The dev server auto reloads the page.

5. Build the extension

   ```
   npm run build
   ```

6. Test in Chrome. Go to chrome://extensions, enable Developer Mode, choose "Load Unpacked", select the `build` folder of this repo. If you've installed the extension from the Chrome Web Store, disable that one before testing the development build.

7. Ensure formatting is correct and the tests pass

   ```
   npm run format
   npm test
   ```

8. Commit your changes, push to your GitHub repo, then open a PR! For more details on this step, [check out the GitHub documentation][gh-open-pr].

[node]: https://nodejs.org
[gh-open-pr]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork
