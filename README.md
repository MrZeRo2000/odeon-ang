# OdeonAng

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

End-to-end tests live under `e2e/` and run via [Playwright](https://playwright.dev), driving a real browser against a running instance of the app (`playwright.config.ts` starts `npm start` automatically if nothing is already listening on `http://localhost:4200`).

Run the full suite:

```
npm run e2e
```

Run a single spec file:

```
npx playwright test e2e/table-rendering.spec.ts
```

Run tests matching a name (`-g` / `--grep`):

```
npx playwright test -g "dvorigins table renders rows"
```

Run with the browser visible, useful while writing/debugging a test:

```
npx playwright test --headed
```

Open the interactive UI mode (step through actions, inspect the DOM at each step):

```
npx playwright test --ui
```

After a failing run, inspect the recorded trace (captured automatically for failures via `trace: 'retain-on-failure'`):

```
npx playwright show-trace test-results/<failing-test-folder>/trace.zip
```

`test-results/` and `playwright-report/` are generated output and are gitignored — don't commit them.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Set Node Env var

`$env:Path += ";$env:LOCALAPPDATA\Programs\node"`
or
`./env.ps1`

## Running npm install with PowerShell

`."$env:LOCALAPPDATA\Programs\node\node.exe" "$env:LOCALAPPDATA\Programs\node\node_modules\npm\bin\npm-cli.js" install`

## Red cross without cursor

`<div pButton icon="pi pi-times" class="p-button-danger p-button-text" style="cursor: auto;"></div>`

## Processing status
      {{pi.processingStatus | processingStatusName}}
      {{pi.lastUpdated | date:'dd.MM.YYYY HH:mm:ss'}}

## Update version  
  `ng update @angular/core@15 @angular/cli@15 @angular/cdk@15 --allow-dirty --force`
