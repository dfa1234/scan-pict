# photo-scan

For starting the api with PM2
```
    sudo yarn global add pm2
    sudo pm2 install typescript
    cd api
    cp config.ts.sample config.ts
    # then configure config.ts file and 
    pm2 start index.ts
```

Note for TSlint on webstorm :
Integration with all linters (be it for JavaScript/TypeScript or PHP etc.) is done as an Inspection (so the results can be shown as errors/warnings and they can be run (results shown) via Code | Inspect Code). Therefore:
* Settings/Preferences
* Editor | Inspections
* Type Script | TSLint (can use search)
* Change Severity to a desired level


