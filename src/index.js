const marked = require("marked");

import hljs from "highlight.js";

let defaultRenderer = {};
let headerList = []
export default function ({codeTheme = 'github', theme = 'gitbook-teal'}) {
  return {
    name: "vitePluginMd2Vue",
    transform(src, id) {
      if (id.endsWith(".md")) {
        marked.setOptions({
          highlight: function (code) {
            return hljs.highlightAuto(code).value;
          },
        });

        defaultRenderer = {
          heading: function (text, level) {
            headerList.push({text, level})
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
            return `
              <h${level}>
                <a name="${escapedText}" class="anchor" href="#${escapedText}">
                  <span class="header-link"></span>
                </a>
                ${text}
              </h${level}>`;
          },
        };

        marked.use({
          renderer: defaultRenderer,
        });

        return {
          code: `import {h, defineComponent} from "vue";
                 import 'highlight.js/styles/${codeTheme}.css'
                 import './theme/${theme}.css'
                const _sfc_md = defineComponent({
                    name: "Markdown",
                });

                const _sfc_render =() => {
                    return h("div", {
                      innerHTML: ${JSON.stringify(marked(src))}, 
                    })
                };

                _sfc_md.render = _sfc_render
                export default _sfc_md
                export const headings = ${JSON.stringify(headerList)}`,
          map: null,
        };
      }
    },
  };
}
