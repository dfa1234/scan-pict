# scan-pict

For starting the api with PM2
```
    sudo yarn global add pm2
    sudo pm2 install typescript
    cd api
    cp config.ts.sample config.ts
    # then configure config.ts file accordingly 
    pm2 start index.ts
```

Note for TSlint on webstorm :
Integration with all linters is done as an Inspection. Therefore rather than disable the linter:
* Settings/Preferences
* Editor | Inspections
* Type Script | TSLint (can use search)
* Change Severity to a desired level


