# RaspbianHUB
Raspberry Pi HUB

**TODO:**
  - Clean up build process
  - Build and Run instructions
  - Screenshots for README


# Weather
The weather page was based on a ReactJS weather app developed by Juan Diego Jiminez and Dave Weinstock. (Found here: [Weathrly](https://github.com/dstock48/weathrly)) The app was converted to Typescript and included in its entirety in this repository. CSS edits were made to adapt the code to work on a 7" touchscreen for the RaspbianHUB use case. 

**TODO:** 
 - Add webcams page
 - Look into precipitation accumulation data
 - Clean up directory structure

# Calendar
The calendar page simply implements a webview that directs you to Google Calendar. Here, you can log in and use your Google calendar as if you were in your web browser.


**TODO:**
  - Clean up directory structure
  - Add css files to remove inline styles dependencies for each component**

# Lights
The lights page is used to select a co

**TODO:**
  - Clean up directory structure
  - Add css files to remove inline styles dependencies for each component
  - Dimmer slider (both UI element and PWM output modifications)
    - May need to implement a Python server to leave running for the lights page. Probably want to start it when the app boots up
