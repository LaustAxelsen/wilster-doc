#!/usr/bin/env node
var path = require('path')
var fs = require('fs')
var reactDocgen = require('react-docgen')
var ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer')
var dir = require('node-dir')
var program = require('commander')

program.version('1.0.0')

program
  .command('run')
  .option('-f, --folder [folder]', 'Path to the folder with all the component files in.')
  .option('-o, --output [output]', 'Path for the output')
  .action(function(options) {
    let outputPath = options.output || './documentation.md'
    let folderPath = options.folder || './src'

    handleExtraction(folderPath, outputPath)
  })

program.parse(process.argv)

var defaultTemplate = `
## {{#if description.componentName}}{{{description.componentName}}}{{else}}{{componentName}}{{/if}}

{{#if description.description}}{{{description.description}}}{{else}}{{description}}{{/if}}

Prop | Type | Default | Req | Description
---- | --------------------- | ---- | ------- | --------
{{#each props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}Yes{{else}}-{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{#if isMissingComposes}}
*Some or all of the composed components are missing from the list below because a documentation couldn't be generated for them.
See the source code of the component for more information.*
{{/if}}

{{#if composes.length}}
{{componentName}} gets more \`propTypes\` from these composed components
{{/if}}

{{#each composes}}
#### {{this.componentName}}

prop | type | default | required | description
---- | ---- | ------- | -------- | ---------------------
{{#each this.props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{/each}}
`

var renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: __dirname,
  template: defaultTemplate
})

function handleExtraction(path, outputPath) {
  var folders = [path]
  var componentsOutput = []
  var totalContent = ''

  function readFolder(folder) {
    dir.readFiles(
      folder,
      { match: /.(js|jsx)$/ },
      function(err, content, dirPath, next) {
        if (err) throw err

        try {
          const docs = reactDocgen.parse(content, reactDocgen.resolver.findAllComponentDefinitions)

          docs.forEach(doc => {
            if (doc.description && doc.description.match('@')) {
              doc.description = {
                description: doc.description
              }

              let annotationSplits = doc.description.description.split('@')

              annotationSplits.forEach(annotation => {
                let afw = annotation.split(' ')[0]
                if (afw) doc.description[afw] = annotation.replace(afw + ' ', '')
              })
            }

            componentsOutput.push({
              name: doc.description && doc.description.componentName ? doc.description.componentName : doc.displayName,
              value: renderer.render(dirPath, doc, [])
            })
          })
        } catch (e) {
          console.log('error ', e)
        }
        next()
      },
      function(err, files) {
        if (err) throw err

        componentsOutput.sort(function(a, b) {
          return a.name == b.name ? 0 : a.name > b.name ? 1 : -1
        })

        componentsOutput.forEach(componentData => {
          if (componentData.value) {
            totalContent += componentData.value
          }
        })

        fs.writeFile(outputPath, totalContent)
      }
    )
  }

  folders.forEach(readFolder)
}
