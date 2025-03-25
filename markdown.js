function convertHTMLToMarkdown() {
    const resultUIContent = document.querySelector('.result-ui-content');
    const elements = resultUIContent.querySelectorAll('.result-item');

    let markdown = '';

    elements.forEach(element => {
        if (element.classList.contains('md-text')) {
            markdown += `${element.value}\n\n`;
        } else if (element.classList.contains('md-h1')) {
            markdown += `# ${element.value}\n\n`;
        } else if (element.classList.contains('md-h2')) {
            markdown += `## ${element.value}\n\n`;
        } else if (element.classList.contains('md-h3')) {
            markdown += `### ${element.value}\n\n`;
        } else if (element.classList.contains('md-img')) {
            const src = element.getAttribute('src');
            markdown += `![Image](${src})\n\n`;
        } else if (element.classList.contains('md-tools')) {
            const icons = element.getAttribute('src');
            markdown += `![Tools](${icons})\n\n`;
        }
    });

    return markdown;
}

function logMarkdown(markdown) {
    console.log(markdown.split('\n').join('\n'));
}
