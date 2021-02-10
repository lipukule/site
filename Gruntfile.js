var yaml = require("yaml");
var S = require("string");

var CONTENT_PATH_PREFIX = "content/tpo";

module.exports = function(grunt) {

    grunt.registerTask("lunr-index", function() {

        grunt.log.writeln("Build pages index");

        var indexPages = function() {
            var pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln("Parse file:",abspath);
                pagesIndex.push(processFile(abspath, filename));
            });

            return pagesIndex;
        };

        var processFile = function(abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight(".html").s;
            var href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split("---");
            console.log(abspath, filename)

            let frontMatter

            try {
                frontMatter = yaml.parse(content[1].trim());
            } catch (e) {
                console.log(e)
                return
            }

            var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
            // href for index.md files stops at the folder name
            if (filename === "index.md") {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
            }

            // Build Lunr index for this page
            pageIndex = {
                title: frontMatter.title,
                tags: frontMatter.poki,
                href: href,
                content: S(content[2]).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };

        let pages = indexPages();

        const ln = require("lunr");
        const idx = ln(function() {
            this.field("title", {boost: 10})
            this.field("tags", {boost: 5})
            this.field("content")
            this.ref("href")

            pages.filter(x => x != null).forEach(p => this.add(p))
        })

        grunt.file.write("static/page-index.json", JSON.stringify(idx));
        grunt.log.ok("Index built");
    });
};