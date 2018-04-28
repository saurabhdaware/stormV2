# StormV2


## > Documentation :

### About STORMV2 :
  Stormv2 is a Solar System Simulator which simulates the planetary positions at a particular date which can be furthur used in field of astronomy, astrodynamics and other related fields.

## > Screenshots :
![](http://res.cloudinary.com/saurabhdaware/image/upload/v1524898358/Screenshot_81_syfrfp.png)

![](http://res.cloudinary.com/saurabhdaware/image/upload/v1524898358/Screenshot_82_yso36w.png)

![](http://res.cloudinary.com/saurabhdaware/image/upload/v1524898357/Screenshot_83_xvjtma.png)

![](http://res.cloudinary.com/saurabhdaware/image/upload/v1524898357/Screenshot_84_lm3ocg.png)


#### -- To Run Frontend :
1. Clone / Download the directory
2. Open Command Prompt and type `cd frontend`
3. Install [npm](https://nodejs.org/) and Angular Client `npm install @angular/cli` (ignore if already installed)
4. Type `npm install` to get required node modules
5. Type `ng serve`
6. Navigate to `http://localhost:4200` in your browser (This will start the frontend)

#### -- To Run Backend :
1. Install [Python](https://www.python.org/downloads/) (if not already installed)
2. Change directory to `stormv2/backend/`
3. Type `python runserver manage.py` in command prompt


#### -- About Files

1. Frontend index `/frontend/src/app/app.component.ts`
2. Planet Models `/frontend/src/app/services/planet.service.ts`
2. All the logical functions are inside `/src/backend/stormapp/`

#### -- Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### -- Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### -- Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### -- Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### -- Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
