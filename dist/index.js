#!/usr/bin/env node
"use strict";
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const templateDir = path.join(__dirname, '../template');
const targetDir = process.cwd();
fs.copy(templateDir, targetDir)
    .then(() => {
    console.log('Project created successfully.');
})
    .catch((err) => {
    console.error('Error creating project:', err);
});
